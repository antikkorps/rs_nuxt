<script setup lang="ts">
import type { CommentFormatedWithCommentLikes } from '~/types/types';

const props = defineProps({
  comment: {
    type: Object as PropType<CommentFormatedWithCommentLikes>,
    required: true,
  },
});


import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

function formatTimeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: fr });
}
</script>

<template>
  <div class="flex items-start gap-2">
    <a class="inline-block text-base font-bold mr-2" href="#">
      <div class="flex items-center">
        <span v-if="comment.user.firstname">{{ comment.user.firstname }} </span>
        &nbsp;
        <span v-if="comment.user.lastname">{{ comment.user.lastname }} </span>
        <span v-if="!comment.user.firstname && !comment.user.lastname"
          >{{ comment.user.pseudo }}
        </span>
      </div>
      <span
        class="text-neutral-500 dark:text-neutral-300 font-normal text-sm"
        v-if="comment.user.firstname || comment.user.lastname"
        >{{ comment.user.pseudo }}
      </span>
    </a>
    <span class="text-neutral-500 dark:text-neutral-300">{{ formatTimeAgo(comment.createdAt) }}</span>
  </div>
</template>
