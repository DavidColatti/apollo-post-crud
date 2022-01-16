import { ApolloError } from "apollo-server-express";
import { generatePaginationOptions } from "../../functions";
import { postValidationRules } from "../../validators/post";

export default {
  Query: {
    getAllPosts: async (_, {}, { Post }) => {
      const posts = await Post.find().populate("author");
      return posts;
    },
    getPostById: async (_, { id }, { Post }) => {
      const post = await Post.findById(id).populate("author");
      if (!post) {
        throw new ApolloError("Post not found", "404");
      }
      return post;
    },
    getPostsByLimitAndPage: async (_, { page, limit }, { Post }) => {
      const posts = await Post.paginate(
        {},
        generatePaginationOptions({ page, limit })
      );
      return posts;
    },
    getAuthenticatedUsersPosts: async (_, { page, limit }, { user, Post }) => {
      const posts = await Post.paginate(
        { author: user._id.toString() },
        generatePaginationOptions({ page, limit })
      );
      return posts;
    },
  },
  Mutation: {
    createNewPost: async (_, { newPost }, { Post, user }) => {
      await postValidationRules.validate(newPost, { abortEarly: false });
      const createdPost = await Post.create({ ...newPost, author: user._id });
      await createdPost.populate("author");
      return createdPost;
    },
    editPostById: async (_, { id, updatedPost }, { Post, user }) => {
      await postValidationRules.validate(updatedPost, { abortEarly: false });

      const editedPost = await Post.findOneAndUpdate(
        {
          _id: id,
          author: user._id.toString(),
        },
        { ...updatedPost },
        { new: true }
      );

      if (!editedPost) {
        throw new ApolloError("Unable to edit the post.", "403");
      }

      return editedPost;
    },
    deletePostById: async (_, { id }, { Post, user }) => {
      const deletedPost = await Post.findOneAndDelete({
        _id: id,
        author: user._id.toString(),
      });

      if (!deletedPost) {
        throw new ApolloError("Unable to delete the post.", "403");
      }

      return {
        success: true,
        id: deletedPost.id,
        message: "Your post is deleted.",
      };
    },
  },
};
