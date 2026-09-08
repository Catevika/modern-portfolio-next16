"use client";

import { cn } from "@/utils/cn";
import { useId, useMemo } from "react";

export const CanvasRevealEffect = ({
	animationSpeed = 0.4,
	opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
	colors = [[0, 255, 255]],
	containerClassName,
	showGradient = true,
}: {
	animationSpeed?: number;
	opacities?: number[];
	colors?: number[][];
	containerClassName?: string;
	dotSize?: number;
	showGradient?: boolean;
}) => {
	const grainId = useId().replace(/:/g, "");
	const glow = useMemo(() => {
		const palette = colors.length ? colors : [[0, 255, 255]];
		const base = palette[0];

		return {
			background: `radial-gradient(circle at 35% 30%, rgba(${base[0]}, ${base[1]}, ${base[2]}, 0.6) 0%, rgba(${base[0]}, ${base[1]}, ${base[2]}, 0.28) 24%, rgba(${base[0]}, ${base[1]}, ${base[2]}, 0.1) 42%, rgba(${base[0]}, ${base[1]}, ${base[2]}, 0) 72%)`,
			boxShadow: `inset 0 0 22px rgba(${base[0]}, ${base[1]}, ${base[2]}, 0.18), 0 0 25px rgba(${base[0]}, ${base[1]}, ${base[2]}, 0.18)`,
		};
	}, [colors]);

	const grain = useMemo(() => {
		const palette = colors.length ? colors : [[0, 255, 255]];
		const base = palette[0];
		const alpha = Math.min(0.9, 0.28 + (opacities[0] ?? 0.5) * 0.6);

		return {
			background: `radial-gradient(circle at center, rgba(${base[0]}, ${base[1]}, ${base[2]}, ${Math.min(1, alpha + 0.3)}) 0%, rgba(${base[0]}, ${base[1]}, ${base[2]}, 0.82) 18%, rgba(${base[0]}, ${base[1]}, ${base[2]}, 0.45) 42%, rgba(${base[0]}, ${base[1]}, ${base[2]}, 0.18) 68%, rgba(${base[0]}, ${base[1]}, ${base[2]}, 0) 100%)`,
		};
	}, [colors, opacities]);

	return (
		<div
			className={cn(
				"relative h-full w-full overflow-hidden bg-transparent",
				containerClassName
			)}
			aria-label="Reveal effect"
		>
			<svg className="absolute inset-0 h-0 w-0" aria-hidden="true">
				<filter id={grainId} x="-20%" y="-20%" width="140%" height="140%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="1.2"
						numOctaves="2"
						seed={String((animationSpeed * 10) | 0)}
						stitchTiles="stitch"
					/>
					<feColorMatrix type="saturate" values="0" />
					<feComponentTransfer>
						<feFuncA type="table" tableValues="0 0.8" />
					</feComponentTransfer>
				</filter>
			</svg>

			<div
				className="absolute inset-0"
				style={{
					...glow,
					opacity: 0.52,
					mixBlendMode: "screen",
					animation: `grainShift ${Math.max(10, 24 / Math.max(animationSpeed, 0.1))}s ease-in-out infinite alternate`,
				}}
			/>

			<div
				className="absolute inset-0"
				style={{
					background: grain.background,
					filter: `url(#${grainId}) contrast(360%) brightness(3.8)`,
					opacity: 1,
					mixBlendMode: "screen",
					transform: "scale(1.55)",
					animation: `grainShift ${Math.max(10, 24 / Math.max(animationSpeed, 0.1))}s ease-in-out infinite alternate`,
				}}
			/>

			{showGradient && (
				<div className="absolute inset-0 bg-linear-to-t from-slate-950/35 via-slate-950/15 to-transparent" />
			)}

			<style jsx>{`
				@keyframes grainShift {
					0% {
						transform: translate3d(0, 0, 0) scale(1.12);
						opacity: 0.6;
					}
					50% {
						transform: translate3d(-1.2%, 1.4%, 0) scale(1.18);
						opacity: 0.9;
					}
					100% {
						transform: translate3d(1.4%, -1.1%, 0) scale(1.14);
						opacity: 0.75;
					}
				}
			`}</style>
		</div>
	);
};

export default CanvasRevealEffect;
