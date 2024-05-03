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
    <UAvatar
      :size="props.size"
      src="https://avatars.githubusercontent.com/u/739984?v=4"
      :alt="props.alt"
    />
  </div>
</template>
