import { gql } from '@apollo/client';
import { REPO_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
${REPO_FIELDS}
query Repositories(
  $orderBy: AllRepositoriesOrderBy, 
  $orderDirection: OrderDirection, 
  $searchKeyword: String
  $first: Int
  $after: String
  ) {
  repositories(
    orderBy: $orderBy, 
    orderDirection: $orderDirection, 
    searchKeyword: $searchKeyword,
    first: $first,
    after: $after
    ) {
      edges {
          node {
            ...RepositoryParts
          }
    }
    pageInfo {
      endCursor
      hasNextPage
      startCursor
    }
  }
}`;

export const GET_CURRENT_USER = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          createdAt
          text
          rating
          repository {
            fullName
            ratingAverage
            url
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
  }
}`;

export const GET_REPOSITORY = gql`
${REPO_FIELDS}
query Repository(
  $repositoryId: ID!
  $first: Int
  $after: String
  ) {
  repository(id: $repositoryId) {
    ...RepositoryParts
    reviews(first: $first,
      after: $after
      ) {
      edges {
        node {
          id
          user {
            username
          }
          createdAt
          rating
          text
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
  }
}`;
