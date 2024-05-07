<script setup lang="ts">
const isOpen = ref(false)

const toggleMoreMenu = () => {
  isOpen.value = !isOpen.value
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
    <!-- SlideoverMenu -->
    <USlideover v-model="isOpen">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-full" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
