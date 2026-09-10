"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";

export const InfiniteMovingCards = ({
	items,
	direction = "left",
	speed = "fast",
	pauseOnHover = true,
	className,
}: {
	items: {
		id: number;
		quote: string;
		name: string;
		title: string;
	}[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	const getDirection = useCallback(() => {
		if (scrollerRef.current) {
			scrollerRef.current.style.animationDirection =
				direction === "left" ? "normal" : "reverse";
		}
	}, [direction]);

	const getSpeed = useCallback(() => {
		if (scrollerRef.current) {
			const duration =
				speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
			scrollerRef.current.style.animationDuration = duration;
		}
	}, [speed]);

	const addAnimation = useCallback(() => {
		if (!scrollerRef.current) return;

		const scroller = scrollerRef.current;
		const scrollerContent = Array.from(scroller.children);

		if (scroller.dataset.duplicated === "true") {
			getDirection();
			getSpeed();
			return;
		}

		const clonedNodes: Element[] = [];

		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true) as Element;
			clonedNodes.push(duplicatedItem);
			scroller.appendChild(duplicatedItem);
		});

		scroller.dataset.duplicated = "true";
		getDirection();
		getSpeed();

		return () => {
			clonedNodes.forEach((node) => node.remove());
			scroller.dataset.duplicated = "false";
		};
	}, [getDirection, getSpeed]);

	useEffect(() => {
		return addAnimation();
	}, [addAnimation]);

	return (
		<div
			ref={containerRef}
			className={cn(
				"scroller relative z-20 w-screen overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					"flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap",
					pauseOnHover && "hover:[animation-play-state:paused]"
				)}
				style={{
					animation: `scroll ${speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"} linear infinite`,
					animationDirection: direction === "left" ? "normal" : "reverse",
				}}
			>
				{items.map((item) => (
					<li
						className="w-[90vw] max-w-full relative rounded-2xl border border-b-0 shrink-0 border-slate-800 p-5 md:p-16 md:w-[60vw]"
						style={{
							background: "rgb(4,7,29)",
							backgroundColor:
								"linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
						}}
						key={item.id}
					>
						<blockquote>
							<div
								aria-hidden="true"
								className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%+4px)] w-[calc(100%+4px)]"
							></div>
							<span className=" relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
								{item.quote}
							</span>
							<div className="relative z-20 mt-6 flex flex-row items-center">
								<span className="flex flex-col gap-1">
									<span className="me-3">
										<Image
											src="/profile.svg"
											alt="Profile"
											width={50}
											height={50}
										/>
									</span>
									<span className="flex flex-col gap-1">
										<span className=" text-xl leading-[1.6] text-white font-bold">
											{item.name}
										</span>
										<span className="text-sm leading-[1.6] text-white-200 font-normal">
											{item.title}
										</span>
									</span>
								</span>
							</div>
						</blockquote>
					</li>
				))}
			</ul>
		</div>
	);
};
