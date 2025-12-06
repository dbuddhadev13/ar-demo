// BouncePhysics.tsx
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	boundaries: [number, number]; // width, height
	z?: number;
};

const BouncePhysics = ({ children, boundaries, z = -2.5 }: Props) => {
	const [w, h] = boundaries;
	const halfW = w / 2;
	const halfH = h / 2;

	return (
		<Physics gravity={[0, 0, 0]} timeStep="vary">
			{/* LEFT WALL */}
			<RigidBody type="fixed" position={[-halfW, 0, z]}>
				<CuboidCollider args={[0.1, halfH, 0.1]} />
			</RigidBody>

			{/* RIGHT WALL */}
			<RigidBody type="fixed" position={[halfW, 0, z]}>
				<CuboidCollider args={[0.1, halfH, 0.1]} />
			</RigidBody>

			{/* TOP WALL */}
			<RigidBody type="fixed" position={[0, halfH, z]}>
				<CuboidCollider args={[halfW, 0.1, 0.1]} />
			</RigidBody>

			{/* BOTTOM WALL */}
			<RigidBody type="fixed" position={[0, -halfH, z]}>
				<CuboidCollider args={[halfW, 0.1, 0.1]} />
			</RigidBody>

			{children}
		</Physics>
	);
};

export default BouncePhysics;
