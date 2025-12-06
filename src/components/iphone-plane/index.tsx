// IphonePlane.tsx
import { Box, Plane, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { forwardRef, useMemo, useRef, useImperativeHandle } from 'react';
import { Mesh, Box3 } from 'three';

export type IphonePlaneRef = {
	getBoundingBox: () => Box3 | null;
	mesh: Mesh | null;
};
const IphonePlane = forwardRef<IphonePlaneRef>((_, ref) => {
	const boxRef = useRef<Mesh>(null);
	const { viewport } = useThree();
	const texture = useTexture('/iphone.png');

	const aspect = useMemo(() => texture.width / texture.height, [texture]);

	const { width, height } = useMemo(() => {
		console.log(viewport);
		const h = viewport.height * 1.5;
		const w = h * aspect;
		return { width: w, height: h };
	}, [viewport, aspect]);

	const boxWidth = width / 2.75;
	const boxHeight = height / 2;
	const boxDepth = 5;

	// Expose functions/data through the forwarded ref
	useImperativeHandle(ref, () => ({
		getBoundingBox() {
			if (!boxRef.current) return null;
			const bbox = new Box3().setFromObject(boxRef.current);
			return bbox;
		},
		mesh: boxRef.current, // optional: expose the mesh itself
	}));

	return (
		<group>
			<Box
				ref={boxRef}
				args={[boxWidth, boxHeight, boxDepth]}
				position={[0, 0, -2.5]}
			>
				<meshStandardMaterial color="white" transparent opacity={0} />
			</Box>
			<Plane args={[width, height]} position={[0, 0, 0]}>
				<meshStandardMaterial map={texture} transparent />
			</Plane>
		</group>
	);
});

IphonePlane.displayName = 'IphonePlane';
export default IphonePlane;
