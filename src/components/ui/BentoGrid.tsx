"use client";

import { BackgroundGradientAnimation } from "@/components/ui/GradientBg";
import GridGlobe from "@/components/ui/GridGlobe";
import MagicButton from "@/components/ui/MagicButton";
import animationData from "@/data/confetti.json";
import { cn } from "@/utils/cn";
import { Lottie } from "lottie-react";
import Image from "next/image";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
				className
			)}
		>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	id,
	title,
	description,
	img,
	imgClassName,
	titleClassName,
	spareImg,
	width,
	height,
}: {
	className?: string;
	id: number;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	img?: string;
	imgClassName?: string;
	titleClassName?: string;
	spareImg?: string;
	width?: number;
	height?: number;
}) => {
	const leftLists = ["ReactJS", "Express", "Typescript"];
	const rightLists = ["VueJS", "NuxtJS", "GraphQL"];

	const [copied, setCopied] = useState(false);
	const [animationRun, setAnimationRun] = useState(0);

	const handleCopy = () => {
		if (copied) return;
		const text = "hsu@jsmastery.pro";
		navigator.clipboard.writeText(text);
		setCopied(true);
		setAnimationRun((prev) => prev + 1);
	};

	return (
		<div
			className={cn(
				"row-span-1 relative overflow-hidden rounded-3xl border border-white/10 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
				className
			)}
			style={{
				background: "rgb(4,7,29)",
				backgroundColor:
					"linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
			}}
		>
			<div className={`${id === 6 && "flex justify-center"} h-full`}>
				<div className="absolute inset-0">
					{img && width && height && (
						<Image
							src={img}
							alt={img}
							width={width}
							height={height}
							sizes="100vw"
							loading="eager"
							className={cn(
								"h-full w-full object-cover object-center",
								imgClassName
							)}
						/>
					)}
				</div>
				<div
					className={`absolute right-0 -bottom-5 ${
						id === 5 && "w-full opacity-80"
					} `}
				>
					{spareImg && width && height && (
						<Image
							src={spareImg}
							alt={spareImg}
							width={width}
							height={height}
							sizes="100vw"
							loading="eager"
							className="h-full w-full object-cover object-center"
						/>
					)}
				</div>
				{id === 6 && <BackgroundGradientAnimation />}

				<div
					className={cn(
						titleClassName,
						"group-hover/bento:translate-x-2 transition duration-200 relative z-10 md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-6"
					)}
				>
					<div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
						{description}
					</div>
					<div
						className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
					>
						{title}
					</div>

					{id === 2 && <GridGlobe />}

					{id === 3 && (
						<div className="flex gap-1 lg:gap-4 w-fit absolute -right-3 lg:right-1">
							<div className="flex flex-col gap-3 md:gap-3 lg:gap-4">
								{leftLists.map((item, i) => (
									<span
										key={i}
										className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
									>
										{item}
									</span>
								))}
								<span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
							</div>
							<div className="flex flex-col gap-3 md:gap-3 lg:gap-4">
								<span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
								{rightLists.map((item, i) => (
									<span
										key={i}
										className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
									>
										{item}
									</span>
								))}
							</div>
						</div>
					)}
					{id === 6 && (
						<div className="relative mt-5 z-10">
							{copied && (
								<div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-[120%] -translate-x-1/2 -translate-y-1/2">
									<Lottie
										key={animationRun}
										loop={false}
										autoplay
										src={animationData}
										style={{ width: "100%", height: "100%" }}
									/>
								</div>
							)}
							<div className="relative z-10 flex items-center gap-2">
								<MagicButton
									title={copied ? "Email is Copied!" : "Copy my email address"}
									icon={<IoCopyOutline />}
									position="left"
									handleClick={handleCopy}
									otherClasses="!bg-[#161A31]"
									onMouseLeave={() => setCopied(false)}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
