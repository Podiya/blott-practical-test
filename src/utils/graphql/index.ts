import { GraphQLClient } from "graphql-request";
import { User, UsersData } from "./models";
import { FETCH_USERS } from "./queries";

const url = "https://api.spacex.land/graphql/";

const client = new GraphQLClient(url, { headers: {} });

export function fetchUsers(): Promise<User[] | undefined> {
  return new Promise((resolve, reject) => {
    try {
      client
        .request<UsersData>(FETCH_USERS)
        .then((data) => resolve(data.users));
    } catch (error) {
      resolve(undefined);
    }
  });
}
