'use client';
import {
	Bounds,
	Environment,
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
			<Environment preset="studio" />
			<Bounds fit clip observe>
				<PresentationControls snap={true}>{model}</PresentationControls>
			</Bounds>
		</View>
	);
};

export default ProductView;
