'use client';

import BouncePhysics from '@/components/bounce-physics';
import BouncingGLB from '@/components/bouncing-glb';
import ContactForm from '@/components/contact-us-form';
import IphonePlane, { IphonePlaneRef } from '@/components/iphone-plane';
import { BlueTshirtModel } from '@/components/models/blue-t-shirt';
import { CakeModel } from '@/components/models/cake';
import { CoffeeCup02Model } from '@/components/models/coffee-cup-02';
import { CoffeeMug01Model } from '@/components/models/coffee-mug-01';
import { CoffeeMug02Model } from '@/components/models/coffee-mug-02';
import { PlateModel } from '@/components/models/plate';
import { PoloTshirtModel } from '@/components/models/polo-t-shirt';
import { WaterBottle01Model } from '@/components/models/water-bottle-01';
import { WaterBottle02Model } from '@/components/models/water-bottle-02';
import VideoOverlayPlane from '@/components/plate-video-plane-overlay';
import ProductView from '@/components/product-view';
import { Box, Environment, PerspectiveCamera, View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Image from 'next/legacy/image';
import { useRef } from 'react';

const Homepage = () => {
	const iphonePlaneRefInstance = useRef<IphonePlaneRef>(null);
	const baseCanvasContainerRef = useRef<HTMLDivElement>(null!);

	return (
		<div
			className="flex h-full w-full flex-col gap-10 p-10"
			ref={baseCanvasContainerRef}
		>
			<div className="h-[90dvh] w-full">
				<View index={0} className="h-full w-full">
					<ambientLight />
					<PerspectiveCamera makeDefault position={[0, 0, 20]} />

					<Environment preset="studio" />
					<IphonePlane ref={iphonePlaneRefInstance} />
					<BouncePhysics boundaries={[32, 18]} z={-2.5}>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? (
									<Box position={[0, 1, 2.5]}>
										<meshStandardMaterial color="red" />
									</Box>
								) : null
							}
							model={<BlueTshirtModel scale={5} />}
							initialPos={[10, 4, -2.5]}
						/>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? (
									<Box position={[0, 1, 2.5]}>
										<meshStandardMaterial color="red" />
									</Box>
								) : null
							}
							model={<PoloTshirtModel scale={5} />}
							initialPos={[-12, 3.62, -2.5]}
						/>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? (
									<Box position={[0, 1, 2.5]}>
										<meshStandardMaterial color="red" />
									</Box>
								) : null
							}
							model={<WaterBottle01Model scale={5} />}
							initialPos={[-4.82, -2.28, -2.5]}
						/>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? (
									<Box position={[0, 1, 2.5]}>
										<meshStandardMaterial color="red" />
									</Box>
								) : null
							}
							model={<WaterBottle02Model scale={5} />}
							initialPos={[-10.28, -6.23, -2.5]}
						/>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? (
									<Box position={[0, 1, 2.5]}>
										<meshStandardMaterial color="red" />
									</Box>
								) : null
							}
							model={<CoffeeMug01Model scale={5} />}
							initialPos={[6.43, -8.2, -2.5]}
						/>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? (
									<Box position={[0, 1, 2.5]}>
										<meshStandardMaterial color="red" />
									</Box>
								) : null
							}
							model={<CoffeeMug02Model scale={5} />}
							initialPos={[-11.9, -0.8, -2.5]}
						/>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? (
									<Box position={[0, 1, 2.5]}>
										<meshStandardMaterial color="red" />
									</Box>
								) : null
							}
							model={<CoffeeCup02Model scale={5} />}
							initialPos={[0, 0, -2.5]}
						/>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? <VideoOverlayPlane /> : null
							}
							model={<PlateModel scale={5} />}
							initialPos={[-4, 6, -2.5]}
						/>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? (
									<Box position={[0, 1, 2.5]}>
										<meshStandardMaterial color="red" />
									</Box>
								) : null
							}
							model={<CakeModel scale={5} />}
							initialPos={[6.47, -1, -2.5]}
						/>
					</BouncePhysics>
				</View>
			</div>
			<div className="flex h-fit w-full items-center justify-center">
				<div className="grid h-full w-[calc(95dvw)] grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#66d1ff] to-[#1b4f9f] lg:rounded-lg">
						<ProductView viewIndex={1} model={<BlueTshirtModel />} />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ff7aa0] to-[#8b1049] lg:rounded-lg">
						<ProductView viewIndex={2} model={<PoloTshirtModel />} />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ffd66b] to-[#b67b0a] lg:rounded-lg">
						<ProductView viewIndex={3} model={<WaterBottle01Model />} />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#9b8cff] to-[#36258a] lg:rounded-lg">
						<ProductView viewIndex={4} model={<WaterBottle02Model />} />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#5ef7c5] to-[#047b61] lg:rounded-lg">
						<ProductView viewIndex={5} model={<CoffeeMug01Model />} />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#7ac9ff] to-[#205fa5] lg:rounded-lg">
						<ProductView viewIndex={6} model={<CoffeeMug02Model />} />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ff9e6b] to-[#c44500] lg:rounded-lg">
						<ProductView viewIndex={7} model={<CoffeeCup02Model />} />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ff4f4f] to-[#8a0e1a] lg:rounded-lg">
						<ProductView viewIndex={8} model={<PlateModel />} />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#c8ff5a] to-[#3b7d00] lg:rounded-lg">
						<ProductView viewIndex={9} model={<CakeModel />} />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>
				</div>
			</div>
			<ContactForm />
			<Canvas
				gl={{
					antialias: false,
					preserveDrawingBuffer: false,
					powerPreference: 'high-performance',
				}}
				eventSource={baseCanvasContainerRef}
				className="fixed! top-0 left-0 z-0 h-full w-full"
			>
				<View.Port />
			</Canvas>
		</div>
	);
};

export default Homepage;
