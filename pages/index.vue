<script setup lang="ts">
import { getAllPosts } from "~/services"
const posts = ref([])

onMounted(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await response.json()
  posts.value = data

  console.log("les posts", posts.value)
})
</script>
<template>
  <div class="flex flex-col justify-center mx-auto w-full">
    <Post v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
</template>
