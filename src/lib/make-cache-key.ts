interface Props {
	coachId: string
	action?: string
}

export default function makeCacheKey({ action, coachId }: Props) {
	return `${coachId}-${action}`
}
