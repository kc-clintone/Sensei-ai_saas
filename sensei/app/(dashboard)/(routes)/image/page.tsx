"use client";

import { Header } from "@/components/ui/header";
import { Image, ImageIcon, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema, imageQuantity } from "./constants";
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
import { AiAvatar } from "@/components/ui/ai-avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ImagePage = () => {

  const router = useRouter()

  const [images, setImages] = useState<string[]>([]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      setImages([]);

      const response = await axios.post("/api/image", values);

      const imgUrls = response.data.map((image: {url: string}) => image.url);

      setImages(imgUrls);

      form.reset();

    } catch (err:any) {
      console.log(err)
    } finally {
      router.refresh();
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      quantity: "1",
      resolution: "512x512",
    }
  })

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <Header
        title="Image generation"
        description="Turn your wildest imaginations into ellegant images with Sensei AI"
        icon={Image}
        iconColor="text-pink-700"
        bgColor="text-pink-700/10"
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
                  <FormItem className="col-span-6 lg:col-span-2">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="focus-visible:ring-0 focus-visible:ring-transparent border-0 outline-none"
                        {...field}
                        disabled={isLoading}
                        placeholder="Elon Musk on a beach with a dog"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({field}) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value}/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {imageQuantity.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <div className="items-center flex w-full p-8 justify-center">
                <Loader label="Wait a minute, I'm thinking..."/>
              </div>
            )
          }

          { images.length === 0 && !isLoading &&
            (
              <div>
                <Nothing label="Oops!!! No images yet"/>
              </div>
            )
          }
          <div className="">
            Images
          </div>
        </div>
      </div>
    </div>
  )
} 

export default ImagePage;
