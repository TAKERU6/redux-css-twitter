import React, { Component } from "react";
import { connect } from "react-redux";
import { addPosts } from "../actions";

class Form extends Component {
  state = { text: "" };

  handleChangeText = (event) => this.setState({ text: event.target.value });

  onTweet = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const text = this.state.text;
    onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
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
          <input className="tweet_button" type="submit" value="tweet" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ posts: state.posts });

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (text) => dispatch(addPosts(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
