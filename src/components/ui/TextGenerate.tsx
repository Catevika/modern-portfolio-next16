"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

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
	const wordsArray = words.split(" ");

	const renderWords = () => {
		return (
			<motion.div>
				{wordsArray.map((word, idx) => {
					return (
						<motion.span
							key={word + idx}
							initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
							animate={{ opacity: 1, filter: filter ? "blur(0px)" : "none" }}
							transition={{
								duration: duration ?? 0.5,
								delay: idx * 0.12,
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
