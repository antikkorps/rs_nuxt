<script setup lang="ts">
const toggleMoreMenu = () => {
  console.log("More button clicked still have to implement the more functionality")
}
</script>
<template>
  <div class="flex items-center space-x-2">
    <button
      class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800"
      @click="toggleMoreMenu"
    >
      <Icon name="ic:baseline-more-vert" class="w-6 h-6 dark:text-white text-gray-800" />
    </button>
  </div>
</template>
