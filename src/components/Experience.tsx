import { Button } from "@/components/ui/Button";
import { workExperience } from "@/data";
import Image from "next/image";

const Experience = () => {
	return (
		<div id="testimonials" className="py-20">
			<h1 className="heading">
				My <span className="text-purple">work experience</span>
			</h1>

			<div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2">
				{workExperience.map(
					({ id, title, desc, thumbnail, width, height }, index) => (
						<Button
							key={id}
							duration={5000}
							delay={index * 1000}
							containerClassName="h-full min-h-40"
							className="h-full w-full text-white"
						>
							<div className="flex min-h-40 flex-col gap-4 p-4 lg:flex-row lg:items-center lg:p-8">
								<Image
									src={thumbnail}
									alt={title}
									width={width}
									height={height}
									className="h-auto w-16 object-contain lg:w-24"
								/>

								<div className="lg:ms-4">
									<h2 className="text-start text-xl font-bold md:text-2xl">
										{title}
									</h2>

									<p className="mt-3 text-start font-semibold text-white/80">
										{desc}
									</p>
								</div>
							</div>
						</Button>
					)
				)}
			</div>
		</div>
	);
};

export default Experience;
