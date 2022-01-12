export default {
  Query: {
    getAllPosts: async (_, {}, { Post }) => {
      const posts = await Post.find();
      return posts;
    },
    getPostById: async (_, { id }, { Post }) => {
      const post = await Post.findById(id);
      return post;
    },
  },
  Mutation: {
    createNewPost: async (_, { newPost }, { Post }) => {
      const createdPost = await Post.create(newPost);
      return createdPost;
    },
    editPostById: async (_, { id, updatedPost }, { Post }) => {
      const editedPost = await Post.findByIdAndUpdate(
        id,
        {
          ...updatedPost,
        },
        { new: true }
      );

      return editedPost;
    },
    deletePostById: async (_, { id }, { Post }) => {
      const deletedPost = await Post.findByIdAndDelete(id);

      return {
        success: true,
        id: deletedPost.id,
        message: "Your post is deleted.",
      };
    },
  },
};
