import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="bg-neutral-light text-ink py-2 px-6 flex justify-between items-center border-b border-accent/20">
      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-light">
        {title}
      </h2>
      {children && (
        <div className="flex items-center gap-3 text-[10px] font-black text-ink-light uppercase tracking-[0.2em]">
          {children}
        </div>
      )}
    </div>
  );
}
