"use client";

import { Header } from "@/components/ui/header";
import { CodeSquareIcon, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormControl
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
Input
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Nothing } from "@/components/ui/nothing";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { UsrAvater } from "@/components/ui/usr-avatar";
import ReactMarkdown from "react-markdown";
import { AiAvatar } from "@/components/ui/ai-avatar";
import { useModal } from "@/hooks/usemodal";

const CodePage = () => {

  const upgrade = useModal();

  type ChatCompletionRequestMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
  };

  const [ messages, setMessages ] = useState<ChatCompletionRequestMessage[]>([]);
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((curr) => [...curr, userMessage, response.data]);

      form.reset();

    } catch (err:any) {
      if(err?.response?.status === 403) {
        upgrade.onOpen();
      }
    } finally {
      router.refresh();
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  })

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <Header
        title="Code generation"
        description="With Sensei AI, generate good useful code."
        icon={CodeSquareIcon}
        iconColor="text-violet-600"
        bgColor="text-violet-600/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
               className="rounded-lg p-4 px-3 md:px-6 focus-within:shadow-sm gap-2 grid grid-cols-12 border w-full"
               onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="prompt"
                render={({field}) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="focus-visible:ring-0 focus-visible:ring-transparent border-0 outline-none"
                        {...field}
                        disabled={isLoading}
                        placeholder="A react functional component returning a button"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Send
                <SendIcon className="w-6 h-6 text-white"/>
              </Button>
            </form>
          </Form>
        </div>

        <div className="mt-4 space-y-4">
          {
            isLoading && (
              <div className="items-center rounded-lg flex w-full p-8 bg-muted justify-center">
                <Loader label="Wait a minute, I'm thinking..."/>
              </div>
            )
          }

          { messages.length === 0 && !isLoading &&
            (
              <div>
                <Nothing label="Oops!!! No conversations yet"/>
              </div>
            )
          }
          <div className="gap-y-4 flex flex-col-reverse">
            {messages.map((message) => (
                <div
                   key={message.content}
                   className={cn("p-8 w-full flex gap-x-8 items-start", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
                >
                  {message.role === "user" ? <UsrAvater /> : <AiAvatar/>}
                  <ReactMarkdown
                    components = {{
                      pre: ({node, ...props}) => (
                        <div className="my-2 w-full overflow-auto rounded-lg bg-black/10 p-2">
                          <pre {...props}/>
                        </div>
                      ),
                      code: ({node, ...props}) => (
                        <code className="bg-black/10 rounded-lg p-1" {...props}/>
                      )
                    }}
                    className="leading-7 text-sm overflow-hidden"
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
} 

export default CodePage;
