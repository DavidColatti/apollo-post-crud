import { defaultFieldResolver } from "graphql";
import { ApolloError } from "apollo-server-express";
import { SchemaDirectiveVisitor } from "graphql-tools";

export class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const [_, {}, { isAuth }] = args;
      if (isAuth) {
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new ApolloError(
          "You must be an authenticated user to get this information."
        );
      }
    };
  }
}
