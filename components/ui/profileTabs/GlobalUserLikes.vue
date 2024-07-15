<template>
  <div v-if="!loading" class="grid grid-cols-3 gap-4 mt-10">
    <div
      v-for="post in posts"
      :key="post.id"
      class="max-w-sm sm:max-w-lg group"
    >
      <Card :post="post"/>
    </div>
  </div>

  <div v-if="loading" class="loading">Loading...</div>
</template>

<script setup lang="ts">
import { likeServices } from "@/services";
import type { BookmarkedAndLikedPost } from "~/types/posts";

import Card from "./Card.vue";
const posts = ref<BookmarkedAndLikedPost[]>([]);
const page = ref(1);
const totalPages = ref(1);
const limit = 3;
const loading = ref(false);

const fetchLikedPost = async () => {
    loading.value = true;
    try {
        const fetchedPosts = await likeServices.getLikesByAuthUser(page.value, limit);
        posts.value.push(...fetchedPosts.likedPosts);
        totalPages.value = fetchedPosts.totalPages;
        page.value++;
    } catch (error) {
        // console.error("Failed to fetch liked posts:", error);
    } finally {
        loading.value = false;
    }
};

const handleScroll = () => {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 10; // Ajustez la marge pour éviter les déclenchements prématurés
  if (bottomOfWindow && !loading.value && page.value <= totalPages.value) {
    fetchLikedPost();
  }
};

onMounted(async () => {
  await fetchLikedPost();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
