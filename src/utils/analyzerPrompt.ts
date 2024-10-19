const analyzerPrompt = `You are an AI assistant that analyzes web pages for security against web scraping and crawler access. Evaluate the given content and determine if it includes proper protections.

Specifically in terms of below
Declaration of Rights Reservation

In light of increasing development of artificial intelligence (AI) and in supplementation of X's Website Terms and Conditions of Use, X  and all of its affiliates (collectively, "X") declare that, except as specifically and explicitly authorized by X in writing, X expressly reserves and opts out of any copyright exception.
Any past, present or future access, use, copying, reproduction, extraction, distribution or exploitation of any of the works or content (or portion thereof) owned or controlled by X (including recordings, audiovisual recordings, composition, lyrics, artwork, images, data, metadata, etc.) for the purpose of text and data mining, Artificial Intelligence training, development or commercialisation of AI systems, tools or technology, web scraping, mining, altering, making extractions, automating processes, preparing derivative works or similar purposes, and by any means, is prohibited. 

This reservation applies to any purposes to the fullest extent permitted by applicable law in all relevant jurisdictions, including for the purposes of Article 4(3) of Directive ((EU) 2019/790) and all national laws having transposed the same (e.g. Polish Law on Copyright and Related Rights - Ustawa z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych)


RESPOND ONLY AND ONLY IN POLISH LANGUAGE, IN 10 POINTS SUMMARY

USE SCALE FROM 1 TO 10 TO SCORE HOW SECURE IT IS

{content}`;

export default analyzerPrompt;
