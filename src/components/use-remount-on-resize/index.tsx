'use client';
import { useEffect, useState } from 'react';

export function useRemountOnResize() {
	const [key, setKey] = useState(() => Date.now());

	useEffect(() => {
		const trigger = () => setKey(Date.now());

		window.addEventListener('resize', trigger);
		window.addEventListener('orientationchange', trigger);

		if (window.visualViewport) {
			window.visualViewport.addEventListener('resize', trigger);
			window.visualViewport.addEventListener('scroll', trigger);
		}

		return () => {
			window.removeEventListener('resize', trigger);
			window.removeEventListener('orientationchange', trigger);

			if (window.visualViewport) {
				window.visualViewport.removeEventListener('resize', trigger);
				window.visualViewport.removeEventListener('scroll', trigger);
			}
		};
	}, []);

	return key;
}
