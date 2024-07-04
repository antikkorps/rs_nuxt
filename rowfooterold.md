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
  type: {
    type: String,
    required: false,
    default: "index",
  },
});

// here logic for the footer of the row
const isLiked =
  props.comment.commentLikes && props.comment.commentLikes.length > 0
    ? true
    : false;

// the "répondre" button and differents behaviors if it's in the index or in the modal.
// he redirect if it's in the index page, or open the modal if we're in the show.

// const modalComment = useModalCommentsStore();
// const modalSelectedComment = computed(() => modalComment.selectedComment);

const onClickButton = async ({
  comment,
}: {
  comment?: CommentFormatedWithCommentLikes | null;
}) => {
  if (props.type === "index") {
    await navigateTo("/posts/" + props.post.id);
  }

  if (props.type === "show" && comment) {
    // modalComment.setSelectedComment(comment)
    openModal();
    await handleCommentSelection(comment.id);
  }

  if (props.type === "modal" && comment) {
    // modalComment.setSelectedComment(comment)
    await handleCommentSelection(comment.id);
  }
};
const handleCommentSelection = async (commentId: number) => {
  isLoadingSelectedComment.value = true;
  isLoading.value = true;
  try {
    // Fetch the selected comment
    const selectedComment = await commentServices.getCommentById(commentId);
    // modalComment.setSelectedComment(selectedComment);
    selectedComment.value = selectedComment;
    isLoadingSelectedComment.value = false;
    // Fetch the children comments for the selected comment
    const children = await commentServices.getChildrenByCommentId(commentId);
    comments.value = children;
    isLoading.value = false;
  } catch (error) {
    isLoadingSelectedComment.value = false;
    isLoading.value = false;
    console.error("An error occurred:", error);
  }
};

// fetch the selectedComment
const fetchSelectedComment = async (commentId: number) => {
  isLoadingSelectedComment.value = true;
  const response = await commentServices.getCommentById(commentId);
  isLoadingSelectedComment.value = false;
};
// fetch the comments of the selected comment.
const fetchChildrenComments = async (commentId: number) => {
  isLoading.value = true;
  const response = await commentServices.getChildrenByCommentId(commentId);
  comments.value = response;
  isLoading.value = false;
};

// here logic for the modal
const postStore = usePostStore();
const comments = ref([]);
const selectedComment = ref<CommentFormatedWithCommentLikes | null>(null);
const isOpen = ref(false);
const isLoading = ref(false);
const isLoadingSelectedComment = ref(true);

// what's happen when we openModal
const openModal = async () => {
  if (props.type !== "modal") {
    isOpen.value = true;
    // await handleCommentSelection(props.comment.id);
  }
};

// watch(modalSelectedComment, async (newComment) => {
//   if (newComment) {
//     // await handleCommentSelection(newComment.id);
//   }
// });

// when postStore hasNewComment (boolean) value change, we fetch again the comments of the selected comment.
// then we reset the value of the boolean.

watch(
  () => postStore.hasNewComment,
  async (newVal) => {
    if (newVal) {
      await fetchChildrenComments(
        selectedComment.value?.id || props.comment.id
      );
      // await refreshComments()
      postStore.resetNewCommentFlag();
    }
  }
);

const backButton = async () => {
  if (selectedComment.value?.parentId) {
    await handleCommentSelection(
      selectedComment.value?.parentId
    );
    // modalComment.setSelectedComment(selectedComment.value?.parent);
  } else {
    isOpen.value = false;
    selectedComment.value = null;
    // modalComment.resetSelectedComment();
  }
};
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
      <button type="button" @click="onClickButton({ comment: comment })">
        <UiCommentBtn :count="comment._count.children ?? 0" />
      </button>

      <button
        type="button"
        class="mx-2 py-2 px-4 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg"
        label="Open"
        @click="onClickButton({ comment: comment })"
      >
        Répondre {{ comment.id }}
      </button>
    </div>

    <!-- ALL the modal stuff, maybe to put in another component -->
    <UModal v-model="isOpen">
      <div>
        <button @click="isOpen = false" class="w-full flex justify-end p-4">
          <Icon
            name="material-symbols:cancel-outline-rounded"
            class="w-10 h-10 hover:dark:text-neutral-100 dark:text-neutral-300 hover:text-neutral-500 text-neutral-600"
          />
        </button>
        <div class="max-h-[60vh] overflow-y-auto mb-5">
          <div class="relative w-full">
            <div v-if="isLoadingSelectedComment">Loading selected</div>
            <div
              v-else
              class="sticky inset-x-0 top-0 h-fit backdrop-blur-xl bg-white/10"
            >
              <div class="p-4">
                <div>
                  <UButton type="button" @click="backButton" variant="link"
                    >Retour</UButton
                  >
                </div>
                <UiCommentsRow
                  :post="post"
                  :comment="selectedComment || comment"
                  type="modal"
                  :userId="userId"
                />
                <div class="h-px bg-white w-full" />
              </div>
            </div>

            <div v-if="isLoading">LOADING ...</div>
            <div v-else class="p-4">
              <UiCommentsRow
                v-for="(comment, index) in comments"
                :key="index"
                :post="post"
                :comment="comment"
                :userId="userId"
                type="modal"
              />

              <UiCommentsCreate
                :postId="post.id"
                :userId="userId"
                type="COMMENT"
                buttonText="Répondre"
                :parentId="selectedComment?.id || comment.id"
              />
            </div>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>
