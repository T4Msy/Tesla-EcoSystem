interface Props {
  size?: number;
  className?: string;
}
export default function TeslaLogo({ size = 28, className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 342 342"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M171 76c45 0 84 7 119 21-15 27-31 52-49 75-22-16-49-26-70-26s-48 10-70 26c-18-23-34-48-49-75 35-14 74-21 119-21zm0-46c-65 0-126 14-181 39l9 14c61-23 119-30 172-30s111 7 172 30l9-14C297 44 236 30 171 30zm0 84c-26 0-49 13-49 13l49 217 49-217s-23-13-49-13z" />
    </svg>
  );
}
