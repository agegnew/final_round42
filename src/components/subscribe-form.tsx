"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUser } from "@/lib/supabase";

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
      const result = await addUser(email);
      
      if (result.success) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        const error = result.error as any;
        
        // Log the full error for debugging
        console.log("Detailed error information:", error);
        
        // Check if it's a duplicate email error
        if (error && error.code === "23505") {
          setStatus("error");
          setMessage("This email is already subscribed");
        } else if (error && error.message && error.message.includes("table")) {
          setStatus("error");
          setMessage("Database setup issue. Please check if the 'users' table exists.");
          setDetailedError(JSON.stringify(error, null, 2));
        } else {
          setStatus("error");
          setMessage("An error occurred. Please try again.");
          if (error && error.message) {
            setDetailedError(error.message);
          }
        }
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
      console.error("Catch block error:", error);
      if (error instanceof Error) {
        setDetailedError(error.message);
      }
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