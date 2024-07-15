<template>
  <img
    v-if="post.post.mediaPosts.length > 0"
    :src="post.post.mediaPosts[0].url"
    alt="Post image"
    class="w-full h-auto rounded-lg transform transition duration-500 group-hover:scale-110 cursor-pointer"
  />

</template>

<script setup lang="ts">
import type { BookmarkedAndLikedPost, UserGalleryPost } from "~/types/posts";

const props = defineProps({
  post: {
    type: Object as PropType<BookmarkedAndLikedPost | UserGalleryPost>,
    required: true,
  }
});
</script>
