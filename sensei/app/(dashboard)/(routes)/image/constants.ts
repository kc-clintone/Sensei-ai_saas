import * as zd from "zod"

export const formSchema = zd.object({
  prompt: zd.string().min(1, {
    message: "Enter a prompt to proceed!",
  }),
  quantity: zd.string().min(1),
  resolution: zd.string().min(1)
})

export const imageQuantity = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photos",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "4",
    label: "4 Photos",
  },
  {
    value: "5",
    label: "5 Photos",
  }
]

export const resOptions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  }
]
