'use client';
import {
	Bounds,
	Environment,
	Gltf,
	PresentationControls,
	View,
} from '@react-three/drei';
import { FunctionComponent } from 'react';

const ProductView: FunctionComponent<{
	viewIndex: number;
	src: string;
}> = ({ src, viewIndex }) => {
	return (
		<View index={viewIndex} className="h-full w-full">
			<ambientLight />
			<Environment preset="studio" />
			<Bounds fit clip observe>
				<PresentationControls snap={true}>
					<Gltf src={src} />
				</PresentationControls>
			</Bounds>
		</View>
	);
};

export default ProductView;
