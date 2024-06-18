<template>
  <span class="text-lg flex items-center gap-1">
    <Icon name="uim:comment" class="w-6 h-6" />
    {{ count }}</span
  >
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
