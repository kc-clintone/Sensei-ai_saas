
import { checkLimit, IncreaseLimit } from "@/lib/limit";
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

    if (!checklimit) {
      return new NextResponse("You have exhausted your free trial", { status: 403 })
    }

    if (!userId) {
      return new NextResponse("Not authorised", { status: 401 })
    }

    if (!prompt) {
      return new NextResponse("A prompt is required", {status: 400})
    }

    const response = await replicate.run(
      "tencent/hunyuan-video:8283f26be7ce5dc0119324b4752cbfd3970b3ef1b923c4d3c35eb6546518747a",
      {
        input: {
        fps: 24,
        width: 864,
        height: 480,
        prompt: prompt,
        infer_steps: 50,
        video_length: 60,
        embedded_guidance_scale: 6
      }
    });

    await IncreaseLimit();
    return NextResponse.json(response);

  } catch (e) {
    console.log("[AN ERROR OCCURED]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
