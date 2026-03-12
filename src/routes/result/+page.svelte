<script lang="ts">
	import { goto } from "$app/navigation";
	import * as tmImage from "@teachablemachine/image";
	import { onMount } from "svelte";

	let model: tmImage.CustomMobileNet;
	let predictions: { className: string; probability: number }[] | null = [];
	let imgEl: HTMLImageElement;
	let imgUrl: string | null;
	let bestPrediction: { className: string; probability: number } | null;

	onMount(async () => {
		const modelURL = new URL("/tm_model/model.json", import.meta.url).href;
		const metadataURL = new URL("/tm_model/metadata.json", import.meta.url).href;

		model = await tmImage.load(modelURL, metadataURL);

		imgUrl = sessionStorage.getItem("uploaded_image");
		if (!imgUrl) {
			goto("/");
			return;
		}

		imgEl = new Image();
		imgEl.src = imgUrl;

		imgEl.onload = async () => {
			predictions = await model.predict(imgEl);

			bestPrediction = predictions?.reduce((best, current) =>
				current.probability > best.probability ? current : best
			);
		};
	});
</script>

<main>
	<h1>Hasil Klasifikasi</h1>

	<hr class="divider" />

	<div class="content">
		<!-- result image -->
		<div class="result_image inner_content">
			<h2>Gambar Yang Diprediksi</h2>

			<hr class="divider" />

			<img src={imgUrl} alt="uploaded_image" class="result_img" />
		</div>

		<!-- prediction result -->
		{#if predictions}
			<div class="prediction_list inner_content">
				<h2>Hasil Prediksi</h2>

				<hr class="divider" />

				{#each predictions as prediction}
					<div class="prediction_item">
						<div class="prediction_header">
							<span>{prediction.className}</span>
							<span>{Math.round(prediction.probability * 100)}%</span>
						</div>

						<div class="progress_container">
							<div
								class="progress_bar {prediction.className.replace(' ', '_').toLowerCase()}"
								style="width: {prediction.probability * 100}%"
							></div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<hr class="divider" />

	<a href="/" class="btn">Kembali ke Halaman Utama</a>
</main>

<style lang="postcss">
	@reference "tailwindcss";

	main {
		@apply grid;
	}

	.content {
		@apply grid justify-center gap-8;
	}

	.content img {
		@apply justify-self-center rounded-lg md:h-80;
	}

	.content h2 {
		@apply text-center;
	}

	.content .inner_content {
		@apply rounded-md border-2 border-gray-50 p-4;
	}

	.prediction_list,
	.result_image {
		@apply grid gap-4;
	}

	.prediction_item {
		@apply grid gap-2;
	}

	.prediction_header {
		@apply flex justify-between text-sm;
	}

	.progress_container {
		@apply h-5 w-full overflow-hidden rounded-full bg-neutral-300;
	}

	.progress_bar {
		@apply h-full rounded-full bg-neutral-500 transition-all duration-500;
	}

	.progress_bar.twist_orange {
		@apply bg-orange-500;
	}

	.progress_bar.apple_fiesta {
		@apply bg-red-500;
	}

	.progress_bar.japanese_sakura {
		@apply bg-pink-500;
	}

	.progress_bar.wild_flower {
		@apply bg-purple-500;
	}

	.progress_bar.teh_keraton {
		@apply bg-teal-500;
	}

	a.btn {
		@apply justify-self-center;
	}
</style>
