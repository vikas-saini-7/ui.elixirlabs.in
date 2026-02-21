import * as React from "react";

function cn(...args: (string | undefined | false | null)[]) {
  return args.filter(Boolean).join(" ");
}

export type CircularTextProps = {
  text: string;
  logoUrl?: string;
  size?: "sm" | "md" | "lg";

  /* 🔥 Customization Controls */
  speed?: number; // seconds
  direction?: "clockwise" | "counter-clockwise";
  pauseOnHover?: boolean;

  fontFamily?: string;
  fontWeight?: React.CSSProperties["fontWeight"];
  textColor?: string;
  letterSpacing?: number;
  startAngle?: number; // default -90
  radius?: number; // override default radius

  logoRotate?: boolean; // rotate logo separately
  logoSpeed?: number;

  className?: string;
  style?: React.CSSProperties;
};

const defaultSize = { circle: 200, logo: 100, font: 18, radius: 85 };

const sizeMap = {
  sm: { circle: 120, logo: 60, font: 12, radius: 48 },
  md: { circle: 200, logo: 100, font: 18, radius: 85 },
  lg: { circle: 320, logo: 180, font: 28, radius: 140 },
};

export const CircularText = React.forwardRef<HTMLDivElement, CircularTextProps>(
  (
    {
      text,
      logoUrl,
      size = "md",

      speed = 8,
      direction = "counter-clockwise",
      pauseOnHover = false,

      fontFamily = "Consolas, monospace",
      fontWeight = 400,
      textColor = "#000",
      letterSpacing = 0,
      startAngle = -90,
      radius,

      logoRotate = false,
      logoSpeed = 6,

      className,
      style,
      ...props
    },
    ref,
  ) => {
    const {
      circle,
      logo,
      font,
      radius: defaultRadius,
    } = sizeMap[size] || defaultSize;

    const finalRadius = React.useMemo(
      () => radius ?? defaultRadius,
      [radius, defaultRadius],
    );
    const chars = React.useMemo(() => text.split(""), [text]);

    const animationDirection =
      direction === "counter-clockwise" ? "reverse" : "normal";

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center rounded-full select-none group",
          className,
        )}
        style={{ width: circle, height: circle, ...style }}
        {...props}
      >
        {/* Rotating Text Container */}
        <div
          className="absolute w-full h-full"
          style={{
            animation: `rotate ${speed}s linear infinite`,
            animationDirection,
            animationPlayState: pauseOnHover ? "running" : undefined,
            transformOrigin: "50% 50%",
            fontFamily,
            fontSize: font,
            fontWeight,
            color: textColor,
            letterSpacing,
          }}
        >
          {chars.map((char, i) => {
            const angle = (360 / chars.length) * i + startAngle;
            const rad = (angle * Math.PI) / 180;
            const x = circle / 2 + finalRadius * Math.cos(rad);
            const y = circle / 2 + finalRadius * Math.sin(rad);

            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                  whiteSpace: "pre",
                  display: "inline-block",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Logo */}
        {logoUrl && (
          <div
            className="absolute rounded-full bg-center bg-cover"
            style={{
              width: logo,
              height: logo,
              backgroundImage: `url('${logoUrl}')`,
              left: (circle - logo) / 2,
              top: (circle - logo) / 2,
              animation: logoRotate
                ? `rotate ${logoSpeed}s linear infinite`
                : undefined,
              zIndex: 1,
            }}
          />
        )}

        {/* Inline Keyframes */}
        <style>
          {`
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .group:hover div {
              animation-play-state: ${pauseOnHover ? "paused" : "running"};
            }
          `}
        </style>
      </div>
    );
  },
);

CircularText.displayName = "CircularText";
