import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Ico({
  children,
  size = 20,
  ...p
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...p}
    >
      {children}
    </svg>
  );
}

export function IconArrow(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Ico>
  );
}
export function IconArrowDown(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Ico>
  );
}
export function IconPlus(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M12 5v14M5 12h14" />
    </Ico>
  );
}
export function IconCheck(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M4 12l5 5L20 6" />
    </Ico>
  );
}
export function IconX(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Ico>
  );
}
export function IconBolt(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />
    </Ico>
  );
}
export function IconCpu(p: IconProps) {
  return (
    <Ico {...p}>
      <rect x="5" y="5" width="14" height="14" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
    </Ico>
  );
}
export function IconDoc(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4M9 12h7M9 16h7M9 8h3" />
    </Ico>
  );
}
export function IconTarget(p: IconProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </Ico>
  );
}
export function IconShield(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    </Ico>
  );
}
export function IconRadio(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M4 12a8 8 0 0116 0M7 12a5 5 0 0110 0" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </Ico>
  );
}
export function IconBell(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M10 17h4M6 10a6 6 0 0112 0c0 4 2 6 2 6H4s2-2 2-6" />
    </Ico>
  );
}
export function IconClock(p: IconProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Ico>
  );
}
export function IconUser(p: IconProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.5 3.6-8 8-8s8 3.5 8 8" />
    </Ico>
  );
}
export function IconCode(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
    </Ico>
  );
}
export function IconTrend(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </Ico>
  );
}
export function IconGavel(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M3 21h10M13 12l5-5 3 3-5 5zM9 8l7 7M11 6l5 5" />
    </Ico>
  );
}
export function IconSat(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M5 15l4 4M7 13l4 4M4 20l8-8M14 6l4 4M15 4l5 5M10 10l8 8-2 2-8-8zM18 15a5 5 0 01-5 5M22 15a9 9 0 01-9 9" />
    </Ico>
  );
}
export function IconChart(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </Ico>
  );
}
export function IconMail(p: IconProps) {
  return (
    <Ico {...p}>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 7l9 6 9-6" />
    </Ico>
  );
}
export function IconPhone(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />
    </Ico>
  );
}
export function IconPin(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </Ico>
  );
}
export function IconFilter(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M3 5h18l-7 9v6l-4-2v-4z" />
    </Ico>
  );
}
export function IconSliders(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M4 6h12M20 6h0M4 12h4M12 12h8M4 18h10M18 18h2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="16" cy="18" r="2" />
    </Ico>
  );
}
export function IconPlay(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M7 4v16l13-8z" />
    </Ico>
  );
}
export function IconGraduate(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      <path d="M22 10v6" />
    </Ico>
  );
}
export function IconCircuit(p: IconProps) {
  return (
    <Ico {...p}>
      <rect x="8" y="8" width="8" height="8" />
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5M5 5l4 3M15 16l4 3M5 19l4-3M15 8l4-3" />
    </Ico>
  );
}
export function IconMegaphone(p: IconProps) {
  return (
    <Ico {...p}>
      <path d="M18 4a8 8 0 010 16M4 9h2l8-4v14l-8-4H4V9z" />
      <path d="M6 15v4a1 1 0 001 1h2a1 1 0 001-1v-2" />
    </Ico>
  );
}

export const Icons: Record<string, (p: IconProps) => React.ReactElement> = {
  IconArrow,
  IconArrowDown,
  IconPlus,
  IconCheck,
  IconX,
  IconBolt,
  IconCpu,
  IconDoc,
  IconTarget,
  IconShield,
  IconRadio,
  IconBell,
  IconClock,
  IconUser,
  IconCode,
  IconTrend,
  IconGavel,
  IconSat,
  IconChart,
  IconMail,
  IconPhone,
  IconPin,
  IconFilter,
  IconSliders,
  IconPlay,
  IconGraduate,
  IconCircuit,
  IconMegaphone,
};

export function ArrowSvg() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
