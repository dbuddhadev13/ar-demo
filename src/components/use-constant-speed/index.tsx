import { useFrame } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';

export const useConstantSpeed = (
	body: React.RefObject<RapierRigidBody | null>,
	targetSpeed: number
) => {
	const speed = targetSpeed;

	useFrame(() => {
		const rb = body.current;
		if (!rb) return;

		const v = rb.linvel();
		const mag = Math.sqrt(v.x * v.x + v.y * v.y);

		if (mag === 0) {
			// safety: kick it in a random direction
			rb.setLinvel(
				{
					x: (Math.random() - 0.5) * speed,
					y: (Math.random() - 0.5) * speed,
					z: 0,
				},
				true
			);
			return;
		}

		// Normalize and reapply constant magnitude
		const nx = v.x / mag;
		const ny = v.y / mag;

		rb.setLinvel({ x: nx * speed, y: ny * speed, z: 0 }, true);
	});
};
