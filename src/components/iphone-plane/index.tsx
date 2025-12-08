// IphonePlane.tsx
import { Box, Plane, useTexture } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Mesh } from 'three';

const IphonePlane = forwardRef<
	Mesh | null,
	{
		position?: [number, number, number];
		boxRotation?: [number, number, number];
		boxPosition?: [number, number, number];
	}
>(
	(
		{ position = [0, 0, 6], boxRotation = [0, 0, 0], boxPosition = [0, 0, -5] },
		ref
	) => {
		const texture = useTexture('/iphone-hand-landscape-white.png');
		const boxRefLocal = useRef<Mesh>(null!);

		const aspect = useMemo(() => texture.width / texture.height, [texture]);

		const { width, height } = useMemo(() => {
			const h = 14 * 1.5;
			const w = h * aspect;
			return { width: w, height: h };
		}, [aspect]);

		const boxHeight = height * 0.5;
		const boxWidth = (boxHeight * aspect) / 0.9;

		useImperativeHandle(ref, () => boxRefLocal.current, [boxRefLocal]);

		return (
			<group position={position}>
				<Plane args={[width * 1.1, height * 1.1]}>
					<meshStandardMaterial map={texture} transparent />
				</Plane>
				<Box
					args={[boxWidth, boxHeight, 5]}
					position={boxPosition}
					rotation={boxRotation}
					ref={boxRefLocal}
				>
					<meshStandardMaterial color={'white'} transparent opacity={0.25} />
				</Box>
			</group>
		);
	}
);

IphonePlane.displayName = 'IphonePlane';

export default IphonePlane;
