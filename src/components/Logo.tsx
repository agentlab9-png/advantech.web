interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = '' }: LogoProps) {
  const h = Math.round(size * 1536 / 1024); // original SVG aspect ratio 1024×1536
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.svg`}
      alt="Advantech logo"
      width={size}
      height={h}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
