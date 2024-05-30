<script setup lang="ts">
const share = () => {
  console.log("Share button clicked still have to implement the share functionality")
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <button
      class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-800"
      @click="share"
    >
      <Icon
        name="ic:outline-rocket-launch"
        class="w-6 h-6 dark:text-white text-gray-800"
      />
    </button>
  </div>
</template>
