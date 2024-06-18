<script setup lang="ts">
import type { ExtendedPost } from "~/types/posts";
import type { CommentFormatedWithCommentLikes } from "~/types/types";

const props = defineProps({
  post: {
    type: Object as PropType<ExtendedPost>,
    required: true,
  },

  comments: {
    type: Array as PropType<CommentFormatedWithCommentLikes[]>,
    required: false,}
});




</script>

<template>
  <UiPostCard>
    <template #content>
      <UiPostContent :post="post" />
    </template>

    <template #comment>
      <UiPostComment :post="post"  :comments="comments"/>
    </template>
  </UiPostCard>
</template>
