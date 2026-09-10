"use client";

import { cn } from "@/utils/cn";

import { type CSSProperties, useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
	gradientBackgroundStart = "rgb(108, 0, 162)",
	gradientBackgroundEnd = "rgb(0, 17, 82)",
	firstColor = "18, 113, 255",
	secondColor = "221, 74, 255",
	thirdColor = "100, 220, 255",
	fourthColor = "200, 50, 50",
	fifthColor = "180, 180, 50",
	pointerColor = "140, 100, 255",
	size = "80%",
	blendingValue = "hard-light",
	children,
	className,
	interactive = true,
	containerClassName,
}: {
	gradientBackgroundStart?: string;
	gradientBackgroundEnd?: string;
	firstColor?: string;
	secondColor?: string;
	thirdColor?: string;
	fourthColor?: string;
	fifthColor?: string;
	pointerColor?: string;
	size?: string;
	blendingValue?: string;
	children?: React.ReactNode;
	className?: string;
	interactive?: boolean;
	containerClassName?: string;
}) => {
	const interactiveRef = useRef<HTMLDivElement>(null);

	const currentPositionRef = useRef({ x: 0, y: 0 });
	const [tgX, setTgX] = useState(0);
	const [tgY, setTgY] = useState(0);

	useEffect(() => {
		document.body.style.setProperty(
			"--gradient-background-start",
			gradientBackgroundStart
		);
		document.body.style.setProperty(
			"--gradient-background-end",
			gradientBackgroundEnd
		);
		document.body.style.setProperty("--first-color", firstColor);
		document.body.style.setProperty("--second-color", secondColor);
		document.body.style.setProperty("--third-color", thirdColor);
		document.body.style.setProperty("--fourth-color", fourthColor);
		document.body.style.setProperty("--fifth-color", fifthColor);
		document.body.style.setProperty("--pointer-color", pointerColor);
		document.body.style.setProperty("--size", size);
		document.body.style.setProperty("--blending-value", blendingValue);
	}, [
		blendingValue,
		firstColor,
		gradientBackgroundEnd,
		gradientBackgroundStart,
		fourthColor,
		fifthColor,
		pointerColor,
		secondColor,
		size,
		thirdColor,
	]);

	useEffect(() => {
		if (!interactiveRef.current) {
			return;
		}

		let animationFrameId = 0;

		const move = () => {
			const nextX =
				currentPositionRef.current.x +
				(tgX - currentPositionRef.current.x) / 20;
			const nextY =
				currentPositionRef.current.y +
				(tgY - currentPositionRef.current.y) / 20;

			currentPositionRef.current = { x: nextX, y: nextY };
			interactiveRef.current!.style.transform = `translate(${Math.round(
				nextX
			)}px, ${Math.round(nextY)}px)`;

			animationFrameId = window.requestAnimationFrame(move);
		};

		animationFrameId = window.requestAnimationFrame(move);

		return () => window.cancelAnimationFrame(animationFrameId);
	}, [tgX, tgY]);

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (interactiveRef.current) {
			const rect = interactiveRef.current.getBoundingClientRect();
			setTgX(event.clientX - rect.left);
			setTgY(event.clientY - rect.top);
		}
	};

	const isSafari =
		typeof navigator !== "undefined" &&
		/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	const blendMode = blendingValue as CSSProperties["mixBlendMode"];

	return (
		<div
			className={cn(
				"h-full w-full absolute overflow-hidden top-0 left-0",
				containerClassName
			)}
			style={{
				background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
			}}
		>
			<svg className="hidden">
				<defs>
					<filter id="blurMe">
						<feGaussianBlur
							in="SourceGraphic"
							stdDeviation="10"
							result="blur"
						/>
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
							result="goo"
						/>
						<feBlend in="SourceGraphic" in2="goo" />
					</filter>
				</defs>
			</svg>
			<div className={cn("", className)}>{children}</div>
			<div
				className={cn("gradients-container h-full w-full blur-lg")}
				style={
					isSafari ?
						{ filter: "blur(32px)" }
					:	{ filter: "url(#blurMe) blur(40px)" }
				}
			>
				<div
					className={cn("absolute animate-first opacity-100")}
					style={{
						background: `radial-gradient(circle at center, rgb(${firstColor}) 0%, rgba(${firstColor}, 0) 50%) no-repeat`,
						mixBlendMode: blendMode,
						width: "var(--size)",
						height: "var(--size)",
						top: "calc(50% - var(--size) / 2)",
						left: "calc(50% - var(--size) / 2)",
						transformOrigin: "center center",
					}}
				></div>
				<div
					className={cn("absolute animate-second opacity-100")}
					style={{
						background: `radial-gradient(circle at center, rgba(${secondColor}, 0.8) 0%, rgba(${secondColor}, 0) 50%) no-repeat`,
						mixBlendMode: blendMode,
						width: "var(--size)",
						height: "var(--size)",
						top: "calc(50% - var(--size) / 2)",
						left: "calc(50% - var(--size) / 2)",
						transformOrigin: "calc(50% - 400px)",
					}}
				></div>
				<div
					className={cn("absolute animate-third opacity-100")}
					style={{
						background: `radial-gradient(circle at center, rgba(${thirdColor}, 0.8) 0%, rgba(${thirdColor}, 0) 50%) no-repeat`,
						mixBlendMode: blendMode,
						width: "var(--size)",
						height: "var(--size)",
						top: "calc(50% - var(--size) / 2)",
						left: "calc(50% - var(--size) / 2)",
						transformOrigin: "calc(50% + 400px)",
					}}
				></div>
				<div
					className={cn("absolute animate-fourth opacity-70")}
					style={{
						background: `radial-gradient(circle at center, rgba(${fourthColor}, 0.8) 0%, rgba(${fourthColor}, 0) 50%) no-repeat`,
						mixBlendMode: blendMode,
						width: "var(--size)",
						height: "var(--size)",
						top: "calc(50% - var(--size) / 2)",
						left: "calc(50% - var(--size) / 2)",
						transformOrigin: "calc(50% - 200px)",
					}}
				></div>
				<div
					className={cn("absolute animate-fifth opacity-100")}
					style={{
						background: `radial-gradient(circle at center, rgba(${fifthColor}, 0.8) 0%, rgba(${fifthColor}, 0) 50%) no-repeat`,
						mixBlendMode: blendMode,
						width: "var(--size)",
						height: "var(--size)",
						top: "calc(50% - var(--size) / 2)",
						left: "calc(50% - var(--size) / 2)",
						transformOrigin: "calc(50% - 800px) calc(50% + 800px)",
					}}
				></div>

				{interactive && (
					<div
						ref={interactiveRef}
						onMouseMove={handleMouseMove}
						className={cn("absolute opacity-70")}
						style={{
							background: `radial-gradient(circle at center, rgba(${pointerColor}, 0.8) 0%, rgba(${pointerColor}, 0) 50%) no-repeat`,
							mixBlendMode: blendMode,
							width: "100%",
							height: "100%",
							top: "-50%",
							left: "-50%",
						}}
					></div>
				)}
			</div>
		</div>
	);
};
