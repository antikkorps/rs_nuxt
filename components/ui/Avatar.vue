<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: "md",
  },
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "Avatar",
  },
})
</script>

<template>
  <div class="my-4">
    <UAvatar :size="props.size" :src="props.src" :alt="props.alt" />
  </div>
</template>
