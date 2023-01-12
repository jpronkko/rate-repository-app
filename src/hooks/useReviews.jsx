import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useReviews = () => {
  const { data, error, loading, refetch } = useQuery( GET_CURRENT_USER, {
    variables: { includeReviews: true } 
  });

  const remover = (edge) => {
    const {repository, ...other} = edge.node;
    return {...other, ...repository};
  };

  //console.log("UseRevies Data", data?.me.reviews);
  //console.log("ddj", data?.me.reviews.edges.map(edge => remover(edge)));
    
  return { reviews: data?.me.reviews.edges.map(edge => remover(edge)), error, loading, refetch };
};

export default useReviews;