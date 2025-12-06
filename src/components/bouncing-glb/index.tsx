import { Gltf } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { BallCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { RefObject, useRef, useState } from 'react';
import { Box3, Object3D } from 'three';
import { IphonePlaneRef } from '../iphone-plane';
import { useConstantSpeed } from '../use-constant-speed';

type Props = {
	src: string;
	scale?: number;
	initialPos: [number, number, number];
	speed?: number;
	planeRef: RefObject<IphonePlaneRef | null>;
	renderIndicator?: (intersects: boolean) => React.ReactNode;
};

const BALL_RADIUS = 1.75;

const BouncingGLB = ({
	src,
	scale = 2.5,
	initialPos,
	speed = 1.5,
	planeRef,
	renderIndicator,
}: Props) => {
	const rbRef = useRef<RapierRigidBody>(null);
	const glbGroupRef = useRef<Object3D>(null!);
	const [intersects, setIntersects] = useState(false);

	const [initialVelocity] = useState<[number, number, number]>(() => {
		const angle = Math.random() * Math.PI * 2;
		return [Math.cos(angle) * speed, Math.sin(angle) * speed, 0];
	});

	useConstantSpeed(rbRef, speed);

	// -------- INTERNAL BOUNDING BOX COMPUTATION --------
	const getWorldBoundingBox = () => {
		const obj = glbGroupRef.current;
		if (!obj) return null;

		// Local bounding box from the GLB
		const localBB = new Box3().setFromObject(obj);

		return localBB;
	};
	// -----------------------------------------------------

	// example: check against iphone plane every frame
	useFrame(() => {
		const myBB = getWorldBoundingBox();
		const planeBB = planeRef.current?.getBoundingBox();

		if (myBB && planeBB) {
			const isBehindPlane = myBB.intersectsBox(planeBB);
			setIntersects(isBehindPlane);
		}
	});

	return (
		<RigidBody
			ref={rbRef}
			type="dynamic"
			position={initialPos}
			linearVelocity={initialVelocity}
			lockRotations
			enabledTranslations={[true, true, false]}
			friction={0}
			gravityScale={0}
			restitution={1}
			colliders={false}
		>
			<BallCollider args={[BALL_RADIUS]} />

			<group ref={glbGroupRef}>
				<Gltf src={src} scale={scale} />
				{renderIndicator?.(intersects)}
			</group>
		</RigidBody>
	);
};

export default BouncingGLB;
