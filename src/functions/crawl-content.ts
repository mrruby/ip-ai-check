import axios from 'axios';
import * as url from 'url';

const extractTLD = (link: string): string => {
    const hostname = url.parse(link).hostname || '';
    const tld = hostname.split('.').slice(-1)[0]; // Get the last part after the last dot
    return tld;
};

const fetchPageContent = async (pageUrl: string): Promise<string> => {
    try {
        const response = await axios.get(pageUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching page: ${pageUrl}`);
        return '';
    }
};

const crawlOneLevel = async (links: string[], baseUrl: string) => {
    const pageContents: Record<string, string> = {};

    const baseTLD = extractTLD(baseUrl);

    // Filter the provided links based on the same TLD
    const filteredLinks = links.filter(link => extractTLD(link) === baseTLD || !link.startsWith("mailto:"));

    for (const link of filteredLinks) {
        console.log(`Fetching linked page: ${link}`);
        const linkedPageContent = await fetchPageContent(link);
        if (linkedPageContent) {
            pageContents[link] = linkedPageContent;
        }
    }

    return pageContents;
};

export {crawlOneLevel}