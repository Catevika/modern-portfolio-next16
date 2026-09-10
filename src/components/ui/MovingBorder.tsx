"use client";

import {
	motion,
	useAnimationFrame,
	useMotionTemplate,
	useMotionValue,
	useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

export interface MovingBorderProps {
	children: ReactNode;
	duration?: number;
	delay?: number;
	rx?: string;
	ry?: string;
	className?: string;
}

export function MovingBorder({
	children,
	duration = 2000,
	delay = 0,
	rx = "30%",
	ry = "30%",
	className,
}: MovingBorderProps) {
	const pathRef = useRef<SVGRectElement>(null);
	const progress = useMotionValue(0);

	useAnimationFrame((time) => {
		const path = pathRef.current;

		if (!path || duration <= 0) {
			return;
		}

		const length = path.getTotalLength();
		const progressPerMillisecond = length / duration;

		// delay is expressed in milliseconds
		const offsetTime = time + delay;

		progress.set((offsetTime * progressPerMillisecond) % length);
	});

	const x = useTransform(progress, (value) => {
		const path = pathRef.current;

		return path ? path.getPointAtLength(value).x : 0;
	});

	const y = useTransform(progress, (value) => {
		const path = pathRef.current;

		return path ? path.getPointAtLength(value).y : 0;
	});

	const transform = useMotionTemplate`
    translateX(${x}px)
    translateY(${y}px)
    translateX(-50%)
    translateY(-50%)
  `;

	return (
		<div
			className={`pointer-events-none absolute inset-0 overflow-hidden ${
				className ?? ""
			}`}
			aria-hidden="true"
		>
			<svg
				className="absolute inset-0 h-full w-full"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<rect
					ref={pathRef}
					x="0.5"
					y="0.5"
					width="calc(100% - 1px)"
					height="calc(100% - 1px)"
					rx={rx}
					ry={ry}
					fill="none"
					stroke="transparent"
				/>
			</svg>

			<motion.div
				className="absolute left-0 top-0 h-20 w-20"
				style={{ transform }}
			>
				{children}
			</motion.div>
		</div>
	);
}
