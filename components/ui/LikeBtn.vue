<script setup lang="ts">
const liked = ref(false)

const toggleLike = () => {
  liked.value = !liked.value
}
</script>
<template>
  <div class="my-2">
    <Transition name="fade" mode="out-in">
      <Icon
        v-if="liked"
        name="material-symbols:favorite-rounded"
        class="w-8 h-8 text-red-500"
        @click="toggleLike"
      />
      <Icon
        v-else
        name="material-symbols:favorite-outline-rounded"
        class="w-8 h-8 dark:text-white text-gray-800"
        @click="toggleLike"
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
