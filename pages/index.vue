<script setup lang="ts">
import { postServices } from "~/services";
import type { ExtendedPost } from "~/types/posts";

const posts = ref([]) as unknown as Ref<ExtendedPost[]>;

onMounted(async () => {
  const response = await postServices.getAllPosts();
  posts.value = response.posts;

});
</script>
<template>
  <div class="flex flex-col justify-center mx-auto w-full gap-3">
    <Post v-for="(post, index) in posts" :key="index" :post="post" :comments="post.comments" />
  </div>
</template>
