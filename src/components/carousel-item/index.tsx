import React, {
	useRef,
	useMemo,
	useCallback,
	useState,
	useEffect,
} from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { BlueTshirtModel } from '@/components/models/blue-t-shirt';
import { PlateWithScreenModel } from '@/components/models/plate';
import { PoloTshirtModel } from '@/components/models/polo-t-shirt';
import { WaterBottle01Model } from '@/components/models/water-bottle-01';

const models = [
	{ Component: PoloTshirtModel, scale: 10 },
	{ Component: BlueTshirtModel, scale: 10 },
	{ Component: WaterBottle01Model, scale: 10 },
	{ Component: PlateWithScreenModel, scale: 10 },
	{ Component: PoloTshirtModel, scale: 10 },
	{ Component: BlueTshirtModel, scale: 10 },
	{ Component: WaterBottle01Model, scale: 10 },
	{ Component: PlateWithScreenModel, scale: 10 },
];

interface CarouselItemWrapperProps {
	children: React.ReactNode;
	position: [number, number, number];
	rotation: [number, number, number];
	scale: number;
}

const CarouselItemWrapper = React.forwardRef<
	THREE.Group,
	CarouselItemWrapperProps
>(({ children, position, rotation, scale }, ref) => {
	return (
		<group ref={ref} position={position} rotation={rotation} scale={scale}>
			{children}
		</group>
	);
});

CarouselItemWrapper.displayName = 'CarouselItemWrapper';

interface CarouselItemProps {
	radius?: number;
	anchorZ?: number;
	tiltAngle?: number;
	yOffset?: number;
	springStiffness?: number;
	springDamping?: number;
	dragSensitivity?: number;
	velocityMultiplier?: number;
	iphoneBoxRef?: React.RefObject<THREE.Mesh>;
}

