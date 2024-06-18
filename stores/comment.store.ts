import { defineStore } from 'pinia'
import type { ExtendedPost } from '~/types/posts'
import type { CommentFormatedWithCommentLikes } from '~/types/types'
export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [] as ExtendedPost[],
  }),
  actions: {
    addPost(post: ExtendedPost) {
      this.posts.push(post)
    },
    addCommentToPost(postId: number, comment: CommentFormatedWithCommentLikes) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        if (!post.comments) {
          post.comments = []
        }
        post.comments.push(comment)
      }
    },
    getCommentsForPost(postId: number) {
      const post = this.posts.find(p => p.id === postId) as ExtendedPost
      if (post && post.comments) {
        return post.comments.slice().sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime())
      }
      return []
    }
  }
})
