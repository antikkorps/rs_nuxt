<script setup lang="ts">
import { ref } from 'vue';
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
    const response = await commentServices.getChildrenByCommentIdWithPagination(
      commentId,
      page.value,
      limit.value
    );
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

  <button
    @click="loadResponse(comment.id)"
    v-if="comment._count.children > 0 && childrens.length === 0"
    type="button"
    class="flex items-center justify-center w-full hover:underline text-primary"
  >
    <small>Voir les réponses</small>
  </button>

  <div class="max-h-[500px] overflow-y-auto">
    <div v-if="isLoading">LOADING ...</div>
    <div
      v-else
      v-for="(childComment, index) in childrens"
      :key="index"
      class="border-l pl-2 dark:border-gray-600 border-gray-200 mb-1.5"
    >
      <UiCommentsRow :post="post" :comment="childComment" :userId="userId" />
    </div>

    <button
      @click="loadResponse(comment.id)"
      v-if="childrens.length > 0 && childrens.length < totalCount"
      type="button"
      class="flex items-center justify-center w-full hover:underline text-primary"
    >
      <small>Charger plus de réponses</small>
    </button>
  </div>
</template>

<style>
.comment-container {
  max-height: 500px;
  overflow-y: auto;
}
</style>
