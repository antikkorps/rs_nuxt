<script setup lang="ts">
import { postServices } from "@/services";
import type { BookmarkedAndLikedPost } from "~/types/posts";
import Card from "./Card.vue";

interface Post {
  id: number;
  imageUrl: string;
}

const posts = ref<BookmarkedAndLikedPost[]>([]);
const page = ref(1);
const totalPages = ref(1);
const limit = 3;
const loading = ref(false);

const fetchPosts = async () => {
  loading.value = true;
  try {
    const fetchedPosts = await postServices.getMyPosts(page.value, limit);
    // console.log(fetchedPosts.posts)
    posts.value.push(...fetchedPosts.posts);
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
    fetchPosts();
  }
};

onMounted(async () => {
  await fetchPosts();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div v-if="!loading" class="grid grid-cols-3 gap-4 mt-10">
    <div
      v-for="post in posts"
      :key="post.id"
      class="max-w-sm sm:max-w-lg group"
    >
      <Card :post="{post: post}" />
    </div>
  </div>

  <div v-if="loading" class="loading">Loading...</div>
</template>
