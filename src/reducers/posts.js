import {
  ADD_POSTS,
  PLUS_LIKE,
  PLUS_RETWEET,
  OPEN_COMMENT_BOX,
  ADD_COMMENT,
  PLUS_COMMENT_LIKE,
  PLUS_COMMENT_RETWEET
} from "../actions";

const initialState = {};
const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          text: action.text,
          isComment: false,
          like: 0,
          retweet: 0,
          comments: {}
        }
      };
    case PLUS_LIKE:
      const likedPost = state[action.id];
      const updatedLike = action.like === 0 ? 1 : 0;
      return {
        ...state,
        [action.id]: {
          ...likedPost,
          like: updatedLike
        }
      };
    case PLUS_RETWEET:
      const retweetedPost = state[action.id];
      const updatedRetweet = action.retweet === 0 ? 1 : 0;
      return {
        ...state,
        [action.id]: {
          ...retweetedPost,
          retweet: updatedRetweet
        }
      };
    case OPEN_COMMENT_BOX:
      const commentClickedPost = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...commentClickedPost,
          isComment: !action.isComment
        }
      };
    case ADD_COMMENT:
      const commentAddPost = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...commentAddPost,
          isComment: !action.isComment,
          comments: {
            ...commentAddPost.comments,
            [action.commentId]: {
              commentId: action.commentId,
              commentText: action.commentText,
              commentLike: 0,
              commentRetweet: 0
            }
          }
        }
      };
    case PLUS_COMMENT_LIKE:
      const commentedPost = state[action.id];
      const commentAddList = state[action.id].comments;
      const commentLikePost = commentAddList[action.commentId];
      const updatedCommentLike = action.commentLike === 0 ? 1 : 0;
      return {
        ...state,
        [action.id]: {
          ...commentedPost,
          comments: {
            ...commentAddList,
            [action.commentId]: {
              ...commentLikePost,
              commentLike: updatedCommentLike
            }
          }
        }
      };
    case PLUS_COMMENT_RETWEET:
      const selectedPost = state[action.id];
      const selectedComments = state[action.id].comments;
      const commentRetweetPost = selectedComments[action.commentId];
      const updatedCommentRetweet = action.commentRetweet === 0 ? 1 : 0;
      return {
        ...state,
        [action.id]: {
          ...selectedPost,
          comments: {
            ...selectedComments,
            [action.commentId]: {
              ...commentRetweetPost,
              commentRetweet: updatedCommentRetweet
            }
          }
        }
      };
    default:
      return state;
  }
};

export default posts;
