import * as zd from "zod"

export const formSchema = zd.objects({
  prompt: zd.string().min(1, {
    message: "Enter a prompt to proceed!",
  }) 
})
