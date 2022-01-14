import { ApolloError } from "apollo-server-express";

export default {
  Query: {
    getAllPosts: async (_, {}, { Post }) => {
      const posts = await Post.find().populate("author");
      return posts;
    },
    getPostById: async (_, { id }, { Post }) => {
      try {
        const post = await Post.findById(id).populate("author");
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
  },
  Mutation: {
    createNewPost: async (_, { newPost }, { Post, user }) => {
      const createdPost = await Post.create({ ...newPost, author: user._id });
      await createdPost.populate("author");
      return createdPost;
    },
    editPostById: async (_, { id, updatedPost }, { Post, user }) => {
      try {
        const editedPost = await Post.findOneAndUpdate(
          {
            _id: id,
            author: user._id.toString(),
          },
          { ...updatedPost },
          { new: true }
        );

        if (!editedPost) {
          throw new Error("Unable to edit the post.");
        }

        return editedPost;
      } catch (err) {
        throw new ApolloError(err.message, 400);
      }
    },
    deletePostById: async (_, { id }, { Post, user }) => {
      try {
        const deletedPost = await Post.findOneAndDelete({
          _id: id,
          author: user._id.toString(),
        });

        if (!deletedPost) {
          throw new Error("Unable to delete the post.");
        }

        return {
          success: true,
          id: deletedPost.id,
          message: "Your post is deleted.",
        };
      } catch (err) {
        throw new ApolloError(err.message, 400);
      }
    },
  },
};
