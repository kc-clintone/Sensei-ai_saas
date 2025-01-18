
import { checkLimit, IncreaseLimit } from "@/lib/limit";
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
    const { prompt, quantity=1, resolution="512x512" } = body;
    const checklimit = await checkLimit();

    if (!checklimit) {
      return new NextResponse("You have exhausted your free trial", { status: 403 })
    }

    if (!userId) {
      return new NextResponse("Not authorised", { status: 401 })
    }

    if (!config.apiKey) {
      return new NextResponse("OpenAi API key not configured", { status: 500})
    }

    if (!prompt) {
      return new NextResponse("A prompt is required", {status: 400})
    }

    if (!quantity) {
      return new NextResponse("Quantity is required", {status: 400})
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", {status: 400})
    }

    const res = await openai.createImage({
      prompt: prompt,
      n: parseInt(quantity, 10),
      size: resolution,
    });

    await IncreaseLimit()
    return NextResponse.json(res.data.data);

  } catch (e) {
    console.log("[AN ERROR OCCURED]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
