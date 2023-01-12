import RepositoryListContainer from "../../components/RepositoryListContainer";
import { render, /*screen*/ } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
  
      const numToString = (val) => {
        return val > 1000 ? (val/1000).toFixed(1) + 'k' : val;
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer 
          repositories={repositories}
        />
      );
      
      //screen.debug({ message: 'repo items'});
      const repositoryItems = getAllByTestId('repositoryItem');
      
      expect(repositoryItems).toHaveLength(2);
     
      // Check for repository's name, description, language, forks count, stargazers count, 
      // rating average, and review count 
     
      for(let i = 0; i < repositoryItems.length; i++) {
        const repoItem = repositoryItems[i];
        const testRepoNode = repositories.edges[i].node;

        expect(repoItem).toHaveTextContent(testRepoNode.fullName);
        expect(repoItem).toHaveTextContent(testRepoNode.description);
        expect(repoItem).toHaveTextContent(testRepoNode.language);
        
        const forksCount = numToString(testRepoNode.forksCount);
        expect(repoItem).toHaveTextContent(forksCount);
        
        const stargazersCount = numToString(testRepoNode.stargazersCount);
        expect(repoItem).toHaveTextContent(stargazersCount);

        expect(repoItem).toHaveTextContent(testRepoNode.ratingAverage);
        expect(repoItem).toHaveTextContent(testRepoNode.reviewCount);
      }
    });
  });
});