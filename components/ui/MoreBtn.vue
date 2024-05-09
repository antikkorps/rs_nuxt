<script setup lang="ts">
const isOpen = ref(false)
</script>
<template>
  <div class="flex items-center space-x-2">
    <button
      class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-600"
      @click="isOpen = true"
    >
      <Icon name="ic:baseline-more-vert" class="w-6 h-6 dark:text-white text-gray-800" />
    </button>
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      @click="isOpen = false"
    ></div>

    <UModal v-model="isOpen">
      <UCard
        :ui="{ ring: '', divide: 'divide-y divide-neutral-100 dark:divide-neutral-700' }"
        :overlay="{ background: 'bg-neutral-200/75 dark:bg-neutral-800/75' }"
        class="dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-300 text-neutral-800"
      >
        <template #header>
          <div class="w-full flex flex-row justify-end items-center">
            <UiIcon
              name="ion:md-close-circle-outline"
              @click="isOpen = false"
              size="w-8 h-8"
            />
          </div>
        </template>

        <div class="flex flex-col justify-center p-2 mx-auto w-full">
          <button
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-neutral-600 rounded-lg"
          >
            <Icon name="ic:outline-share" class="w-6 h-6 dark:text-white text-gray-800" />
            <span>Share</span>
          </button>
          <button
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-neutral-600 rounded-lg"
          >
            <Icon
              name="ic:outline-bookmark"
              class="w-6 h-6 dark:text-white text-gray-800"
            />
            <span>Bookmark</span>
          </button>
          <button
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-neutral-600 rounded-lg"
          >
            <Icon
              name="ic:outline-report"
              class="w-6 h-6 dark:text-white text-gray-800"
            />
            <span>Report</span>
          </button>
        </div>
        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
.slide-enter-to,
.slide-leave {
  transform: translateY(0);
}
</style>
