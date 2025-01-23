
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

    const response = await replicate.run(
      "zsxkib/mmaudio:4b9f801a167b1f6cc2db6ba7ffdeb307630bf411841d4e8300e63ca992de0be9",
      {
        input: {
        seed: -1,
        video: "https://huggingface.co/hkchengrex/MMAudio/resolve/main/examples/sora_galloping.mp4",
        prompt: prompt,
        duration: 8,
        num_steps: 25,
        cfg_strength: 4.5,
        negative_prompt: "music"
      }
    });

    if (!isPremium) await increaseLimit();

    return NextResponse.json(response);

  } catch (e) {
    console.log("[AN ERROR OCCURED]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
