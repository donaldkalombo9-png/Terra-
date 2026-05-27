import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        aiInstance = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
        console.log("✅ GoogleGenAI initialized successfully with backend API key.");
      } catch (err) {
        console.error("❌ Failed to initialize GoogleGenAI:", err);
      }
    } else {
      console.warn("⚠️ GEMINI_API_KEY not configured or has default placeholder value. Returning fallback simulation advice.");
    }
  }
  return aiInstance;
}

// REST API endpoint: AI Chef & Diet Advisor proxy
app.post("/api/chat-advisor", async (req, res) => {
  const { category, prompt, history = [] } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "A valid 'prompt' string parameter is required." });
  }

  const client = getGeminiClient();

  if (!client) {
    // Elegant fallback guidance if no API key is provided
    const fallbackAnswers: Record<string, string> = {
      default: `### 🥦 Premium Dietitian Fallback Answer
      
**GEMINI_API_KEY** is currently not set or configured in the environment. 
Please configure your API key in the **Settings > Secrets** panel of AI Studio to enjoy full-featured interactive dynamic recipe generation!

Here is a supportive, curated recipe advice for your query: "${prompt}"

#### Curated Selection: High-Density Wellness Broth (Instant Nutrition)
*   **Best Suited For**: Nutritional recovery & active hydration
*   **Ingredients**: Fresh celery stalks, sliced ginger, organic turnip root, low-sodium vegetable stock, cracked black pepper, fresh lemon rind.
*   **Macro Estimate**: 110 kcal | Carb 18g | Protein 4g | Fat 1g
*   **Preparation**: Simmer ingredients in hot organic stock with bruised fresh ginger for 25 minutes. Finish with fresh squeezed lemon juice and turmeric sprinkles.

#### ⚠️ Vital Warnings
*   **Low Sodium Alert**: Stick strictly to homemade salt-less liquids if managing hypertension or post-viral gut sensitivities.
*   **Professional Care Notice**: This fallback recommendation does not replace custom advice from an authorized physician or certified fitness coach. Consult clinical services first if severe symptoms occur.`
    };

    return res.json({ text: fallbackAnswers.default, isFallback: true });
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...history.map((msg: any) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        })),
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are an expert culinary executive chef, medical dietitian, and sports nutritionist.
The application you are powering is "Food Recipes and Dietary Helper".
The user has picked this diet/context category: "${category || 'General Health'}".

Formulate a response that includes:
- **Direct Helpful Answer/Recipe**: Outline a custom culinary preparation or detailed step-by-step guidance tailored specifically to their goal or symptom expressed.
- **Nutritional Valuation**: Detail estimates of energy calories (kcal), protein (g), carbohydrate (g), and lipids/fat (g). Include any critical micro-nutrients of focus.
- **🛡️ CRITICAL HEALTH WARNINGS**: Provide a prominent warning section outlining any health cautions, key allergens, potential contradictions, or clinical warnings (e.g. hydration levels, blood sugar checks, kidney load, acidic impact, etc).
- **Recommended Store Boosters**: Name 1-3 physical ingredients, boosters, or superfoods that are useful as additions for this profile (such as Organic Pea Protein, Saffron Stamens, Ashwagandha roots, Chia seeds, Cold Brew concentrate, Electrolyte blend). Suggest they can purchase these directly inside our App's Integrated Store.

Focus on incredibly stylish, warm, and structured Markdown formatting. High contrast, precise bullet points, and authoritative, supportive tone. No preamble or meta comments.`,
        temperature: 0.7,
      }
    });

    const replyText = response.text;
    return res.json({ text: replyText, isFallback: false });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return res.status(500).json({
      error: "An error occurred calling the dietary advice generator: " + err.message,
      isFallback: true
    });
  }
});

// App server static files and Vite setups
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("🚀 Vite middleware mounted in development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("📦 Serving static files inside dist/ folder for production.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`📡 Full-Stack server is actively listening on http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
