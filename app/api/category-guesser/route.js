import { NextResponse } from "next/server";

const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error("Missing GOOGLE_API_KEY in env");
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

export async function POST(req) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }

  const cleaned = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/[0-9]/g, "")
    .trim();

  const systemPrompt = `
You are an expert financial transaction classifier.  
Your job is to choose EXACTLY ONE best-fitting category from this list:
${ALLOWED_CATEGORIES.join(", ")}

Rules:
- ALWAYS choose the closest matching category.
- NEVER output anything except the category name.
- If unsure, choose the most likely category, NOT "Other".

Examples:
"starbucks coffee" → Food
"uber ride airport" → Transport
"ola cab" → Transport
"zara fashion shopping" → Shopping
"big bazaar grocery run" → Groceries
"walmart groceries" → Groceries
"amazon shopping order" → Shopping
"electricity bill" → Utilities
"doctor consultation" → Health
"gym membership" → Health
"netflix subscription" → Entertainment
"flight ticket mumbai" → Travel
"monthly rent payment" → Rent
`;

  const userQuery = `
Classify this merchant:
"${cleaned}"

Return ONLY the category name.
`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      maxOutputTokens: 5,
      temperature: 0.0,
    },
  };

  try {
   
    let response;
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) break;
      await new Promise((res) =>
        setTimeout(res, (2 ** attempt) * 400)
      );
    }

    if (!response.ok) throw new Error("Gemini failed");

    const result = await response.json();

    let generated =
      result?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    generated = generated.trim();

    
    generated =
      generated.charAt(0).toUpperCase() +
      generated.slice(1).toLowerCase();

   
    const fallback = detectCategoryFallback(cleaned);

    const finalCategory =
      ALLOWED_CATEGORIES.includes(generated)
        ? generated
        : fallback;

    return NextResponse.json({ category: finalCategory });

  } catch (err) {
    console.error("Category-Gueser API Error:", err);
    return NextResponse.json({ category: "Other" }, { status: 500 });
  }
}

function detectCategoryFallback(text) {
  if (text.includes("uber") || text.includes("ola") || text.includes("cab"))
    return "Transport";

  if (text.includes("flight") || text.includes("air") || text.includes("airport"))
    return "Travel";

  if (text.includes("doctor") || text.includes("hospital") || text.includes("clinic"))
    return "Health";

  if (text.includes("rent"))
    return "Rent";

  if (text.includes("grocery") || text.includes("market") || text.includes("bazaar"))
    return "Groceries";

  if (text.includes("coffee") || text.includes("restaurant") || text.includes("food"))
    return "Food";

  if (text.includes("bill") || text.includes("electric") || text.includes("water"))
    return "Utilities";

  if (text.includes("shop") || text.includes("store") || text.includes("mall"))
    return "Shopping";

  return "Other";
}
