<script setup lang="ts">
const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center">
    <div class="inline-flex items-center py-2 mr-3">
      <UiLikeBtn />

      <span class="text-base font-bold">2</span>
    </div>
    <UiEmojiPicker />
    <div class="flex items-center">
      <button
        class="py-2 px-4 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg"
      >
        Répondre
      </button>
      <span class="text-xs flex items-center gap-1">
        <Icon name="uim:comment" class="w-6 h-6" />
        {{ comment.childCommentCount }}</span
      >
    </div>
  </div>
</template>
