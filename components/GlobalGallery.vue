<script setup lang="ts">
interface Post {
  id: number
  imageUrl: string
}

const posts = ref<Post[]>([
  { id: 1, imageUrl: "https://via.placeholder.com/150" },
  { id: 2, imageUrl: "https://via.placeholder.com/150" },
  { id: 3, imageUrl: "https://via.placeholder.com/150" },
  { id: 4, imageUrl: "https://via.placeholder.com/150" },
  { id: 5, imageUrl: "https://via.placeholder.com/150" },
  { id: 6, imageUrl: "https://via.placeholder.com/150" },
  { id: 7, imageUrl: "https://via.placeholder.com/150" },
  { id: 8, imageUrl: "https://via.placeholder.com/150" },
  { id: 9, imageUrl: "https://via.placeholder.com/150" },
  { id: 10, imageUrl: "https://via.placeholder.com/150" },
])
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="post in posts" :key="post.id" class="max-w-sm">
      <img :src="post.imageUrl" alt="Post image" class="w-full h-auto rounded-lg" />
    </div>
  </div>
</template>
