<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <Icon :name="props.name" class="w-6 h-6 mr-3 dark:text-white text-neutral-700" />
</template>
