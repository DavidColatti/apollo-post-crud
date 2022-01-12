import { parse, join } from "path";
import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { URL } from "../../config";

export default {
  Upload: GraphQLUpload,
  Query: {
    info: () => "Hello I am Image Resolver Methods",
  },
  Mutation: {
    imageUploader: async (_, { file }) => {
      const { filename, createReadStream } = await file;
      let { name, ext } = parse(filename);
      const stream = createReadStream();

      name = name.replace(/([^a-z0-9 ]+)/gi, "-").replace(" ", "_");

      let serverFile = join(
        __dirname,
        `../../uploads/${name}-${Date.now()}${ext}`
      );

      const writeStream = await createWriteStream(serverFile);
      await stream.pipe(writeStream);

      serverFile = `${URL}${serverFile.split("uploads")[1]}`;
      return serverFile;
    },
  },
};
