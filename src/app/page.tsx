'use client';

import BouncePhysics from '@/components/bounce-physics';
import BouncingGLB from '@/components/bouncing-glb';
import ContactForm from '@/components/contact-us-form';
import IphonePlane, { IphonePlaneRef } from '@/components/iphone-plane';
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
							src="/01_blue-t-shirt.glb"
							initialPos={[10, 4, -2.5]}
							scale={5}
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
							src="/02_polo-t-shirt.glb"
							initialPos={[-12, 3.62, -2.5]}
							scale={5}
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
							src="/03_Water bottle-01.glb"
							initialPos={[-4.82, -2.28, -2.5]}
							scale={5}
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
							src="/04_Water bottle-02.glb"
							initialPos={[-10.28, -6.23, -2.5]}
							scale={5}
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
							src="/05_coffee-mug-01.glb"
							initialPos={[6.43, -8.2, -2.5]}
							scale={5}
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
							src="/06_coffee-mug-02.glb"
							initialPos={[-11.9, -0.8, -2.5]}
							scale={5}
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
							src="/07_coffee-cup-02.glb"
							initialPos={[0, 0, -2.5]}
							scale={5}
						/>
						<BouncingGLB
							planeRef={iphonePlaneRefInstance}
							renderIndicator={(intersects) =>
								intersects ? <VideoOverlayPlane /> : null
							}
							src="/08_plate.glb"
							initialPos={[-4, 6, -2.5]}
							scale={5}
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
							src="/09_Cake.glb"
							initialPos={[6.47, -1, -2.5]}
							scale={5}
						/>
					</BouncePhysics>
				</View>
			</div>
			<div className="flex h-fit w-full items-center justify-center">
				<div className="grid h-full w-[calc(95dvw)] grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#66d1ff] to-[#1b4f9f] lg:rounded-lg">
						<ProductView viewIndex={1} src="/01_blue-t-shirt.glb" />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ff7aa0] to-[#8b1049] lg:rounded-lg">
						<ProductView viewIndex={2} src="/02_polo-t-shirt.glb" />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ffd66b] to-[#b67b0a] lg:rounded-lg">
						<ProductView viewIndex={3} src="/03_Water bottle-01.glb" />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#9b8cff] to-[#36258a] lg:rounded-lg">
						<ProductView viewIndex={4} src="/04_Water bottle-02.glb" />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#5ef7c5] to-[#047b61] lg:rounded-lg">
						<ProductView viewIndex={5} src="/05_coffee-mug-01.glb" />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#7ac9ff] to-[#205fa5] lg:rounded-lg">
						<ProductView viewIndex={6} src="/06_coffee-mug-02.glb" />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ff9e6b] to-[#c44500] lg:rounded-lg">
						<ProductView viewIndex={7} src="/07_coffee-cup-02.glb" />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#ff4f4f] to-[#8a0e1a] lg:rounded-lg">
						<ProductView viewIndex={8} src="/08_plate.glb" />
						<div className="absolute right-0 bottom-0 z-10 aspect-square w-1/5 overflow-hidden rounded-tl-lg">
							<Image alt="qrcode" src="/qr-code.png" layout="fill" />
						</div>
					</div>

					<div className="relative aspect-square w-full rounded-md bg-linear-to-br from-[#c8ff5a] to-[#3b7d00] lg:rounded-lg">
						<ProductView viewIndex={9} src="/09_Cake.glb" />
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
