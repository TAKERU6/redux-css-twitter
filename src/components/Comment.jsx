import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { plusCommentLike, plusCommentRetweet } from "../actions";

class Comment extends Component {
  render() {
    const { id, comment, onClickLike, onClickRetweet } = this.props;
    const iconStyle = { padding: 0, fontSize: 15 };
    return (
      <div className="comments">
        ↪　{comment.commentText}
        <br />
        <FontAwesomeIcon
          style={iconStyle}
          icon={faHeart}
          onClick={() =>
            onClickLike(id, comment.commentId, comment.commentLike)
          }
        />
        {comment.commentLike}
        &nbsp;&nbsp;
        <FontAwesomeIcon
          style={iconStyle}
          icon={faRetweet}
          onClick={() =>
            onClickRetweet(id, comment.commentId, comment.commentRetweet)
          }
        />
        {comment.commentRetweet}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ posts: state.posts });

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLike: (id, commentId, commentLike) =>
      dispatch(plusCommentLike(id, commentId, commentLike)),
    onClickRetweet: (id, commentId, commentRetweet) =>
      dispatch(plusCommentRetweet(id, commentId, commentRetweet))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
