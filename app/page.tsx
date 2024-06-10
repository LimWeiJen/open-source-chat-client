"use client";

import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, Code } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { sendPrompt } from "@/lib/actions/chat.action";

export default function Home() {
  const promptRef = useRef<any>(null);
  const scrollAreaRef = useRef<any>(null);
  const [messages, setMessages] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitPrompt = async () => {
    setIsLoading(true);
    const prompt = promptRef.current!.value!;
    promptRef.current!.value! = "";
    scrollAreaRef.current?.scrollTo({ top: 0 });
    const res = await sendPrompt(messages, prompt);
    setMessages([...messages, prompt, res.res]);
    setIsLoading(false);
  }

  const onKeyPressed = (e: any) => {
    if (e.key === "Enter") submitPrompt();
  }

  return (
    <main className="bg-[#212121] min-w-screen h-screen flex flex-col gap-4 justify-center align-middle">
      {
        messages.length === 0 && !isLoading ?
          <div className="text-stone-100 text-center flex flex-col gap-2 text-opacity-70 text-4xl font-bold">
            <h1 className="h-10"><Code className="w-full scale-[200%]" /></h1>
            <h1>Open Source Chat Client</h1>
            <h1 className="font-normal text-sm">Powered by <Link className="underline" href="https://aistudio.google.com/app/apikey" target="_blank">Google Gemini</Link></h1>
            <h1 className="font-extralight text-xs">Created by <Link className="underline" href="https://limweijen.vercel.app/" target="_blank">Lim Wei Jen</Link>, and it is <Link className="underline" href="https://github.com/LimWeiJen/open-source-chat-bot" target="_blank">Open Sourced</Link></h1>
          </div>
          :
          <div className="h-[85%] w-full flex justify-center">
            <ScrollArea ref={scrollAreaRef} className="h-full w-3/4 rounded-md py-10 flex flex-col text-stone-100 text-opacity-70 gap-10">
              {messages.map((message, i) =>
                <ChatMessage key={i} isUser={i % 2 === 0} message={message} />
              )}
              {isLoading && <div className="space-y-2">
                <Skeleton className="h-4 w-[500px] bg-stone-700" />
                <Skeleton className="h-4 w-[700px] bg-stone-600" />
                <Skeleton className="h-4 w-[250px] bg-stone-700" />
                <Skeleton className="h-4 w-[300px] bg-stone-600" />
                <Skeleton className="h-4 w-[250px] bg-stone-700" />
              </div>
              }
            </ScrollArea>
          </div>
      }
      <div className="flex justify-center h-[10%]">
        <div className="flex w-[700px] bg-stone-800 h-1/2 mt-4 rounded-full shadow-lg">
          <Input ref={promptRef} onKeyDown={(e) => onKeyPressed(e)} className="h-full text-lg rounded-full text-stone-100 text-opacity-70 px-8 border-0 outline-none font-medium focus-visible:ring-offset-0 focus-visible:ring-0 bg-transparent" placeholder="Message Chat Bot" />
          <div className="h-full flex justify-center items-center mx-2">
            <Button onClick={submitPrompt} size="icon" className="rounded-full bg-stone-700 hover:bg-stone-600">
              <ArrowUp className="text-stone-800" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
