import { Formik } from 'formik';
import { View } from 'react-native';
import { useNavigate } from "react-router-native";

import * as yup from 'yup';
import SignInForm from './SignInForm';
import useSignIn from '../hooks/useSignIn';
import Message from './Message';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, ({ min }) => `Username must be at least ${min} characters.`)
    .required('Username is required'),
  password: yup
    .string()
    .min(4, ({ min }) => `Password must be at least ${min} characters.`)
    .required('Password is required')
});

export const SignInContainer = ({onSubmit}) => {
  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      /*const { data } = await signIn({ username, password });
      console.log("Sigin data", data);*/
      navigate("/");
    } catch (e) {
      console.log("Exception: ", e);
      Message("Error!", e.toString());
    }
  };
  return <SignInContainer onSubmit={onSubmit}/>;
};
 
export default SignIn;