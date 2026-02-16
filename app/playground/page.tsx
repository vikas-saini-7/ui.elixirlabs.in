import { notFound } from "next/navigation";

export default function PlaygroundPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_PLAYGROUND !== "true") {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* <h2 className="text-2xl font-semibold">Welcome to Component Lab</h2>
      <p className="text-muted-foreground">
        Build, test, and stress your components here.
      </p> */}

      <div className="bg-red-500 w-40 h-40 rounded shadow-lg" />
    </div>
  );
}
