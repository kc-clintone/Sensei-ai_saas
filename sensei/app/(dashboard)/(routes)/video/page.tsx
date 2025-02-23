"use client";

import { Header } from "@/components/ui/header";
import { SendIcon, VideoIcon } from "lucide-react";
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
import { useModal } from "@/hooks/usemodal";
import toast from "react-hot-toast";

const VideoPage = () => {

  const upgrade = useModal();

  const [ video, setVideo ] = useState<string>();
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);

      form.reset();

    } catch (err:any) {
      if(err?.response?.status === 403) {
        upgrade.onOpen();
      } else {
        toast.error("Oops, Something went wrong!");
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
        title="Video generation"
        description="Generate cool videos with Sensei AI"
        icon={VideoIcon}
        iconColor="text-yellow-500"
        bgColor="text-yellow-500/10"
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
                        placeholder="Michael Jackson Billy Jean beats but a fast version"
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
                <Loader label="Working on it..."/>
              </div>
            )
          }

          { video && !isLoading &&
            (
              <div>
                <Nothing label="Oops!!! No videos here yet"/>
              </div>
            )
          }
          {video && (
            <video controls className="w-full mt-8 bg-black border rounded-lg aspect-video">
              <source src={video}/>
            </video>
          )}
        </div>
      </div>
    </div>
  )
} 

export default VideoPage;
