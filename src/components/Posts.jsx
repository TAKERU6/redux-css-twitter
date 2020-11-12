import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { View, Text } from "react-native";

class Posts extends Component {
  state = { sort: false };

  onClickSort = () => this.setState({ sort: !this.state.sort });

  handleSortPosts = () => {
    const { posts } = this.props;
    if (!this.state.sort) {
      const values = Object.values(posts).sort((a, b) => (a < b ? 1 : -1));
      return { ...values };
    }
    return posts;
  };

  render() {
    console.log(this.state.sort);
    const isSort = !this.state.sort;
    const newPosts = this.handleSortPosts();

    return (
      <div>
        <View>
          <Text style={{ textAlign: "right" }}>
            {isSort ? (
              <button onClick={this.onClickSort}>Old → New</button>
            ) : (
              <button onClick={this.onClickSort}>New → Old</button>
            )}
          </Text>
        </View>
        {Object.values(newPosts).map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ posts: state.posts });

export default connect(mapStateToProps)(Posts);
