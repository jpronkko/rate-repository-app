import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutation, result] = useMutation( CREATE_REVIEW );
  const apolloClient = useApolloClient();

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    const reviewParam = { ownerName, rating, repositoryName, text };
    const mResult = await mutation({ variables: { review: reviewParam }});

    console.log("Create review result", mResult);
    
    apolloClient.resetStore();
    return mResult;
  };

  return [createReview, result];
};

export default useCreateReview;