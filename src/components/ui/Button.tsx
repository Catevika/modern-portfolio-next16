"use client";

import {
	createElement,
	type ComponentPropsWithoutRef,
	type CSSProperties,
	type ElementType,
	type ReactNode,
} from "react";

import { cn } from "@/utils/cn";
import { MovingBorder } from "@/components/ui/MovingBorder";

type ButtonOwnProps = {
	borderRadius?: string;
	children: ReactNode;
	containerClassName?: string;
	borderClassName?: string;
	duration?: number;
	delay?: number;
	className?: string;
};

export type ButtonProps<C extends ElementType = "button"> = ButtonOwnProps & {
	as?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps | "as">;

export function Button<C extends ElementType = "button">({
	borderRadius = "1.75rem",
	children,
	as,
	containerClassName,
	duration = 2000,
	delay = 0,
	className,
	...otherProps
}: ButtonProps<C>) {
	const Component = as ?? "button";

	const componentProps = {
		...otherProps,
		className: cn(
			"relative overflow-hidden bg-transparent p-px",
			containerClassName
		),
		style: {
			...(otherProps.style as CSSProperties | undefined),
			borderRadius,
		},
	};

	return createElement(
		Component,
		{
			...componentProps,
			style: {
				...componentProps.style,
				borderRadius,
			},
		},
		<>
			<div
				className="absolute inset-0 z-0"
				style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
			>
				<MovingBorder duration={duration} delay={delay} rx="30%" ry="30%">
					<div className="h-20 w-20 rounded-full bg-[radial-gradient(circle,var(--color-sky-500)_40%,transparent_60%)] opacity-80" />
				</MovingBorder>
			</div>

			<div
				className={cn(
					"relative z-10 flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/80 text-sm text-white antialiased backdrop-blur-xl",
					className
				)}
				style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
			>
				{children}
			</div>
		</>
	);
}
