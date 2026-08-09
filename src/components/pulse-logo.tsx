export interface PulseLogoProps extends React.ComponentProps<"svg"> {}

export function PulseLogo(props: PulseLogoProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="120" cy="120" r="120" fill="#EB5E41" />
      <path
        d="M20 120.268H79.7015L92.3513 99.2938L112.554 220L129.032 20L150.119 144.461L160.299 120.268H220"
        stroke="white"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
