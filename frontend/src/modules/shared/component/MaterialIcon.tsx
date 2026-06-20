import { cn } from "@/utils";

interface MaterialIconProps {
  name: string;
  filled?: boolean;
  className?: string;
}

export default function MaterialIcon({
  name,
  filled = false,
  className,
}: MaterialIconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={
        filled
          ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
          : undefined
      }
      aria-hidden
    >
      {name}
    </span>
  );
}
