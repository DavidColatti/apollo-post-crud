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
        throw new Error("Post not found");
      }
      return post;
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
        throw new Error("Unable to edit the post.");
      }

      return editedPost;
    },
    deletePostById: async (_, { id }, { Post, user }) => {
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
    },
  },
};
