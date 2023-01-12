import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();

  const [authenticate, result] = useMutation( AUTHENTICATE_USER );
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    const authResult = await authenticate({ variables: { credentials }});
    //console.log("Got token:", authResult.data.authenticate.accessToken, "r:", result);
    const token = authResult.data.authenticate.accessToken;
        
    authStorage.setAccessToken(token);
    apolloClient.resetStore();
    return authResult;
  };

  return [signIn, result];
};

export default useSignIn;