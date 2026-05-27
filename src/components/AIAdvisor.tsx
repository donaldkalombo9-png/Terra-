import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, RefreshCw, TriangleAlert, Info } from "lucide-react";
import { ChatMessage } from "../types";

// Dynamic custom markdown renderer to render structured AI recipe cards beautifully without third-party heavy imports
export const SmartMarkdown: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split("\n");
  let inList = false;
  const renderedElements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith("### ")) {
      renderedElements.push(
        <h3 key={index} className="text-lg font-display font-semibold text-stone-900 mt-4 mb-2 tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-4 bg-amber-500 rounded-sm inline-block"></span>
          {trimmed.slice(4)}
        </h3>
      );
      return;
    }
    if (trimmed.startsWith("#### ")) {
      renderedElements.push(
        <h4 key={index} className="text-sm font-semibold text-stone-700 mt-3 mb-1 uppercase tracking-wider font-display">
          {trimmed.slice(5)}
        </h4>
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      renderedElements.push(
        <h2 key={index} className="text-xl font-display font-bold text-stone-900 mt-6 mb-3 border-b border-stone-200 pb-1">
          {trimmed.slice(3)}
        </h2>
      );
      return;
    }

    // High intensity Warn Zone highlight in custom panels
    if (trimmed.toUpperCase().includes("⚠️") || trimmed.toUpperCase().includes("WARNING") || trimmed.toUpperCase().includes("HEALTH WARNING")) {
      renderedElements.push(
        <div key={index} className="my-4 p-4.5 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl flex items-start gap-3">
          <TriangleAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-900 block mb-1">
              {trimmed.replace(/^[-*⚠️\s]+/, "").replace(/\*\*|__/g, "")}
            </span>
          </div>
        </div>
      );
      return;
    }

    // Unordered List parsing
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const content = trimmed.slice(2);
      // Format simple bold **text** checks inline
      const formattedContent = parseInlineStyles(content);
      renderedElements.push(
        <li key={index} className="ml-5 list-disc text-stone-700 text-sm mb-1.5 pl-1 leading-relaxed">
          {formattedContent}
        </li>
      );
      return;
    }

    // Blank line
    if (trimmed === "") {
      renderedElements.push(<div key={index} className="h-2"></div>);
      return;
    }

    // Default plain line or bold highlighted text
    const formattedContent = parseInlineStyles(trimmed);
    renderedElements.push(
      <p key={index} className="text-stone-700 text-sm leading-relaxed mb-2">
        {formattedContent}
      </p>
    );
  });

  return <div className="space-y-1 font-sans">{renderedElements}</div>;
};

// Quick helper to convert inline **bolding** into <strong> components
function parseInlineStyles(text: string): React.ReactNode {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} className="font-semibold text-stone-900">{part}</strong>;
    }
    return part;
  });
}

