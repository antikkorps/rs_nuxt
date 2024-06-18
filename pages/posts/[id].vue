<script setup lang="ts">
import type { ExtendedPost } from "~/types/posts";
import { commentServices, postServices } from "~/services";
import type { CommentFormatedWithCommentLikes } from "~/types/types";
const route = useRoute();

console.log(route.params.id);

const post = ref() as unknown as Ref<ExtendedPost | null>;
const comments = ref([]) as Ref<CommentFormatedWithCommentLikes[] | undefined>;
onMounted(async () => {
  const response = await postServices.getPostById(parseInt(route.params.id[0]));
  post.value = response;

  const commentResponse = await commentServices.getCommentsByPostId(parseInt(route.params.id[0]));
  console.log(commentResponse);
  comments.value = commentResponse;
});
</script>

<template>
  <div class="flex flex-col gap-5 items-center justify-center py-6">
    <div>
      <UButton to="/" variant="link" class="flex items-center gap-3">
        <span><Icon name="icon-park-outline:arrow-left" /></span>
        <span>Retour aux posts </span></UButton
      >
    </div>
    <Post v-if="post" :post="post" :comments="comments" />
  </div>
</template>
