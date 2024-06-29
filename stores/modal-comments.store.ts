import { defineStore } from 'pinia'
import type { CommentFormatedWithCommentLikes } from '~/types/types'

export const useModalCommentsStore = defineStore('modalComment', {
  state: () => ({
    selectedComment: null as CommentFormatedWithCommentLikes | null,
  }),
  actions: {
    setSelectedComment(comment: CommentFormatedWithCommentLikes) {
      this.selectedComment = comment
    },
    resetSelectedComment() {
      this.selectedComment = null
    },
  }
})
