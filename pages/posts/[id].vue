<script setup lang="ts">
import type { ExtendedPost } from "~/types/posts"
import { commentServices, postServices } from "~/services"
import type { CommentFormatedWithCommentLikes } from "~/types/types"
const route = useRoute()
const postStore = usePostStore()

const post = ref() as unknown as Ref<ExtendedPost | null>
const comments = ref([]) as Ref<CommentFormatedWithCommentLikes[] | undefined>

const getPostId = (): number => {
  const id = route.params.id
  return Array.isArray(id) ? parseInt(id[0]) : parseInt(id)
}

const refreshPost = async () => {
  const postId = getPostId()
  const response = await postServices.getPostById(postId)
  post.value = response

  const commentResponse = await commentServices.getCommentsByPostId(postId)
  comments.value = commentResponse
}

// const refreshComments = async () => {
//   const postId = parseInt(route.params.id)
//   const commentResponse = await commentServices.getCommentsByPostId(postId)
//   comments.value = commentResponse
// }
onMounted(async () => {
  const postId = Array.isArray(route.params.id) 
    ? parseInt(route.params.id[0]) 
    : parseInt(route.params.id)
  const response = await postServices.getPostById(postId)
  post.value = response
  await refreshPost()
  // await refreshComments()
})

watch(
  () => postStore.hasNewComment,
  async (newVal) => {
    if (newVal) {
      await refreshPost()
      // await refreshComments()
      postStore.resetNewCommentFlag()
    }
  }
)
</script>

<template>
  <div class="flex flex-col gap-5 items-center justify-center py-6">
    <div class="w-full">
      <UButton to="/" variant="link" class="flex items-center justify-center gap-3">
        <Icon
          name="material-symbols:cancel-outline-rounded"
          class="w-10 h-10 dark:text-neutral-300 text-neutral-900"
        />
      </UButton>
    </div>
    <Post v-if="post" :post="post" :comments="comments" type="show" />
  </div>
</template>
