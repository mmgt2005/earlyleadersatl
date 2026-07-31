interface IconProps {
  size: number;
}

const baseProps = {
  fill: "none",
  stroke: "#FFDD00",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PencilIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseProps}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function PeopleIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseProps}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function HeartIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseProps}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

export function BookFairIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseProps}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
