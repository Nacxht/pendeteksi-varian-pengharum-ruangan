<script lang="ts">
	import { goto } from "$app/navigation";

	let file: File | null = null;
	let preview: string | null = null;

	function handleFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const selected = input.files?.[0];
		if (!selected) return;

		file = selected;
		preview = URL.createObjectURL(selected);
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!preview) return;

		goto(`/result?img=${encodeURIComponent(preview)}`);
	}
</script>

<main>
	<h1>Klasifikasi Varian Pengharum Ruangan</h1>

	<hr class="divider" />

	<form on:submit|preventDefault={handleSubmit}>
		<div class="flex w-full items-center justify-center">
			<label
				for="dropzone-file"
				class="bg-neutral-secondary-medium border-default-strong rounded-base hover:bg-neutral-tertiary-medium flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed"
			>
				<input
					id="dropzone-file"
					type="file"
					class="hidden"
					accept="image/*"
					on:change={handleFileChange}
				/>

				{#if preview}
					<div class="flex w-full flex-col items-center justify-between p-2">
						<div class="items-center justify-center overflow-hidden">
							<img src={preview} alt="preview" class="object-cover" />
						</div>

						<p class="mt-2 max-w-full truncate text-sm">{file?.name}</p>
					</div>
				{:else}
					<div class="text-body flex flex-col items-center justify-center pt-5 pb-6">
						<p class="mb-2 text-sm">
							<span class="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p class="text-xs">SVG, PNG, JPG or GIF</p>
					</div>
				{/if}
			</label>
		</div>

		<button class="btn">Predict</button>
	</form>
</main>

<style lang="postcss">
	@reference "tailwindcss";

	form {
		@apply grid gap-4 md:gap-6;
	}

	button.btn {
		@apply w-full md:w-fit;
	}
</style>
