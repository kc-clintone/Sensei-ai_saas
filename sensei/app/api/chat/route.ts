
import { useAuth } from "@clerk/clerk-react";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function POST(
  req: Request
){
  try{
    const { userId } = useAuth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Not authorised", { status: 401 })
    }

    if (!config.apiKey) {
      return new NextResponse("OpenAi API key not configured", { status: 500})
    }

    if (!messages) {
      return new NextResponse("A prompt is required", {status: 400})
    }

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages
    });

    return NextResponse.json(res.data.choices[0].message);

  } catch (e) {
    console.log("[AN ERROR OCCURED]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
