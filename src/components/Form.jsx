import React, { Component } from "react";
import { connect } from "react-redux";
import { addPosts } from "../actions";

class Form extends Component {
  state = { text: "", img_src: "" };

  handleChangeText = (event) => this.setState({ text: event.target.value });

  handleChangeFile = (event) => {
    const files = event.target.files;
    const image_url = window.URL.createObjectURL(files[0]);
    URL.revokeObjectURL(image_url.blob);
    this.setState({ img_src: image_url });
  };

  onTweet = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { text, img_src } = this.state;
    const createdAt = new Date().toLocaleString();
    onSubmit(text, createdAt, img_src);
    this.setState({ text: "" });
  };

  render() {
    console.log(this.state.img_src);

    return (
      <div>
        <form onSubmit={this.onTweet}>
          <textarea
            className="textarea"
            type="text"
            placeholder="What are you doing now?"
            value={this.state.text}
            onChange={this.handleChangeText}
          />
          <br />
          <input
            type="file"
            ref="file"
            accept="image/*"
            onChange={this.handleChangeFile}
          />
          <br />
          <input className="tweet_button" type="submit" value="tweet" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ posts: state.posts });

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (text, createdAt, img_src) =>
      dispatch(addPosts(text, createdAt, img_src))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
