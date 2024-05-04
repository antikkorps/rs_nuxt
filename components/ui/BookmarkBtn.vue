<script setup lang="ts">
const liked = ref(false)

const toggleBookmark = () => {
  liked.value = !liked.value
}
</script>
<template>
  <div class="my-2">
    <Transition name="fade" mode="out-in">
      <Icon
        v-if="liked"
        name="ic:baseline-bookmark"
        class="w-6 h-6 dark:text-white text-gray-800"
        @click="toggleBookmark"
      />
      <Icon
        v-else
        name="ic:baseline-bookmark-border"
        class="w-6 h-6 dark:text-white text-gray-800"
        @click="toggleBookmark"
      />
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
