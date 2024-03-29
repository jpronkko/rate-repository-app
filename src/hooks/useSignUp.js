import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {

  const [createUser, result] = useMutation( CREATE_USER );

  const signUp = async ({ username, password }) => {
    const user = { username, password };
    const createResult = await createUser({ variables: { user: user }});
    console.log("Create user result:", createResult);
    return createResult;
  };

  return [signUp, result];
};

export default useSignUp;