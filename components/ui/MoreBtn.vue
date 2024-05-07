<script setup lang="ts">
const isOpen = ref(false)

const toggleMoreMenu = () => {
  if (isOpen.value) {
    isOpen.value = false
    document.body.classList.remove("overflow-hidden")
    return
  } else {
    isOpen.value = true
    document.body.classList.add("overflow-hidden")
  }
}
</script>
<template>
  <div class="flex items-center space-x-2">
    <button
      class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-600"
      @click="toggleMoreMenu"
    >
      <Icon name="ic:baseline-more-vert" class="w-6 h-6 dark:text-white text-gray-800" />
    </button>
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      @click="isOpen = false"
    ></div>
    <transition name="slide">
      <div
        v-if="isOpen"
        v-show="isOpen"
        class="fixed left-0 right-0 bottom-0 mt-2 w-full bg-white dark:bg-neutral-700 rounded-lg shadow-lg"
      >
        <div class="flex flex-col justify-center p-2 mx-auto w-1/2">
          <div class="w-full flex flex-row justify-end items-center mt-2">
            <UiIcon
              name="ion:md-close-circle-outline"
              @click="toggleMoreMenu"
              size="w-8 h-8"
            />
          </div>
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
      </div>
    </transition>
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
