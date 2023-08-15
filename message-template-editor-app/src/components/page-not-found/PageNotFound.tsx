import image404 from "../../assets/image/404-error.gif";

import "./PageNotFound.scss";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <img className="image-404" src={image404} alt="Page not found" />
    </div>
  );
};

export default PageNotFound;
