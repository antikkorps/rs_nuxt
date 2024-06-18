<script setup lang="ts">
interface Post {
  id: number
  imageUrl: string
}

const posts = ref<Post[]>([
  { id: 1, imageUrl: "https://picsum.photos/200" },
  { id: 2, imageUrl: "https://picsum.photos/200" },
  { id: 3, imageUrl: "https://picsum.photos/200" },
  { id: 4, imageUrl: "https://picsum.photos/200" },
  { id: 5, imageUrl: "https://picsum.photos/200" },
  { id: 6, imageUrl: "https://picsum.photos/200" },
  { id: 7, imageUrl: "https://picsum.photos/200" },
  { id: 8, imageUrl: "https://picsum.photos/200" },
  { id: 9, imageUrl: "https://picsum.photos/200" },
  { id: 10, imageUrl: "https://picsum.photos/200" },
])
</script>

<template>
  <div class="">
    <div class="grid grid-cols-3 gap-4 mt-10">
      <div v-for="post in posts" :key="post.id" class="max-w-sm sm:max-w-lg group">
        <img
          :src="post.imageUrl"
          alt="Post image"
          class="w-full h-auto rounded-lg transform transition duration-500 group-hover:scale-110 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
