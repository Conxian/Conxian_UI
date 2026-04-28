import { Card className="machined border-ghost hover:shadow-lg transition-all duration-500", Card className="machined border-ghost hover:shadow-lg transition-all duration-500"Content, Card className="machined border-ghost hover:shadow-lg transition-all duration-500"Header, Card className="machined border-ghost hover:shadow-lg transition-all duration-500"Title } from "@/components/ui/Card className="machined border-ghost hover:shadow-lg transition-all duration-500"";
import { cn } from "@/lib/utils";

interface StatCard className="machined border-ghost hover:shadow-lg transition-all duration-500"Props {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtext?: string;
  tooltipText?: string;
  loading?: boolean;
}

export const StatCard className="machined border-ghost hover:shadow-lg transition-all duration-500" = ({
  title,
  value,
  icon,
  subtext,
  tooltipText,
  loading = false,
}: StatCard className="machined border-ghost hover:shadow-lg transition-all duration-500"Props) => (
  <Card className="machined border-ghost hover:shadow-lg transition-all duration-500">
    <Card className="machined border-ghost hover:shadow-lg transition-all duration-500"Header className="flex flex-row items-center justify-between pb-2 space-y-0">
      <Card className="machined border-ghost hover:shadow-lg transition-all duration-500"Title className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">{title}</Card className="machined border-ghost hover:shadow-lg transition-all duration-500"Title>
      <div title={tooltipText} className="text-text-secondary">{icon}</div>
    </Card className="machined border-ghost hover:shadow-lg transition-all duration-500"Header>
    <Card className="machined border-ghost hover:shadow-lg transition-all duration-500"Content>
      {loading ? (
        <div className="h-8 w-24 bg-neutral-light animate-pulse rounded" />
      ) : (
        <div className="text-3xl font-black text-text tracking-tight tabular-nums">{value}</div>
      )}
      {subtext && (
        <p className={cn(
          "mt-1 text-xs font-medium",
          loading ? "text-transparent bg-neutral-light animate-pulse rounded w-32 h-3" : "text-text-secondary"
        )}>
          {subtext}
        </p>
      )}
    </Card className="machined border-ghost hover:shadow-lg transition-all duration-500"Content>
  </Card className="machined border-ghost hover:shadow-lg transition-all duration-500">
);
