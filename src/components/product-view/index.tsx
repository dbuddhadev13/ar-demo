'use client';
import {
	Bounds,
	Environment,
	PresentationControls,
	View,
} from '@react-three/drei';
import { FunctionComponent, ReactNode } from 'react';

const ProductView: FunctionComponent<{
	viewIndex: number;
	model: ReactNode;
}> = ({ model, viewIndex }) => {
	return (
		<View index={viewIndex} className="h-full w-full">
			<ambientLight />
			<Environment preset="studio" />
			<Bounds fit clip observe>
				<PresentationControls snap={true}>{model}</PresentationControls>
			</Bounds>
		</View>
	);
};

export default ProductView;
