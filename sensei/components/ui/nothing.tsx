import Image from "next/image";

interface Props {
  label: string;
}

export const Nothing = ({
  label
}: Props) => {
  return (
    <div className="flex-col flex p-20 justify-center items-center h-full">
      <div className="h-72 w-72 relative">
        <Image
          alt="No messages yet"
          fill
          src="/nothing.png"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
