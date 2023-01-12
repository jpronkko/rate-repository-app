import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (first, orderBy, orderDirection, searchKeyword) => {
  const gqlVariables = { orderBy, orderDirection, searchKeyword };
  
  const { data, error, loading, fetchMore, ...result} = 
    useQuery(GET_REPOSITORIES, {
      variables: { first, ...gqlVariables },
      fetchPolicy: 'cache-and-network',
    });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if(!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...gqlVariables,
      },
    });
  };
  
  return { 
    repositories: data?.repositories, 
    fetchMore: handleFetchMore,
    loading, 
    error, 
    ...result,
  };
};

export default useRepositories;
