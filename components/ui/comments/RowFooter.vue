<script setup lang="ts">
import type { ExtendedPost } from "~/types/posts"
import type { CommentFormatedWithCommentLikes } from "~/types/types"
import { likeServices } from "@/services"

const props = defineProps({
  comment: {
    type: Object as PropType<CommentFormatedWithCommentLikes>,
    required: true,
  },
  userId: {
    type: String as PropType<String | null>,
    default: null,
    required: false,
  },
  post: {
    type: Object as PropType<ExtendedPost>,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "index",
  },
})

// here logic for the footer of the row
const isLiked =
  props.comment.commentLikes && props.comment.commentLikes.length > 0 ? true : false

const showCreateCommentInput = ref<{ [key: number]: boolean }>({})

function setCommentInputVisibility(id: number, isVisible: boolean) {
  if (showCreateCommentInput.value[id]) {
    showCreateCommentInput.value[id] = false
  } else {
    showCreateCommentInput.value[id] = true
  }
}

const onClickButton = async ({
  comment,
}: {
  comment?: CommentFormatedWithCommentLikes | null
}) => {
  if (props.type === "index") {
    await navigateTo("/posts/" + props.post.id)
  }

  if (props.type === "show" && comment) {
  }
}

async function fetchUpdatedLikes() {
  loadingCount.value = true
  fetchPostLikes()
  loadingCount.value = false
}

const likeCount = ref<number | null>(null)
const loadingCount = ref(false)
const fetchPostLikes = async () => {
  likeCount.value = await likeServices.getItemCountLikes(props.comment.id, "COMMENT")
}
onMounted(() => {
  likeCount.value = props.comment._count.commentLikes ?? 0
})
</script>

<template>
  <div class="">
    <div class="flex items-center">
      <div class="inline-flex items-center py-2 mr-1">
        <UiLikeBtn
          likeType="COMMENT"
          :likedItemId="comment.id"
          :userId="userId"
          :isLiked="isLiked"
          @update-likes="fetchUpdatedLikes"
        />

        <span class="text-base font-bold" v-if="!loadingCount">{{ likeCount }}</span>
        <div
          class="dark:bg-neutral-600 bg-gray-200 animate-pulse w-3 h-5 rounded"
          v-else
        />
      </div>
      <UiEmojiPicker />
      <div class="flex items-center">
        <button type="button" @click="onClickButton({ comment: comment })">
          <UiCommentBtn :count="comment._count.children ?? 0" />
        </button>

        <button
          type="button"
          class="mx-2 py-2 px-4 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg"
          label="Open"
          @click="setCommentInputVisibility(comment.id, true)"
        >
          Répondre {{ comment.id }}
        </button>
      </div>
    </div>

    <UiCommentsChildrensRow
      :comment="comment"
      :userId="userId"
      :post="post"
      :type="type"
      :showCreateCommentInput="showCreateCommentInput"
    />
  </div>
</template>
