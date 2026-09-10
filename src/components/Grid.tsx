import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { gridItems } from "@/data";

const Grid = () => {
	return (
		<section id="about">
			<BentoGrid>
				{gridItems.map(
					({
						id,
						title,
						description,
						className,
						img,
						imgClassName,
						titleClassName,
						spareImg,
						width,
						height,
					}) => (
						<BentoGridItem
							id={id}
							key={id}
							title={title}
							description={description}
							className={className}
							img={img}
							imgClassName={imgClassName}
							titleClassName={titleClassName}
							spareImg={spareImg}
							width={width ?? 100}
							height={height ?? 100}
						/>
					)
				)}
			</BentoGrid>
		</section>
	);
};
export default Grid;
