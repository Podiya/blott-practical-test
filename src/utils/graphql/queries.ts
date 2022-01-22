import { gql } from "graphql-request";

export const FETCH_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;
