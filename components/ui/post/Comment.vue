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
  }
});

const { session } = useAuth();
const postStore = usePostStore();

const user = session.value?.user;


const commentsFromStore = computed(() =>
  postStore.getCommentsForPost(props.post.id)
);
onMounted(() => {
  if (props.post) {
    const postForStore = props.post;
    postStore.addPost(postForStore);
  }
});
</script>
<template>
  <UiCommentsCreate :postId="post.id" :userId="user?.id" />
  <!-- Comments content -->
  <div class="pt-6">
    <UiCommentsRow
      v-for="(comment, index) in commentsFromStore"
      :key="comment.id"
      :comment="comment"
      :userId="user?.id"
    />
    ------ SEPARATION ENTRE LES DEUX TYPES DE COMMENTAIRES EN HAUT LE STORE EN
    BAS LES TRADI ------
    <UiCommentsRow
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
      :userId="user?.id"
    />
    <!-- More comments -->
    <div class="w-full">
      <a
        href="#"
        class="py-3 px-4 w-full block bg-neutral-100 dark:bg-neutral-700 text-center rounded-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition ease-in-out delay-75"
        >Plus de commentaires</a
      >
    </div>
    <!-- End More comments -->
  </div>
  <!-- End Comments content -->
</template>
