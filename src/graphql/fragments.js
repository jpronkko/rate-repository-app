import { gql } from '@apollo/client';

export const REPO_FIELDS = gql`
fragment RepositoryParts on Repository {
  createdAt
  description
  forksCount
  fullName
  id
  language
  name
  ownerAvatarUrl
  ownerName
  ratingAverage
  reviewCount
  stargazersCount
}`;
