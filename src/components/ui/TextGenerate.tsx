"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TextGenerateEffect = ({
	words,
	className,
	filter = true,
	duration = 0.5,
}: {
	words: string;
	className?: string;
	filter?: boolean;
	duration?: number;
}) => {
	const [isReady, setIsReady] = useState(false);
	const wordsArray = words.split(" ");

	useEffect(() => {
		const id = requestAnimationFrame(() => setIsReady(true));
		return () => cancelAnimationFrame(id);
	}, []);

	const renderWords = () => {
		return (
			<motion.div>
				{wordsArray.map((word, idx) => {
					const hiddenStyle = {
						opacity: 0,
						filter: filter ? "blur(10px)" : "none",
					};
					const visibleStyle = {
						opacity: 1,
						filter: filter ? "blur(0px)" : "none",
					};

					return (
						<motion.span
							key={word + idx}
							initial={hiddenStyle}
							animate={isReady ? visibleStyle : hiddenStyle}
							transition={{
								duration: duration ?? 0.5,
								delay: isReady ? idx * 0.12 : 0,
								ease: "easeOut",
							}}
							className={cn(
								idx > 3 ? "text-purple" : "text-white",
								"mr-2 inline-block"
							)}
						>
							{word}
						</motion.span>
					);
				})}
			</motion.div>
		);
	};

	return (
		<div className={cn("font-bold", className)}>
			<div className="my-4">
				<div className="leading-snug tracking-wide text-white">
					{renderWords()}
				</div>
			</div>
		</div>
	);
};
