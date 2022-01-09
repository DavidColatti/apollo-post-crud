export default {
  Query: {
    getAllPosts: async (_, {}, { Post }) => {
      const posts = await Post.find();
      return posts;
    },
  },
  Mutation: {
    createNewPost: async (_, { newPost }, { Post }) => {
      const post = await Post.create(newPost);
      return post;
    },
  },
};
