"use client";

import { useState, useEffect, useRef } from "react";
import { aiChat } from "@/app/actions/aichat";
import { Minus, Send } from "lucide-react";
import { useClickAway } from "@uidotdev/usehooks";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useAuth } from "@/app/chinguverse/auth/AuthContext";

export default function ChatWindow() {
  // Chatbot is only available for logged-in users
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // For closing the modal when clicking outside
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const scrollToLastMessage = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLastMessage();
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the server action directly
      const data = await aiChat(input);

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: data.error || "Something went wrong, try again." },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Could not connect. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  if (!isOpen) {
    return (
      <Image
        src="/aichat.svg"
        alt="Chat Icon"
        width={100}
        height={100}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-primary p-3 transition-transform  rounded-full hover:scale-110 cursor-pointer"
      />
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 w-96 bg-white shadow-xl rounded-lg flex flex-col h-[500px]"
      ref={ref}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-[#D5F7BC] border-b rounded-t-lg">
        <h3 className="font-bold text-neutral-900">AI Assistant</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-800"
        >
          <Minus size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            ref={i === messages.length - 1 ? lastMessageRef : null}
            className={`p-2 rounded-lg max-w-[85%] prose prose-sm ${
              m.role === "user"
                ? "bg-blue-100 ml-auto"
                : "bg-gray-100 mr-auto"
            }`}
          >
            <ReactMarkdown>{m.text}</ReactMarkdown>
          </div>
        ))}

        {isLoading && (
          <div className="mr-auto bg-gray-100 p-2 rounded-lg">
            <div className="flex items-center space-x-1">
              <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex p-3 border-t">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-l-md px-3 py-2 text-stone-950 focus:outline-none focus:ring-2 focus:ring-[#54360F]"
          placeholder="Ask about ChinguVerse..."
          disabled={isLoading}
        />

        <button
          onClick={sendMessage}
          className="rounded-l-none h-full px-2 cursor-pointer"
          disabled={isLoading}
        >
          <Send className="rounded w-10 h-10 text-primary bg-[#D5F7BC]" />
        </button>
      </div>
    </div>
  );
}