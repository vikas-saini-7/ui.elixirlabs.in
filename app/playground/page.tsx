import { notFound } from "next/navigation";
import Playground from "@/playground/index";

export default function PlaygroundPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_PLAYGROUND !== "true") {
    notFound();
  }

  return (
    <div>
      <Playground />
    </div>
  );
}
