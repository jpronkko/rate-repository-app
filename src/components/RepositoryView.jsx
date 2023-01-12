import Repository from "./Repository";
import { useParams } from 'react-router-native';

const RepositoryView = () => {
  let { id } = useParams();
  //console.log("params", id);
  return <Repository id={id}/>;
};

export default RepositoryView;