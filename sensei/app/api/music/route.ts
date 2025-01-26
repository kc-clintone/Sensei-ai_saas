
import { checkLimit, increaseLimit } from "@/lib/limit";
import { checkSubscriptions } from "@/lib/subs";
import { useAuth } from "@clerk/clerk-react";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(
  req: Request
){
  try{
    const { userId } = useAuth();
    const body = await req.json();
    const { prompt } = body;
    const checklimit = checkLimit();
    const isPremium = checkSubscriptions();

    if (!checklimit && !isPremium) {
      return new NextResponse("You have exhausted your free trial", { status: 403 })
    }

    if (!userId) {
      return new NextResponse("Not authorised", { status: 401 })
    }

    if (!prompt) {
      return new NextResponse("A prompt is required", {status: 400})
    }

    const input = {
      prompt_b: prompt
    };

    const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });

    if (!isPremium) await increaseLimit();

    return NextResponse.json(response);

  } catch (e) {
    console.log("[AN ERROR OCCURED]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
