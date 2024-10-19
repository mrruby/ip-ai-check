import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import analyzerPrompt from "./analyzerPrompt";

const llm = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", analyzerPrompt],
  ["human", "Analyze the following page content: {content}"],
]);

const chain = prompt.pipe(llm);

export async function analyzePageContent(content: string): Promise<string> {
  const response = await chain.invoke({ content });

  const result = String(response.content);
  return result;
}
