<script setup lang="ts">
import { postServices } from "~/services"
import type { ExtendedPost } from "~/types/posts";
const posts = ref([]) as unknown as Ref<ExtendedPost[]>

onMounted(async () => {
  const response = await postServices.getAllPosts()
  posts.value = response.posts

  console.log("here are the posts", posts)

})
</script>
<template>
  <div class="flex flex-col justify-center mx-auto w-full">
    <Post v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
</template>
