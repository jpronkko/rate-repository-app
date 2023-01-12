import { Formik } from 'formik';
import { View } from 'react-native';
import { useNavigate } from "react-router-native";

import * as yup from 'yup';
import SignUpForm from './SignUpForm';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

import Message from './Message';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, ({ min }) => `Username must be at least ${min} characters.`)
    .max(30, ({ max }) => `Username must be no more than ${max} characters.`)
    .required('Username is required'),
  password: yup
    .string()
    .min(5, ({ min }) => `Password must be at least ${min} characters.`)
    .max(50, ({ max }) => `Password must be no more than ${max} characters.`)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const SignUpContainer = ({onSubmit}) => {
  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
  
    try {
      await signUp({ username, password });
      await signIn({ username, password });

      /*const { signUpData } = await signUp({ username, password });
      console.log("SignUp data", signUpData);
      const { data } = await signIn({ username, password });
      console.log("Sigin data", data);*/
      navigate("/");

    } catch (e) {
      console.log("Exception: ", e);
      Message("Error!", e.toString());
    }
  };
  return <SignUpContainer onSubmit={onSubmit}/>;
};
 
export default SignUp;