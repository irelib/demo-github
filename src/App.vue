<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VueVideoPlayer from '@com/ArtVideoPlayer.vue';
import DemoPlayer from '@com/DemoPlayer.vue';
import OptionListAnime from '@com/OptionListAnime.vue';
import LyricsScroll from '@com/LyricsScroll.vue';
import SlideIn from '@com/SlideIn.vue';
import WaterfallOfLocal from '@com/WaterfallOfLocal.vue';
import WaterfallOfNetwork from '@com/WaterfallOfNetwork.vue';
import Empty from '@com/Empty.vue';

const activeTab = ref(localStorage.getItem('activeTab') || 'Video');

onMounted(() => {
	const btnList = document.querySelectorAll('.tabs button');

	const localActiveTab = localStorage.getItem('activeTab');
	if (localActiveTab) {
		activeTab.value = localActiveTab;
		document.title = activeTab.value + ' / Demo';
		btnList.forEach((btn) => {
			if (activeTab.value === btn.innerHTML) {
				btn.classList.add('activeButton');
			}
		});
	}

	btnList.forEach((btn) => {
		btn.addEventListener('mouseup', (e: any) => e.target?.blur());

		btn.addEventListener('click', (e: any) => {
			activeTab.value = e.target?.innerHTML || 'Video';
			document.title = activeTab.value + ' / Demo';
			localStorage.setItem('activeTab', activeTab.value);

			const btnList = document.querySelectorAll('.tabs button');
			const activeBtn = document.querySelector('.tabs button.activeButton');
			activeBtn?.classList.remove('activeButton');
			btnList.forEach((btn) => {
				if (activeTab.value === btn.innerHTML) {
					btn.classList.add('activeButton');
				}
			});
		});
	});
});
</script>

<template>
	<div class="PageContainer">
		<div class="tabs">
			<button>Video</button>
			<button>DemoPlayer</button>
			<button>Lyrics</button>
			<button>Anime</button>
			<button>SlideIn</button>
			<button>WaterfallOfLocal</button>
			<button>WaterfallOfNetwork</button>
			<button>Empty</button>
		</div>

		<div class="PageContent">
			<VueVideoPlayer v-if="activeTab === 'Video'"></VueVideoPlayer>
			<DemoPlayer v-if="activeTab === 'DemoPlayer'"></DemoPlayer>
			<OptionListAnime v-if="activeTab === 'Anime'"></OptionListAnime>
			<LyricsScroll v-if="activeTab === 'Lyrics'"></LyricsScroll>
			<SlideIn v-if="activeTab === 'SlideIn'"></SlideIn>
			<WaterfallOfLocal v-if="activeTab === 'WaterfallOfLocal'"></WaterfallOfLocal>
			<WaterfallOfNetwork v-if="activeTab === 'WaterfallOfNetwork'"></WaterfallOfNetwork>
			<Empty v-if="activeTab === 'Empty'"></Empty>
		</div>
	</div>
</template>

<style scoped lang="scss">
.PageContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 100%;

	.tabs {
		width: 420px;
		position: fixed;
		top: 10px;
		left: 10px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;

		button {
			min-width: 90px;
		}
	}

	.PageContent {
		height: 100vh;
	}
}
</style>
