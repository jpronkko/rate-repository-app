import { Formik } from 'formik';
import { View } from 'react-native';
import { useNavigate } from "react-router-native";

import * as yup from 'yup';
import ReviewForm from './ReviewForm';
import useCreateReview from '../hooks/useCreateReview';
import Message from './Message';

const initialValues = {
  username: '',
  reponame: '',
  rating: 10,
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Username is required'),
  rating: yup
    .number()
    .integer()
    .min(0, 'Min value 0.')
    .max(100, 'Max value 100.')
    .required('Rating between 0 and 100 is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  text: yup
    .string()
});

export const ReviewContainer = ({onSubmit}) => {
  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const MakeReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const reviewPrm = { 
      ownerName: values.ownerName, 
      rating: parseInt(values.rating), 
      repositoryName: values.repositoryName, 
      text: values.text 
    };

    try {
      const { data } = await createReview(reviewPrm);
      console.log("Review data", data);
      navigate("/");
    } catch (e) {
      console.log("Exception: ", e);
      Message("Error!", e.toString());
    }
  };
  return <ReviewContainer onSubmit={onSubmit}/>;
};
 
export default MakeReview;