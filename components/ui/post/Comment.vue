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
    required: false,
  },
  type: {
    type: String,
    required: false,
    default: "index",
  },
});

const { session } = useAuth();
const postStore = usePostStore();

const user = session.value?.user;

const commentsFromStore = computed(() =>
  postStore.getCommentsForPost(props.post.id)
);
onMounted(() => {
  const postForStore = props.post;

  if (props.post && props.type === "index") {
    postStore.addPost(postForStore);
  }
});

const moreCommentBtn = props.type === "index" ? `/posts/${props.post.id}` : "";
</script>
<template>
  <UiCommentsCreate :postId="post.id" :userId="user?.id" :type="type" />
  <!-- Comments content -->
  <div class="pt-6">
    <UiCommentsRow
      v-for="(comment, index) in commentsFromStore"
      :key="comment.id"
      :comment="comment"
      :userId="user?.id"
      :post="post"
      :type="type"
      v-if="type === 'index'"
    />
    
    <UiCommentsRow
      v-for="(comment, index) in comments"
      :key="index"
      :post="post"
      :comment="comment"
      :userId="user?.id"
      :type="type"
      v-else
    />
    <!-- More comments -->
    <div class="w-full">
      <nuxt-link
        class="py-3 px-4 w-full block bg-neutral-100 dark:bg-neutral-700 text-center rounded-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition ease-in-out delay-75"
        :to="moreCommentBtn"
      >
        Plus de commentaires
      </nuxt-link>
    </div>
    <!-- End More comments -->
  </div>
  <!-- End Comments content -->
</template>
