import Image from "next/image";
import logo from "@/assets/logo.png";

type Props = {
  /** Kept for call-site compatibility; logo art is self-colored. */
  light?: boolean;
  className?: string;
};

export default function Logo({ className = "" }: Props) {
  return (
    <Image
      src={logo}
      alt="SL Sweep"
      width={160}
      height={160}
      priority
      className={`h-14 w-14 rounded-xl sm:h-16 sm:w-16 ${className}`}
    />
  );
}
