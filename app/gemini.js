import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey:  process.env.NEXT_PUBLIC_API_KEY});

export async function main(startup) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `list startups like ${startup}, listing thier features such as focus area, key features ,strength, valuation . give the response in this format || name : all info in one paragraph || make sure to only respond with name and info`,
  });
  console.log(response.text.replaceAll("*",""));
  
  
  return (response.text.replaceAll("*","").replaceAll("\n",""));
}
