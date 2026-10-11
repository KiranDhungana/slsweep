import Image, { type StaticImageData } from "next/image";

type Props = {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/** Cutout product art — sits on the parent section background. */
export default function ProductStage({
  src,
  alt,
  priority,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: Props) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-contain object-center"
        sizes={sizes}
      />
    </div>
  );
}
