'use client';
import { Plane, useVideoTexture } from '@react-three/drei';
import { Color } from 'three';

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
uniform float uAlpha;   // <-- external opacity control
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

const VideoOverlayPlane = () => {
	const texture = useVideoTexture('/overlay/plate-2.mp4', {
		muted: true,
		loop: true,
		autoplay: true,
		playsInline: true,
		crossOrigin: 'anonymous',
	});
	return (
		<Plane args={[1.5, 1.5]} scale={1} position={[0.1, 1.6, 2.5]}>
			<shaderMaterial
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				transparent
				uniforms={{
					uTexture: { value: texture },
					uKeyColor: { value: new Color(0x00ff00).toArray() },
					uSimilarity: { value: 0.55 },
					uSmoothness: { value: 0.2 },
					uAlpha: { value: 0.75 },
				}}
			/>
		</Plane>
	);
};

export default VideoOverlayPlane;
