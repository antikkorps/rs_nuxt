<script setup lang="ts">
import { commentServices } from "~/services";
import type { ExtendedPost } from "~/types/posts";
import type { CommentFormatedWithCommentLikes } from "~/types/types";

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
});


const isLiked =
  props.comment.commentLikes && props.comment.commentLikes.length > 0
    ? true
    : false;


const comments = ref([]);

const fetchComments = async (commentId: number) => {
  isLoading.value = true;
  const response = await commentServices.getChildrenByCommentId(commentId);
  comments.value = response;
  console.log(response);
  isLoading.value = false;
};




// All the modal stuff, to probably put in another component
const isOpen = ref(false);
const isLoading = ref(false);
watch(isOpen, async (newValue) => {
  if (newValue) {
    await fetchComments(props.comment.id);
  }
});

const openModal = async () => {
  isOpen.value = true;
};
const postStore = usePostStore()
watch(
  () => postStore.hasNewComment,
  async (newVal) => {
    if (newVal) {
      await fetchComments(props.comment.id)
      // await refreshComments()
      postStore.resetNewCommentFlag()
    }
  }
)
</script>

<template>
  <div class="flex items-center">
    <div class="inline-flex items-center py-2 mr-1">
      <UiLikeBtn
        likeType="COMMENT"
        :likedItemId="comment.id"
        :userId="userId"
        :isLiked="isLiked"
      />

      <span class="text-base font-bold">2</span>
    </div>
    <UiEmojiPicker />
    <div class="flex items-center">
      <UiCommentBtn :count="comment._count.children ?? 0" />
      <button
        class="mx-2 py-2 px-4 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg"
        label="Open"
        @click="openModal"
      >
        Répondre
      </button>
    </div>

    <!-- ALL the modal stuff, maybe to put in another component -->
    <UModal v-model="isOpen">
      <div class="p-4">
        <div class="max-h-[60vh] overflow-y-auto mb-5">
          <UiLoader v-if="isLoading" />
          <div v-else>
            
            <UiCommentsRow
              v-for="(comment, index) in comments"
              :key="index"
              :post="post"
              :comment="comment"
              :userId="userId"
            />
          
          </div>
        </div>
        <UiCommentsCreate
          :postId="post.id"
          :userId="userId"
          type="COMMENT"
          buttonText="Répondre"
          :parentId="comment.id"
        />
      </div>
    </UModal>
  </div>
</template>
