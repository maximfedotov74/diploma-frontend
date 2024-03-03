import { FallAppErr } from '../api/generated';

export function isFallErr(obj: any): obj is FallAppErr {
	return 'message' in obj && 'status' in obj;
}
