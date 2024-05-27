<script setup lang="ts">
import { postServices } from "~/services"
const posts = ref([])

onMounted(async () => {
  const response = await postServices.getAllPosts()
  posts.value = response.posts
})
</script>
<template>
  <div class="flex flex-col justify-center mx-auto w-full">
    <Post v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
</template>
