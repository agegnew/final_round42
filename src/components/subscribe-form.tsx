"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SubscribeResponse {
  error?: {
    message: string;
    status: number;
  };
  success?: boolean;
}

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [detailedError, setDetailedError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setDetailedError(null);
    
    // Basic email validation
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }
    
    setStatus("loading");
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: SubscribeResponse = await response.json();

      if (data.error) {
        setStatus("error");
        setMessage(data.error.message);
      } else {
        setStatus("success");
        setMessage("Thanks for subscribing!");
        setEmail("");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Subscribe to our newsletter
          </label>
          <div className="flex">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-l-full border-r-0 focus:ring-[#FFA500] focus:border-[#FFA500]"
              disabled={status === "loading"}
            />
            <Button
              type="submit"
              className="bg-[#FFA500] hover:bg-[#FF9000] text-white rounded-r-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Subscribe"}
            </Button>
          </div>
        </div>
        
        {status === "success" && (
          <p className="text-[#2D9979] text-sm">{message}</p>
        )}
        
        {status === "error" && (
          <div>
            <p className="text-red-500 text-sm font-medium">{message}</p>
            {detailedError && (
              <details className="mt-2">
                <summary className="text-xs text-gray-500 cursor-pointer">Show technical details</summary>
                <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                  {detailedError}
                </pre>
              </details>
            )}
          </div>
        )}
      </form>
    </div>
  );
} 