import Image from "next/image";
import type { Game } from "@/lib/games";

type Props = {
  game: Game;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const titleSize = {
  sm: "text-[11px]",
  md: "text-lg",
  lg: "text-4xl sm:text-5xl",
};

/** Generated tile artwork. Drop a real image into /public/games and set `image` to use it instead. */
export default function GameArt({ game, size = "lg", className = "" }: Props) {
  if (game.image) {
    return (
      <div className={`relative overflow-hidden bg-slate-950 ${className}`}>
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${game.bg} ${className}`}>
      {/* light burst */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.45),transparent_55%)]" />
      {/* sparkles */}
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />
      {/* coins */}
      {size !== "sm" && (
        <>
          <span className="absolute -bottom-3 left-4 h-10 w-10 rounded-full border-4 border-yellow-600 bg-gradient-to-br from-yellow-200 to-amber-500 shadow-lg" />
          <span className="absolute right-6 top-4 h-7 w-7 rounded-full border-[3px] border-yellow-600 bg-gradient-to-br from-yellow-200 to-amber-500 shadow-lg" />
        </>
      )}
      <div className={`relative text-center ${titleSize[size]}`}>
        {game.title.map((line) =>
          line ? (
            <span
              key={line}
              className={`game-title block bg-gradient-to-b ${game.text} bg-clip-text text-transparent`}
            >
              {line}
            </span>
          ) : null
        )}
      </div>
    </div>
  );
}
