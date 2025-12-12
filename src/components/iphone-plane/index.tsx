// IphonePlane.tsx
import { Box, Plane, useTexture } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { DoubleSide, Mesh } from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec3 uKeyColor;
uniform float uSimilarity;
uniform float uSmoothness;
uniform float uAlpha;
varying vec2 vUv;

void main() {
    vec4 tex = texture2D(uTexture, vUv);
    vec3 color = tex.rgb;

    float dist = distance(color, uKeyColor);
    float keyAlpha = smoothstep(uSimilarity, uSimilarity + uSmoothness, dist);

    float finalAlpha = keyAlpha * uAlpha;

    gl_FragColor = vec4(color, finalAlpha);
}
`;

const IphonePlane = forwardRef<
	Mesh | null,
	{
		position?: [number, number, number];
		boxRotation?: [number, number, number];
		boxPosition?: [number, number, number];
	}
>((
	{ position = [0, 0, 6], boxRotation = [0, 0, 0], boxPosition = [0, 0, -3] },
	ref
) => {
	const texture = useTexture('/ihone-image.jpg');
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
			{/* Plane with chroma key shader */}
			<Plane args={[width * 0.57, height * 0.57]}>
				<shaderMaterial
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					transparent
					side={DoubleSide}
					uniforms={{
						uTexture: { value: texture },
						uKeyColor: { value: new THREE.Color(0x00ff00).toArray() }, // Green to remove
						uSimilarity: { value: 0.5 }, // adjust
						uSmoothness: { value: 0.2 },  // adjust
						uAlpha: { value: 1.0 },       // full opacity
					}}
				/>
			</Plane>

			<Box
				args={[boxWidth, boxHeight, 5]}
				position={boxPosition}
				rotation={boxRotation}
				ref={boxRefLocal}
			>
				<meshStandardMaterial color={'white'} transparent opacity={0} />
			</Box>
		</group>
	);
});

IphonePlane.displayName = 'IphonePlane';
export default IphonePlane;
