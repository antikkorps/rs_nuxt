<script setup lang="ts">
import { postServices } from "~/services";
import type { ExtendedPost } from "~/types/posts";

const posts = ref<ExtendedPost[]>([]);
const page = ref(1);
const totalPages = ref(1);
const limit = 3;
const loading = ref(false);

const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await postServices.getAllPosts(page.value, limit);
    console.log("response", response);
    posts.value.push(...response.posts);
    totalPages.value = response.totalPages;  // Supposez que l'API renvoie le nombre total de pages
    page.value++;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
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
  <div class="flex flex-col justify-center mx-auto w-full gap-3">
    <Post
    v-if="!loading"
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
      :comments="post.comments"
    />

    <div v-if="loading" class="loading">Loading...</div>
  </div>
</template>
