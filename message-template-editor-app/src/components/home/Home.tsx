import { Link } from "react-router-dom";

import "./Home.scss";

const Home = () => {
  return (
    <main className="main">
      <div className="container">
        <Link className="btn rounded accent center" to="/template">
          Message Editor
        </Link>
      </div>
    </main>
  );
};

export default Home;
