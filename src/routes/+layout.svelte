<script lang="ts">
	import "./layout.css";

	let { children } = $props();
</script>

<svelte:head>
	<title>Klasifikasi Varian Pengharum Ruangan</title>
</svelte:head>

{@render children()}

<style lang="postcss">
	@reference "tailwindcss";

	:global(body) {
		@apply bg-gray-900 text-gray-50;
	}

	:global(main) {
		@apply px-4 py-4 lg:px-96 lg:py-8;
	}

	:global(h1) {
		@apply text-center text-2xl font-bold md:text-left md:text-3xl;
	}

	:global(h2) {
		@apply text-xl font-bold md:text-2xl;
	}

	:global(hr.divider) {
		@apply my-4 border border-gray-50;
	}

	:global(.btn) {
		@apply w-fit cursor-pointer rounded-md border border-gray-50 px-4 py-2 font-bold transition-all duration-300 hover:bg-gray-50 hover:text-gray-950;
	}
</style>
