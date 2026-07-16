import ChatIcon from "../chat/ChatIcon";

export default function FileIcon({ type }: { type: string }) {
  return (
    <div className="relative aspect-square h-12">
      <ChatIcon label="file" weight="thin" className="size-full" />

      <p className="text-[8px] absolute bottom-1 font-bold left-1/2 -translate-1/2">
        {type.toUpperCase()}
      </p>
    </div>
  );
}
