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
    label: "Photo",
  },
  {
    value: "2",
    label: "Photos",
  },
  {
    value: "3",
    label: "Photos",
  },
  {
    value: "4",
    label: "Photos",
  },
  {
    value: "5",
    label: "Photos",
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
