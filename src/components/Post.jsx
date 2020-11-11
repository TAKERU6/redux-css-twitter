import React, { Component } from "react";
import Comment from "./Comment";
import "../styles.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { View, Text } from "react-native";
import { plusLike, plusRetweet, openCommentBox, addComment } from "../actions";

class Post extends Component {
  state = { commentText: "" };

  handleCommentChange = (event) =>
    this.setState({ commentText: event.target.value });

  onCommentSubmit = (e) => {
    e.preventDefault();
    const { post, onSubmit } = this.props;
    const commentedAt = new Date().toLocaleString();
    onSubmit(post.id, post.isComment, this.state.commentText, commentedAt);
    this.setState({ commentText: "" });
  };

  render() {
    const { post, onClickLike, onClickRetweet, onClickComment } = this.props;
    const iconStyle = { padding: 0, fontSize: 15 };
    const isComment = !!post.isComment;

    return (
      <div className="tweet">
        {post.text}
        <div>
          <img src={post.img_src} />
        </div>
        <br />
        <FontAwesomeIcon
          style={iconStyle}
          icon={faComments}
          onClick={() => onClickComment(post.id, post.isComment)}
        />
        &nbsp;&nbsp;
        <FontAwesomeIcon
          style={iconStyle}
          icon={faHeart}
          onClick={() => onClickLike(post.id, post.like)}
        />
        {post.like}
        &nbsp;&nbsp;
        <FontAwesomeIcon
          style={iconStyle}
          icon={faRetweet}
          onClick={() => onClickRetweet(post.id, post.retweet)}
        />
        {post.retweet}
        <View>
          <Text style={{ textAlign: "right" }}>{post.createdAt}</Text>
        </View>
        {isComment && (
          <form onSubmit={(e) => this.onCommentSubmit(e)}>
            <input
              type="text"
              value={this.state.commentText}
              onChange={this.handleCommentChange}
            />
            <input type="submit" value="apply" />
          </form>
        )}
        <div>
          {Object.values(post.comments).map((comment) => (
            <Comment key={comment.commentId} comment={comment} id={post.id} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ posts: state.posts });

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLike: (id, like) => dispatch(plusLike(id, like)),
    onClickRetweet: (id, retweet) => dispatch(plusRetweet(id, retweet)),
    onClickComment: (id, isComment) => dispatch(openCommentBox(id, isComment)),
    onSubmit: (id, isComment, commentText, commentedAt) =>
      dispatch(addComment(id, isComment, commentText, commentedAt))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
