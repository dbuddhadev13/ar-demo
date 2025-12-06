import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import {
	FunctionComponent,
	ReactNode,
	RefObject,
	useRef,
	useState,
} from 'react';
import { Box3, Group, Mesh, Vector3 } from 'three';

const CONSTANT_SPEED = 5.5;

const tmpBB1 = new Box3();
const tmpBB2 = new Box3();

const RigidBodyModel: FunctionComponent<{
	Model: (props: {
		showHidden: boolean;
		position: [number, number, number];
	}) => ReactNode;
	iphoneBoxRef: RefObject<Mesh | null>;
}> = ({ Model, iphoneBoxRef }) => {
	const groupRef = useRef<Group>(null);
	const rbRef = useRef<RapierRigidBody>(null);

	const [showHidden, setShowHidden] = useState(false);

	const [randomVelocity] = useState(() => ({
		x: Math.random() * 10 - 5,
		y: Math.random() * 10 - 5,
		z: 0,
	}));
	const [randomPosition] = useState(() => ({
		x: Math.random() * 20 - 10,
		y: Math.random() * 14 - 7,
		z: -2,
	}));

	// -----------------------------
	// store velocity in a ref (SAFE)
	// -----------------------------
	const vel = useRef(
		new Vector3(randomVelocity.x, randomVelocity.y, randomVelocity.z)
	);

	// store initial velocity in state (SAFE in render)
	const [initialVel] = useState<[number, number, number]>([
		randomVelocity.x,
		randomVelocity.y,
		randomVelocity.z,
	]);

	useFrame(() => {
		const rb = rbRef.current;
		const group = groupRef.current;
		const iphone = iphoneBoxRef.current;

		if (!rb || !group || !iphone) return;

		// Constant speed correction
		const cur = rb.linvel();
		const mag = Math.hypot(cur.x, cur.y);

		if (mag > 0) {
			const nx = (cur.x / mag) * CONSTANT_SPEED;
			const ny = (cur.y / mag) * CONSTANT_SPEED;

			vel.current.set(nx, ny, 0);
			rb.setLinvel({ x: nx, y: ny, z: 0 }, true);
		}

		// Bounding box checks
		tmpBB1.setFromObject(group);
		tmpBB2.setFromObject(iphone);

		setShowHidden(tmpBB1.intersectsBox(tmpBB2));
	});

	return (
		<RigidBody
			ref={rbRef}
			type="dynamic"
			colliders="cuboid"
			canSleep={false}
			lockRotations
			enabledTranslations={[true, true, false]}
			friction={0}
			restitution={0}
			linearDamping={0}
			angularDamping={0}
			gravityScale={0}
			linearVelocity={initialVel} // <-- SAFE
		>
			<group ref={groupRef}>
				<Model
					showHidden={showHidden}
					position={[randomPosition.x, randomPosition.y, randomPosition.z]}
				/>
			</group>
		</RigidBody>
	);
};

export default RigidBodyModel;
