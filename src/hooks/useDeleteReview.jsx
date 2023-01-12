import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutation, result] = useMutation( DELETE_REVIEW );
  const apolloClient = useApolloClient();

  const deleteReview = async (reviewId) => {
    const mResult = await mutation({ variables: { deleteReviewId: reviewId }});

    console.log("Delete review result", mResult);
    
    apolloClient.resetStore();
    return mResult;
  };

  return [deleteReview, result];
};

export default useCreateReview;