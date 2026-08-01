import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: { className?: string; children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4", className)} {...props}>
      {children}
    </div>
  );
}
