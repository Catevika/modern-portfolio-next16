import { InfiniteMovingCards } from "@/components/ui/Infinite-moving-cards";
import { companies, testimonials } from "@/data";
import Image from "next/image";

const Clients = () => {
	return (
		<div id="testimonials" className="py-20">
			<h1 className="heading">
				Kind words from <span className="text-purple">satisfied clients</span>
			</h1>
			<div className="flex flex-col items-center max-lg:mt-10">
				<InfiniteMovingCards
					items={testimonials}
					direction="left"
					speed="slow"
				/>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
				{companies.map(({ id, img, name, nameImg, width, height }) => (
					<div key={id} className="flex md:max-w-60 max-w-32 gap-2">
						<Image
							src={img}
							alt={name}
							width={width}
							height={height}
							className="md:w-10 w-5"
						/>
						<Image
							src={nameImg}
							alt={name}
							width={width}
							height={height}
							className="md:w-24 w-20 object-contain"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Clients;