interface AIAdvisorProps {
  activeCategory: string;
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ activeCategory }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "### 🥦 Dynamic AI Recipe & Nutrition Advisor\nWelcome! I am your AI Dietitian and Culinary Assistant. I can craft custom calorie-conscious recipes, recommend high-density ingredients, and outline vital clinical food warnings based on your need.\n\n#### Try asking me:\n* \"Sore throat: dynamic warm fluid recipe with soothing properties\"\n* \"Vegetarian breakfast bowl high in zinc and magnesium but completely nut-free\"\n* \"Post-workout protein meal under 600 calories requiring only 4 ingredients\"\n* \"Easy digestion morning breakfast smoothie after a heavy fever\"\n\nType your health needs or ingredient list below and let's craft a meal!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const threadEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest thread message
  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (!query || isLoading) return;

    // Append User message to local state
    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Reconstruct simple standard conversation history for Gemini config
      const historyContext = messages.slice(-4).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: activeCategory,
          prompt: query,
          history: historyContext
        })
      });

      if (!res.ok) {
        throw new Error("Server responded with a status of " + res.status);
      }

      const data = await res.json();
      
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "model",
        content: data.text || "I apologize, but I could not formulate a response at this time.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "model",
        content: `### ⚠️ Connection Interruption\nFailed to establish connection to the AI Nutrition endpoint. Please confirm your local system status.\n\n**Technical description**: ${err.message || 'Check connection details.'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    // Submit on next frame
    setTimeout(() => {
      const button = document.getElementById("submit-chat-btn");
      if (button) button.click();
    }, 50);
  };

  const getQuickPrompts = () => {
    switch (activeCategory) {
      case "vegetarian":
        return [
          "Vegetarian iron-rich skillet recipe",
          "Complete protein combinations with lentils",
          "Nut-free vegetarian recipes high in fiber"
        ];
      case "sick":
        return [
          "Nutrient broth for stomach flu recovery",
          "What to cook for soft diet following surgery",
          "Ginger tonic recipe to soothe inflammation"
        ];
      case "morning":
        return [
          "Cortisol-healthy energizing morning oat jars",
          "Low acid breakfast for sensitive stomach",
          "Nut-free morning superfoods list"
        ];
      case "gym":
        return [
          "50g protein lean dinner under 5 minutes",
          "Post-workout whey carb combination guide",
          "Mass-gain lunch using eggs and complex carbs"
        ];
      default:
        return [
          "High protein breakfast prep",
          "Heart-healthy veggie stir fry instructions",
          "Anti-inflammatory healing meal"
        ];
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
      {/* Header */}
      <div className="bg-stone-550 border-b border-stone-200 px-6 py-4 flex items-center justify-between bg-stone-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 items-center justify-center flex rounded-lg bg-emerald-550 bg-stone-900 text-stone-100 font-bold shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="font-display font-semibold text-stone-900 flex items-center gap-2 text-sm md:text-base">
              Interactive AI Diet Consultant
            </div>
            <p className="text-xs text-stone-500">
              Assisting: <span className="capitalize text-stone-700 font-medium font-mono">{activeCategory} Profile</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-100 rounded-full py-1 px-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Dual Mode Advisor (AI + Fallback)</span>
        </div>
      </div>

      {/* Message list container */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-stone-50/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Persona icon */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "bg-stone-200 text-stone-800" : "bg-stone-900 text-amber-100"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Content bubble */}
            <div
              className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-stone-900 text-stone-100 rounded-tr-none px-5"
                  : "bg-white border border-stone-150 shadow-xs rounded-tl-none font-sans"
              }`}
            >
              {msg.role === "user" ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <SmartMarkdown text={msg.content} />
              )}
              <span className={`block text-[10px] mt-2 ${msg.role === "user" ? "text-stone-400 text-right" : "text-stone-400"}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900 text-amber-100 shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-stone-100/70 border border-stone-100 p-4 rounded-xl rounded-tl-none max-w-[320px] shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-200"></span>
              </div>
              <p className="text-xs text-stone-500 animate-pulse font-mono">AI dietitian bio-synthesizing safe recipe and warning constraints...</p>
            </div>
          </div>
        )}
        <div ref={threadEndRef} />
      </div>

      {/* Suggested Quick prompts rail */}
      <div className="px-6 py-2 border-t border-stone-100 bg-stone-50 overflow-x-auto whitespace-nowrap flex gap-2">
        <span className="text-xs text-stone-400 font-medium self-center pr-1 flex items-center gap-1">
          <Info className="w-3 h-3 text-stone-400" /> Suggestions:
        </span>
        {getQuickPrompts().map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickQuestion(p)}
            className="text-xs bg-white text-stone-600 hover:text-stone-900 border border-stone-200 px-3 py-1.5 rounded-full hover:bg-stone-100 cursor-pointer shrink-0 transition"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Typing Form container */}
      <form onSubmit={handleSend} className="p-4 border-t border-stone-200 bg-white flex gap-2 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask AI: e.g. 'high protein dairy-free breakfast recipes'..."
          disabled={isLoading}
          maxLength={300}
          className="flex-1 bg-stone-50 border border-stone-200 focus:border-stone-500 focus:outline-none rounded-xl py-3 px-4 text-sm transition focus:bg-white"
        />
        <button
          id="submit-chat-btn"
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className={`h-11 px-5 rounded-xl text-stone-100 bg-stone-900 border hover:bg-stone-850 font-medium text-sm transition ${
            isLoading || !inputValue.trim()
              ? "opacity-50 cursor-not-allowed bg-stone-400"
              : "cursor-pointer"
          } flex items-center justify-center gap-2`}
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
