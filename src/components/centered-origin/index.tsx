'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CenteredOrigin = ({ children }: { children: React.ReactNode }) => {
	const ref = useRef<THREE.Group>(null);

	useEffect(() => {
		if (!ref.current) return;

		// compute bounding box
		const box = new THREE.Box3().setFromObject(ref.current);
		const center = new THREE.Vector3();
		box.getCenter(center);

		// shift model so its center aligns with 0,0,0
		ref.current.position.sub(center);
	}, []);

	return <group ref={ref}>{children}</group>;
};

export default CenteredOrigin;
