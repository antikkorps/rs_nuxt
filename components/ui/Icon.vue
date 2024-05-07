<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "w-6 h-6",
  },
})

const sizeClass = computed(() => props.size.split(" "))
</script>
<template>
  <Icon
    :name="props.name"
    :class="[sizeClass, 'mr-3 dark:text-white text-neutral-700']"
  />
</template>
