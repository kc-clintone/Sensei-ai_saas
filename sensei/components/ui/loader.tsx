import Image from "next/image"

interface Prop {
  label: string;
}

export const Loader = ({
  label
}: Prop) => {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-y-4">
      <div className="h-10 w-10 animate-pulse relative">
        <Image
          alt="logo"
          fill
          src="/sensei-logo.png"
        />
      </div>
      <p className="text-muted-foreground text-center text-sm">{label}</p>
    </div>
  )
}
