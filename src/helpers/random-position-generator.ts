type Vec3 = { x: number; y: number; z: number };

// Build a tuple of Vec3 of length N
type TupleOfVec3<
	N extends number,
	Acc extends Vec3[] = [],
> = Acc['length'] extends N ? Acc : TupleOfVec3<N, [...Acc, Vec3]>;

export const generateRandomPositionVectors = <N extends number>(
	count: N,
	minDist: number = 1.5
): TupleOfVec3<N> => {
	const vectors: Vec3[] = [];

	const rand = (): Vec3 => ({
		x: Math.random() * 28 - 14, // -14 → 14
		y: Math.random() * 22 - 11, // -11 → 11
		z: -2,
	});

	const isSeparated = (v: Vec3, arr: Vec3[]): boolean =>
		arr.every((o) => Math.hypot(v.x - o.x, v.y - o.y) >= minDist);

	while (vectors.length < count) {
		const candidate = rand();
		if (isSeparated(candidate, vectors)) vectors.push(candidate);
	}

	return vectors as TupleOfVec3<N>;
};
