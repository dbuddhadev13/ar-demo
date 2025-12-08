'use client';
import {
	Bounds,
	Environment,
	PerspectiveCamera,
	PresentationControls,
	View,
} from '@react-three/drei';
import { FunctionComponent, ReactNode } from 'react';
import CenteredOrigin from '../centered-origin';

const ProductView: FunctionComponent<{
	viewIndex: number;
	model: ReactNode;
	margin?: number;
}> = ({ model, viewIndex, margin = 1 }) => {
	return (
		<View index={viewIndex} className="h-full w-full">
			<ambientLight />
			<PerspectiveCamera
				makeDefault
				position={[0, 0, 20]}
				rotation={[0, 0, 0]}
			/>
			<Environment preset="studio" />
			<Bounds fit clip observe margin={margin}>
				<PresentationControls snap={true}>
					<CenteredOrigin>{model}</CenteredOrigin>
				</PresentationControls>
			</Bounds>
		</View>
	);
};

export default ProductView;
