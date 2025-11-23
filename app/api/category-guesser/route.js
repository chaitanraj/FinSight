import { NextResponse } from "next/server";

const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";


const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error("Missing GOOGLE_API_KEY in environment variables");
}


const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;


const ALLOWED_CATEGORIES = [
  "Groceries",
  "Food",
  "Transport",
  "Shopping",
  "Utilities",
  "Rent",
  "Entertainment",
  "Health",
  "Travel",
  "Other"
];


const CATEGORIES_TEXT = `[${ALLOWED_CATEGORIES.join(", ")}]`;

export async function POST(req) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }


  const systemPrompt = `
You are an expense categorizer.
You MUST choose EXACTLY ONE category from the allowed list.
Do NOT output anything other than the category name.
Allowed categories: ${CATEGORIES_TEXT}.
`;

  const userQuery = `
Merchant info: "${text}".
Return ONLY the category from the allowed list.
`;


  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      maxOutputTokens: 5, 
      temperature: 0.1,   
    },
  };

  try {
    const maxRetries = 3;
    let response;

    for (let i = 0; i < maxRetries; i++) {
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) break;

      // wait before retry
      if (i < maxRetries - 1) {
        const delay = (2 ** i) * 500;
        await new Promise((res) => setTimeout(res, delay));
      }
    }

    if (!response.ok) {
      throw new Error(`Gemini request failed after retries: ${response.status}`);
    }

    const result = await response.json();

    /** Extract text safely */
    let generated = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    generated = generated
      .replace(/Category:/gi, "")
      .replace(/category:/gi, "")
      .trim();

    generated = generated.charAt(0).toUpperCase() + generated.slice(1).toLowerCase();
 
    const finalCategory = ALLOWED_CATEGORIES.includes(generated)
      ? generated
      : "Other";

    return NextResponse.json({ category: finalCategory });

  } catch (err) {
    console.error("Gemini Category Error:", err);

    return NextResponse.json({ category: "Other" }, { status: 500 });
  }
}
