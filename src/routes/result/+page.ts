import { redirect } from "@sveltejs/kit";

export function load({ url }) {
	const img = url.searchParams.get("img");

	if (!img) {
		throw redirect(302, "/");
	}

	return {
		img
	};
}
