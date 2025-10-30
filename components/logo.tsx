import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  };

  const { width, height } = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src={"/Explosive Letter E.png"}
        // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Explosive%20Letter%20E-EBynhAzFp4XbQxjPLabw8QKPcJtMRd.png"
        alt="eksplode! Logo"
        width={width}
        height={height}
        className="object-contain"
      />
      <span className="font-bold text-lg text-primary hidden sm:inline">
        eksplode!
      </span>
    </div>
  );
}
