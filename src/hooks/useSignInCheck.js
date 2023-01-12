import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useSignInCheck = () => {
  const { data, error, loading } = useQuery( GET_CURRENT_USER );

  console.log("Data", data);
    
  if(loading || error || !data)
    return {result: false, error};

  if(!data.me)
    return {result: false, error};
    
  return { result: true, error };
};

export default useSignInCheck;