'use client';

import ContactForm from '@/components/contact-us-form';
import IphonePlane from '@/components/iphone-plane';
import { BlueTshirtModel } from '@/components/models/blue-t-shirt';
import { CakeModel } from '@/components/models/cake';
import { CoffeeCup02Model } from '@/components/models/coffee-cup-02';
import { CoffeeMug01Model } from '@/components/models/coffee-mug-01';
import { PlateWithScreenModel } from '@/components/models/plate';
import { PoloTshirtModel } from '@/components/models/polo-t-shirt';
import { WaterBottle01Model } from '@/components/models/water-bottle-01';
import ProductView from '@/components/product-view';
import RigidBodyModel from '@/components/rigid-body-model';
import { generateRandomPositionVectors } from '@/helpers/random-position-generator';
import {
	Bounds,
	Environment,
	OrbitControls,
	PerspectiveCamera,
	View,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { CuboidCollider, Physics } from '@react-three/rapier';
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { Mesh } from 'three';

const Homepage = () => {
	const baseCanvasContainerRef = useRef<HTMLDivElement>(null!);
	const iphoneBoxRef = useRef<Mesh | null>(null);
	const [randomPositions] = useState(generateRandomPositionVectors(4, 4.5));

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
					<Bounds fit clip observe margin={0.7}>
						<IphonePlane ref={iphoneBoxRef} boxPosition={[-2.25, 0.25, -5]} />
					</Bounds>
					<Physics gravity={[0, 0, 0]}>
						<RigidBodyModel
							iphoneBoxRef={iphoneBoxRef}
							Model={({ showHidden }) => (
								<PlateWithScreenModel
									scale={8}
									showHidden={showHidden}
									position={[randomPositions[0].x, randomPositions[0].y, -1]}
								/>
							)}
						/>
						<RigidBodyModel
							iphoneBoxRef={iphoneBoxRef}
							Model={({ showHidden }) => (
								<BlueTshirtModel
									scale={10}
									showHidden={showHidden}
									position={[
										randomPositions[1].x,
										randomPositions[1].y,
										randomPositions[1].z,
									]}
								/>
							)}
						/>
						<RigidBodyModel
							iphoneBoxRef={iphoneBoxRef}
							Model={({ showHidden }) => (
								<PoloTshirtModel
									scale={12}
									showHidden={showHidden}
									position={[
										randomPositions[2].x,
										randomPositions[2].y,
										randomPositions[2].z,
									]}
								/>
							)}
						/>
						<RigidBodyModel
							iphoneBoxRef={iphoneBoxRef}
							Model={({ showHidden }) => (
								<WaterBottle01Model
									scale={12}
									showHidden={showHidden}
									position={[
										randomPositions[3].x,
										randomPositions[3].y,
										randomPositions[3].z,
									]}
								/>
							)}
						/>
						<CuboidCollider
							activeCollisionTypes={52224}
							friction={0}
							restitution={1}
							args={[20, 1, 10]}
							position={[0, 15, 0]}
						/>
						<CuboidCollider
							friction={0}
							restitution={1}
							args={[20, 1, 10]}
							position={[0, -15, 0]}
						/>
						<CuboidCollider
							friction={0}
							restitution={1}
							args={[1, 20, 10]}
							position={[20, 0, 0]}
						/>
						<CuboidCollider
							friction={0}
							restitution={1}
							args={[1, 20, 10]}
							position={[-20, 0, 0]}
						/>
					</Physics>
				</View>
			</div>
			<div className="flex h-fit w-full items-center justify-center">
				<div className="grid h-full w-[calc(95dvw)] grid-cols-2 gap-8 lg:grid-cols-3">
					{/* <div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#66d1ff] to-[#1b4f9f] lg:rounded-lg">
						<ProductView
							viewIndex={1}
							model={<BlueTshirtModel showHidden={false} />}
						/>
						<div className="absolute right-0 bottom-0 z-10 flex aspect-square w-1/5 items-center justify-center overflow-hidden rounded-tl-lg bg-black">
							<QRCode
								value={'/polo-tshirt'}
								className="h-[90%] w-[90%] rounded-none"
								bgColor="black"
								fgColor="white"
								viewBox={`0 0 256 256`}
							/>
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ff7aa0] to-[#8b1049] lg:rounded-lg">
						<ProductView
							viewIndex={2}
							model={<PoloTshirtModel showHidden={false} />}
						/>
						<div className="absolute right-0 bottom-0 z-10 flex aspect-square w-1/5 items-center justify-center overflow-hidden rounded-tl-lg bg-black">
							<QRCode
								value={'/polo-tshirt'}
								className="h-[90%] w-[90%] rounded-none"
								bgColor="black"
								fgColor="white"
								viewBox={`0 0 256 256`}
							/>
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ffd66b] to-[#b67b0a] lg:rounded-lg">
						<ProductView
							viewIndex={3}
							model={<WaterBottle01Model showHidden={false} />}
						/>
						<div className="absolute right-0 bottom-0 z-10 flex aspect-square w-1/5 items-center justify-center overflow-hidden rounded-tl-lg bg-black">
							<QRCode
								value={'/polo-tshirt'}
								className="h-[90%] w-[90%] rounded-none"
								bgColor="black"
								fgColor="white"
								viewBox={`0 0 256 256`}
							/>
						</div>
					</div> */}

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#9b8cff] to-[#36258a] lg:rounded-lg">
						<ProductView
							viewIndex={4}
							model={<CoffeeMug01Model />}
							margin={1.4}
						/>
						<div className="absolute right-0 bottom-0 z-10 flex aspect-square w-1/5 items-center justify-center overflow-hidden rounded-tl-lg bg-black">
							<QRCode
								value={'/polo-tshirt'}
								className="h-[90%] w-[90%] rounded-none"
								bgColor="black"
								fgColor="white"
								viewBox={`0 0 256 256`}
							/>
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#5ef7c5] to-[#047b61] lg:rounded-lg">
						<ProductView
							margin={1.1}
							viewIndex={5}
							model={<BlueTshirtModel showHidden={false} />}
						/>
						<div className="absolute right-0 bottom-0 z-10 flex aspect-square w-1/5 items-center justify-center overflow-hidden rounded-tl-lg bg-black">
							<QRCode
								value={'/polo-tshirt'}
								className="h-[90%] w-[90%] rounded-none"
								bgColor="black"
								fgColor="white"
								viewBox={`0 0 256 256`}
							/>
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#7ac9ff] to-[#205fa5] lg:rounded-lg">
						<ProductView
							viewIndex={6}
							margin={1.2}
							model={<WaterBottle01Model showHidden={false} />}
						/>
						<div className="absolute right-0 bottom-0 z-10 flex aspect-square w-1/5 items-center justify-center overflow-hidden rounded-tl-lg bg-black">
							<QRCode
								value={'/polo-tshirt'}
								className="h-[90%] w-[90%] rounded-none"
								bgColor="black"
								fgColor="white"
								viewBox={`0 0 256 256`}
							/>
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ff9e6b] to-[#c44500] lg:rounded-lg">
						<ProductView viewIndex={7} model={<CakeModel />} margin={1.25} />
						<div className="absolute right-0 bottom-0 z-10 flex aspect-square w-1/5 items-center justify-center overflow-hidden rounded-tl-lg bg-black">
							<QRCode
								value={'/polo-tshirt'}
								className="h-[90%] w-[90%] rounded-none"
								bgColor="black"
								fgColor="white"
								viewBox={`0 0 256 256`}
							/>
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ff4f4f] to-[#8a0e1a] lg:rounded-lg">
						<ProductView
							viewIndex={8}
							model={<CoffeeCup02Model />}
							margin={1.25}
						/>
						<div className="absolute right-0 bottom-0 z-10 flex aspect-square w-1/5 items-center justify-center overflow-hidden rounded-tl-lg bg-black">
							<QRCode
								value={'/polo-tshirt'}
								className="h-[90%] w-[90%] rounded-none"
								bgColor="black"
								fgColor="white"
								viewBox={`0 0 256 256`}
							/>
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#c8ff5a] to-[#3b7d00] lg:rounded-lg">
						<ProductView
							viewIndex={9}
							model={<PlateWithScreenModel />}
							margin={1.25}
						/>
						<div className="absolute right-0 bottom-0 z-10 flex aspect-square w-1/5 items-center justify-center overflow-hidden rounded-tl-lg bg-black">
							<QRCode
								value={'/polo-tshirt'}
								className="h-[90%] w-[90%] rounded-none"
								bgColor="black"
								fgColor="white"
								viewBox={`0 0 256 256`}
							/>
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
