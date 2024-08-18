<template>
  <div class="flex gap-1 text-neutral-500 dark:text-neutral-200">
    <Icon name="iconamoon:comment-bold" class="w-6 h-6" />
    <div v-if="count !== 0" class="text-lg font-bold flex items-center">{{ count }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number,
    default: 0,
    required: true,
  },
})
</script>
