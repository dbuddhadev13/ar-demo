// IphonePlane.tsx
import { Box, Plane, useTexture } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Mesh } from 'three';

const IphonePlane = forwardRef<Mesh | null>((_props, ref) => {
	const texture = useTexture('/iphone.png');
	const boxRefLocal = useRef<Mesh>(null!);

	const aspect = useMemo(() => texture.width / texture.height, [texture]);

	const { width, height } = useMemo(() => {
		const h = 9 * 1.5;
		const w = h * aspect;
		return { width: w, height: h };
	}, [aspect]);

	const boxHeight = height * 0.5;
	const boxWidth = boxHeight * aspect;

	useImperativeHandle(ref, () => boxRefLocal.current, [boxRefLocal]);

	return (
		<>
			<Plane args={[width * 1.1, height * 1.1]} position={[0, 0, 5]}>
				<meshStandardMaterial map={texture} transparent />
			</Plane>
			<Box
				args={[boxWidth, boxHeight, 5]}
				position={[0, 0, -3.1]}
				ref={boxRefLocal}
			>
				<meshStandardMaterial color={'white'} transparent opacity={0} />
			</Box>
		</>
	);
});

IphonePlane.displayName = 'IphonePlane';

export default IphonePlane;
