<script setup lang="ts">
const isOpen = ref(false)

watch(isOpen, (newValue, oldValue) => {
  if (newValue) {
    document.body.classList.add("overflow-hidden")
  } else {
    document.body.classList.remove("overflow-hidden")
  }
})

const toggleMoreMenu = () => {
  isOpen.value = !isOpen.value
}

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden")
})
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
        v-show="isOpen"
        class="fixed right-0 sm:right-36 bottom-0 mt-2 w-full sm:w-4/6 bg-white dark:bg-neutral-700 rounded-lg shadow-lg h- z-50"
      >
        <div class="flex flex-col justify-center p-2">
          <div class="w-full flex flex-row justify-end items-center mt-2">
            <UiIcon name="ion:md-close-circle-outline" @click="toggleMoreMenu" />
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
