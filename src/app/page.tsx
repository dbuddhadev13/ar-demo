'use client';

import ContactForm from '@/components/contact-us-form';
import IphonePlane from '@/components/iphone-plane';
import { BlueTshirtModel } from '@/components/models/blue-t-shirt';
import { CakeModel } from '@/components/models/cake';
import { CoffeeCup02Model } from '@/components/models/coffee-cup-02';
import { CoffeeMug01Model } from '@/components/models/coffee-mug-01';
import { PlateWithScreenModel } from '@/components/models/plate';
import { WaterBottle01Model } from '@/components/models/water-bottle-01';
import ProductView from '@/components/product-view';
import {
	Bounds,
	Environment,
	OrbitControls,
	PerspectiveCamera,
	View,
	MeshReflectorMaterial,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Mesh } from 'three';
import CarouselItem from '@/components/carousel-item';

const Homepage = () => {
	const baseCanvasContainerRef = useRef<HTMLDivElement>(null!);
	const iphoneBoxRef = useRef<Mesh>(null!);
	return (
		<div className='h-full w-full overflow-hidden box-border'>
		<div
			className="flex h-full w-full flex-col gap-10 p-0 overflow-hidden"
			ref={baseCanvasContainerRef}
			style={{ touchAction: 'pan-y' }}
		>
			<div className="h-[90dvh] w-full">
				<View index={0} className="h-full w-full">
					<fog attach="fog" args={['#17171b', 20, 50]} />
					<color attach="background" args={['#17171b']} />
					<ambientLight intensity={0.7} />
					<directionalLight
						castShadow
						intensity={2.5}
						position={[0, 10, 6]}
						shadow-mapSize={[1024, 1024]}
					>
						<orthographicCamera
							attach="shadow-camera"
							left={-20}
							right={20}
							top={20}
							bottom={-20}
						/>
					</directionalLight>
					<PerspectiveCamera makeDefault position={[0, 0, 20]} />
					<mesh position={[0, -6, -10]} rotation={[-Math.PI / 2, 0, 0]}>
						<planeGeometry args={[100, 100]} />
						<MeshReflectorMaterial
							blur={[60, 30]}
							resolution={1024}
							mixBlur={2}
							mixStrength={6}
							depthScale={1}
							minDepthThreshold={0.05}
							maxDepthThreshold={1.0}
							color="#151515"
							metalness={0.6}
							roughness={1}
						/>
					</mesh>
					<Environment preset="dawn" />
					<Bounds fit clip observe margin={1.1}>
						<IphonePlane ref={iphoneBoxRef} />
					</Bounds>
					{/* <directionalLight position={[5, 3, 7.5]} intensity={1.5} /> */}

					<CarouselItem radius={15} anchorZ={3} iphoneBoxRef={iphoneBoxRef} />
					{/* <OrbitControls /> */}
				</View>
			</div>
			<div className="flex h-fit w-full items-center justify-center">
				<div className="grid h-full w-[calc(95dvw)] grid-cols-2 gap-8 lg:grid-cols-3">
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
		</div>
	);
};

export default Homepage;
