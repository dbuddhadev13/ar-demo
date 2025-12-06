'use client';
import {
	Bounds,
	Environment,
	PerspectiveCamera,
	PresentationControls,
	View,
} from '@react-three/drei';
import { FunctionComponent, ReactNode } from 'react';
import { useRemountOnResize } from '../use-remount-on-resize';

const ProductView: FunctionComponent<{
	viewIndex: number;
	model: ReactNode;
}> = ({ model, viewIndex }) => {
	const viewKey = useRemountOnResize();
	return (
		<View index={viewIndex} className="h-full w-full" key={viewKey}>
			<ambientLight />
			<PerspectiveCamera
				makeDefault
				position={[0, 0, 20]}
				rotation={[0, 0, 0]}
			/>
			<Environment preset="studio" />
			<Bounds fit clip observe margin={1.5}>
				<PresentationControls snap={true}>{model}</PresentationControls>
			</Bounds>
		</View>
	);
};

export default ProductView;
