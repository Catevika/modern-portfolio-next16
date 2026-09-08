import { CanvasRevealEffect } from "@/components/ui/Canvas-reveal-effect";
import Card from "@/components/ui/Card";
import { PhaseButton } from "@/components/ui/PhaseButton";

const Approach = () => {
	return (
		<section className="w-full py-20">
			<h1 className="heading">
				My <span className="text-purple"> approach</span>
			</h1>
			<div className="my-20 flex flex-col lg:flex-row items-center justify-center gap-4">
				<Card
					title="Planning and Strategy"
					icon={<PhaseButton phase="Phase 1" />}
					description="We'll collaborate to define your project's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation and content requirements"
				>
					<CanvasRevealEffect
						animationSpeed={5.1}
						containerClassName="bg-emerald-900"
					/>
				</Card>
				<Card
					title="Development & Progress Update"
					icon={<PhaseButton phase="Phase 2" />}
					description="Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step on the way"
				>
					<CanvasRevealEffect
						animationSpeed={3}
						containerClassName="bg-black"
						colors={[
							[236, 72, 153],
							[232, 121, 249],
						]}
						dotSize={2}
					/>
				</Card>
				<Card
					title="Development & Launch"
					icon={<PhaseButton phase="Phase 3" />}
					description="This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up"
				>
					<CanvasRevealEffect
						animationSpeed={3}
						containerClassName="bg-sky-600"
						colors={[[125, 211, 252]]}
					/>
				</Card>
			</div>
		</section>
	);
};

export default Approach;
