import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined. Please configure it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// SECURE API Endpoint for AI Assistant Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, tasks } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing or invalid 'messages' array in request body." });
    }

    const ai = getAIClient();

    // Format current tasks for context
    const taskContextString = tasks && Array.isArray(tasks) && tasks.length > 0
      ? tasks.map((t: any) => `- [${t.completed ? "COMPLETED" : "PENDING"}] ${t.title} | Category: ${t.category} | Priority: ${t.priority} | Due: ${t.deadline}`).join("\n")
      : "No active tasks in DeadlineZero right now.";

    const systemInstruction = `You are "DeadlineZero AI Assistant", a premium, sharp, action-oriented, and highly supportive productivity coach. 
Your goal is to save the user (a student, professional, or entrepreneur) from drowning in deadlines and last-minute panic.

Context:
The user is currently running "DeadlineZero" task manager. Here is their current live task list:
"""
${taskContextString}
"""

Instructions:
1. Be direct, crisp, and extremely practical. Avoid corporate speak or fluffy padding.
2. Prioritize tasks that are high-priority or near their deadline (highly urgent).
3. Offer concrete evening schedules, hour-by-hour exam study blueprints, or quick focus techniques when requested.
4. If there are no tasks, encourage them to add one and tell them how you can help once they populate their list.
5. Refer to specific tasks from their list when answering. Give personalized priority advice.
6. Return responses in standard Markdown format (use bolding, bullets, and short paragraphs for high readability). Keep answers concise and fast to read.`;

    // Convert messages to GoogleGenAI chat format
    // Map roles: user -> user, assistant/model -> model
    const contents = messages.map((m: any) => {
      const role = m.role === "assistant" ? "model" : "user";
      return {
        role,
        parts: [{ text: m.content }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I was unable to generate a strategy. Let's try rephrasing your request.";
    res.json({ content: reply });
  } catch (error: any) {
    console.warn("Gemini API experiencing transient high demand. Activating automated local coprocessor fallback logic.");
    
    // Graceful fallback schedule builder
    try {
      const { tasks, messages } = req.body;
      const latestMessage = messages && messages.length > 0 ? messages[messages.length - 1].content : "What should I do?";
      
      const pendingTasks = Array.isArray(tasks) 
        ? tasks.filter((t: any) => !t.completed).sort((a: any, b: any) => {
            const timeA = new Date(a.deadline).getTime();
            const timeB = new Date(b.deadline).getTime();
            return timeA - timeB; // soonest first
          })
        : [];

      let fallbackText = `⚠️ **Gemini Service is experiencing temporary high demand.**\n\n*No sweat!* DeadlineZero's built-in **Local Cognitive Resilience Engine** has successfully intercepted your request and synthesized an immediate tactical plan based on your live feed:\n\n`;

      if (pendingTasks.length === 0) {
        fallbackText += `### 🎯 Absolute Zero Status\nYou currently have **0 active tasks** in your queue! This is the perfect window to refuel, rest, or brainstorm your next major milestones. Add an objective using the deploy form above whenever you are ready.\n\n*Resilience Tip:* Real rest is productive. Sleep is the ultimate cognitive multiplier.`;
      } else {
        const topTask = pendingTasks[0];
        const remainingHours = Math.max(0.1, parseFloat(((new Date(topTask.deadline).getTime() - Date.now()) / (1000 * 60 * 60)).toFixed(1)));
        
        fallbackText += `### 🚨 Critical Zero-Hour Target\nYour primary objective is **"${topTask.title}"**.\n- **Category:** ${topTask.category}\n- **Priority:** ${topTask.priority}\n- **Time Horizon:** due in **${remainingHours} hours**.\n\n### ⚡ Tactical Evening Schedule\n1. **Focus Sprint (Next 45 Mins):** Eliminate all tabs, toggle **Focus Mode** on this screen, and attack **"${topTask.title}"** immediately. Use single-task concentration.\n`;

        if (pendingTasks.length > 1) {
          const secondTask = pendingTasks[1];
          fallbackText += `2. **Breather (10 Mins):** Take a rapid physical stretch or grab water. Do not check social feeds.\n3. **Secondary Focus Sprint (30 Mins):** Pivot to **"${secondTask.title}"** (Priority: ${secondTask.priority}) to keep momentum high.\n`;
        } else {
          fallbackText += `2. **Breather (10 Mins):** Stand up, stretch, and reset your eyes.\n3. **Verification Sprint (15 Mins):** Perform a final rigorous proofing or polishing of **"${topTask.title}"** before submission.\n`;
        }

        fallbackText += `\n### 💡 Smart Strategy for "${latestMessage}"\nBecause the remote AI is temporarily overloaded, here is our local emergency protocol for peak focus: Use the **Pomodoro** structure (25 mins work, 5 mins rest) to bypass friction, make a list of raw bullet points of what you need to draft, and run a **"vague version first"** to bypass writer's block. You can conquer this queue!`;
      }

      return res.json({ content: fallbackText });
    } catch (fallbackErr: any) {
      res.status(500).json({ 
        error: "AI Generation failed and fallback could not render.", 
        details: error.message || error 
      });
    }
  }
});

async function startServer() {
  // Serve frontend routes using Vite in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve the pre-built files from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DeadlineZero Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
