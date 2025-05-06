import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  console.log("API HIT ✅");

  const { startup } = await req.json();
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `list startups like ${startup}, listing their features such as focus area, key features, strength, valuation. give the response in this format || name : all info in one paragraph || make sure to only respond with name and info`,
    });
console.log(result.text);

    const cleanText = result.text.replaceAll("*", "").replaceAll("\n", "");
    return Response.json({ text: cleanText });
  } catch (err) {
    console.error("Gemini error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}