export default function CarouselItem({
	radius = 10,
	anchorZ = 3,
	tiltAngle = 0,
	yOffset = -4,
	springStiffness = 0.08,
	springDamping = 0.85,
	dragSensitivity = 0.005,
	velocityMultiplier = 15,
	iphoneBoxRef,
}: CarouselItemProps) {
	const groupRef = useRef<THREE.Group>(null);
	const itemCount = models.length;
	const anglePerItem = (Math.PI * 2) / itemCount;

	// Track which item is currently active (showing hidden content)
	const [activeIndex, setActiveIndex] = useState<number | null>(0);
	const [isSnapped, setIsSnapped] = useState(true);

	// Create refs for each item to check intersection
	const itemRefs = useRef<(THREE.Group | null)[]>(
		Array(itemCount).fill(null)
	);

	const state = useRef({
		isDragging: false,
		currentRotation: 0,
		targetRotation: 0,
		velocity: 0,
		dragStartX: 0,
		lastX: 0,
		lastTime: 0,
		rotationAtDragStart: 0,
	});

	// Calculate which item index is at the front based on rotation
	const getActiveIndexFromRotation = useCallback(
		(rotation: number) => {
			const normalizedRotation =
				((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
			const index = Math.round(normalizedRotation / anglePerItem) % itemCount;
			return (itemCount - index) % itemCount;
		},
		[anglePerItem, itemCount]
	);

	const getSnapTarget = useCallback(
		(rotation: number, vel: number) => {
			const predictedRotation = rotation + vel * velocityMultiplier;
			const snapIndex = Math.round(predictedRotation / anglePerItem);
			return snapIndex * anglePerItem;
		},
		[anglePerItem, velocityMultiplier]
	);

	// Check intersection with iPhone box
	const checkIntersection = useCallback(
		(itemIndex: number): boolean => {
			if (!iphoneBoxRef?.current || !itemRefs.current[itemIndex]) return false;

			const box = iphoneBoxRef.current;
			const item = itemRefs.current[itemIndex];

			if (!item) return false;

			const boxBB = new THREE.Box3().setFromObject(box);
			const itemBB = new THREE.Box3().setFromObject(item);

			return boxBB.intersectsBox(itemBB);
		},
		[iphoneBoxRef]
	);

	// Handle snap completion and check intersection
	const handleSnapComplete = useCallback(() => {
		const s = state.current;
		const frontIndex = getActiveIndexFromRotation(s.targetRotation);

		setTimeout(() => {
			if (iphoneBoxRef?.current) {
				const intersects = checkIntersection(frontIndex);
				if (intersects) {
					setActiveIndex(frontIndex);
				} else {
					setActiveIndex(frontIndex);
				}
			} else {
				setActiveIndex(frontIndex);
			}
			setIsSnapped(true);
		}, 100);
	}, [getActiveIndexFromRotation, checkIntersection, iphoneBoxRef]);

	const handlePointerDown = useCallback((clientX: number) => {
		const s = state.current;
		s.isDragging = true;
		s.dragStartX = clientX;
		s.lastX = clientX;
		s.lastTime = performance.now();
		s.rotationAtDragStart = s.currentRotation;
		s.velocity = 0;
		setIsSnapped(false);
		setActiveIndex(null);
	}, []);

	const handlePointerMove = useCallback(
		(clientX: number) => {
			const s = state.current;
			if (!s.isDragging) return;

			const deltaX = clientX - s.dragStartX;
			const now = performance.now();
			const dt = Math.max(now - s.lastTime, 1);

			const instantVelocity = ((clientX - s.lastX) / dt) * 16;
			s.velocity = s.velocity * 0.5 + instantVelocity * dragSensitivity * 0.5;

			s.lastX = clientX;
			s.lastTime = now;

			s.currentRotation = s.rotationAtDragStart + deltaX * dragSensitivity;
			s.targetRotation = s.currentRotation;
		},
		[dragSensitivity]
	);

	const handlePointerUp = useCallback(() => {
		const s = state.current;
		if (!s.isDragging) return;

		s.isDragging = false;
		s.targetRotation = getSnapTarget(s.currentRotation, s.velocity);
	}, [getSnapTarget]);

	// Attach to window events
	useEffect(() => {
		const onMouseDown = (e: MouseEvent) => {
			handlePointerDown(e.clientX);
		};

		const onMouseMove = (e: MouseEvent) => {
			handlePointerMove(e.clientX);
		};

		const onMouseUp = () => {
			handlePointerUp();
		};

		const onTouchStart = (e: TouchEvent) => {
			if (e.touches.length === 1) {
				handlePointerDown(e.touches[0].clientX);
			}
		};

		const onTouchMove = (e: TouchEvent) => {
			if (e.touches.length === 1) {
				handlePointerMove(e.touches[0].clientX);
			}
		};

		const onTouchEnd = () => {
			handlePointerUp();
		};

		window.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
		window.addEventListener('touchstart', onTouchStart);
		window.addEventListener('touchmove', onTouchMove);
		window.addEventListener('touchend', onTouchEnd);

		return () => {
			window.removeEventListener('mousedown', onMouseDown);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
		};
	}, [handlePointerDown, handlePointerMove, handlePointerUp]);

	useFrame(() => {
		if (!groupRef.current) return;

		const s = state.current;

		if (!s.isDragging) {
			const diff = s.targetRotation - s.currentRotation;
			s.velocity += diff * springStiffness;
			s.velocity *= springDamping;
			s.currentRotation += s.velocity;

			if (Math.abs(diff) < 0.001 && Math.abs(s.velocity) < 0.001) {
				s.currentRotation = s.targetRotation;
				s.velocity = 0;

				if (!isSnapped) {
					handleSnapComplete();
				}
			}
		}

		groupRef.current.rotation.y = s.currentRotation;
	});

	const items = useMemo(
		() =>
			Array.from({ length: itemCount }).map((_, index) => {
				const angle = (index / itemCount) * Math.PI * 2;
				const x = Math.sin(angle) * radius;
				const z = Math.cos(angle) * radius;
				return {
					position: [x, 0, z] as [number, number, number],
					rotation: [0, angle, 0] as [number, number, number],
					model: models[index],
				};
			}),
		[itemCount, radius]
	);

	const groupOffsetZ = anchorZ - radius;

	// Callback to set item refs
	const setItemRef = useCallback(
		(index: number) => (el: THREE.Group | null) => {
			itemRefs.current[index] = el;
		},
		[]
	);

	return (
		<group position={[0, yOffset, groupOffsetZ]} rotation={[tiltAngle, 0, 0]}>
			<group ref={groupRef}>
				{items.map((it, i) => {
					const { Component, scale } = it.model;
					const isActive = activeIndex === i && isSnapped;

					return (
						<CarouselItemWrapper
							key={i}
							ref={setItemRef(i)}
							position={it.position}
							rotation={it.rotation}
							scale={scale}
						>
							<Component showHidden={isActive} />
						</CarouselItemWrapper>
					);
				})}
			</group>
		</group>
	);
}