import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const { startup } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  console.log("vercel", process.env.API_KEY);
  

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const result = await model.generateContent([
      `list startups like ${startup}, listing their features such as focus area, key features, strength, valuation. give the response in this format || name : all info in one paragraph || make sure to only respond with name and info. make sure to least 3-4`,
    ]);

    const cleanText = result.response.text().replaceAll("*", "").replaceAll("\n", "");
    return Response.json({ text: cleanText });
  } catch (err) {
    console.error("Gemini error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}