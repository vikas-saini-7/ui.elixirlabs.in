import { cn } from "@/lib/utils";

interface CalloutProps {
  children: React.ReactNode;
  type?: "note" | "warning" | "tip";
}

export function Callout({ children, type = "note" }: CalloutProps) {
  const styles = {
    note: "border-neutral-300 text-black dark:border-neutral-700 dark:text-white",
    warning:
      "border-neutral-300 text-black dark:border-neutral-700 dark:text-white",
    tip: "border-neutral-300 text-black dark:border-neutral-700 dark:text-white",
  };

  return (
    <div
      className={cn(
        "my-6 border-l-2 px-4 py-2 text-sm font-medium",
        styles[type],
      )}
    >
      {children}
    </div>
  );
}
