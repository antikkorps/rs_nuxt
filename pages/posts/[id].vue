<script setup lang="ts">
import type { ExtendedPost } from "~/types/posts";
import { commentServices, postServices } from "~/services";
import type { CommentFormatedWithCommentLikes } from "~/types/types";
const route = useRoute();
const postStore = usePostStore();

const post = ref() as unknown as Ref<ExtendedPost | null>;
const comments = ref([]) as Ref<CommentFormatedWithCommentLikes[] | undefined>;

const refreshComments = async () => {
  const postId = parseInt(route.params.id[0])
  const commentResponse = await commentServices.getCommentsByPostId(postId)
  comments.value = commentResponse
}
onMounted(async () => {
  const postId = parseInt(route.params.id[0])
  const response = await postServices.getPostById(postId)
  post.value = response

  await refreshComments()
})

watch(
  () => postStore.hasNewComment,
  async (newVal) => {
    if (newVal) {
      await refreshComments()
      postStore.resetNewCommentFlag()
    }
  }
)
</script>

<template>
  <div class="flex flex-col gap-5 items-center justify-center py-6">
    <div>
      <UButton to="/" variant="link" class="flex items-center gap-3">
        <span><Icon name="icon-park-outline:arrow-left" /></span>
        <span>Retour aux posts </span></UButton
      >
    </div>
    <Post v-if="post" :post="post" :comments="comments" type="show" />
  </div>
</template>
