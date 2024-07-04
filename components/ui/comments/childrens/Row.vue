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
  showCreateCommentInput: {
    type: Object as PropType<{ [key: number]: boolean }>,
    required: true,
  },
});

const childrens = ref<CommentFormatedWithCommentLikes[]>([]);
const isLoading = ref(false);
const page = ref(1);
const limit = ref(3);
const totalCount = ref(0);

const loadResponse = async (commentId: number, reset: boolean = false) => {
  if (reset) {
    childrens.value = [];
    page.value = 1;
  }

  isLoading.value = true;
  try {
    const response = await commentServices.getChildrenByCommentIdWithPagination(commentId, page.value, limit.value);
    childrens.value.push(...response.comments);
    totalCount.value = response.totalCount;
    page.value++;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div v-if="showCreateCommentInput[comment.id]" class="mb-3.5">
    <UiCommentsCreate
      :postId="post.id"
      :userId="userId"
      type="COMMENT"
      buttonText="Répondre"
      :parentId="comment.id"
    />
  </div>

  <!-- <button
    v-if="comment._count.children > 0"
    type="button"
    class="flex items-center justify-center w-full bg-gray-50 dark:bg-neutral-700 py-1.5 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-600 transition ease-in-out"
  >
    <small>Voir les réponses - NON FONCTIONNEL</small>
  </button> -->

  <button
    @click="loadResponse(comment.id)"
    v-if="comment._count.children > 0 && childrens.length === 0"
    type="button"
    class="flex items-center justify-center w-full hover:underline text-primary"
  >
    <small>Voir les réponses</small>
  </button>

  <div v-if="isLoading">LOADING ...</div>
  <UiCommentsRow
    v-else
    v-for="(childComment, index) in childrens"
    :key="index"
    :post="post"
    :comment="childComment"
    :userId="userId"
    type="modal"
  />

  <button
    @click="loadResponse(comment.id)"
    v-if="childrens.length > 0 && childrens.length < totalCount"
    type="button"
    class="flex items-center justify-center w-full hover:underline text-primary"
  >
    <small>Charger plus de réponses</small>
  </button>
</template>
