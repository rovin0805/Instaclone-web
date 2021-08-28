import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Welcome to Home!</h1>
      <button onClick={() => logUserOut(history)}>Log out now!</button>
    </div>
  );
};

export default Home;
