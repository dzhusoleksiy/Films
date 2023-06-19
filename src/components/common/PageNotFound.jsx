import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center">Page Not Found</h1>
      <Link to="/" className="text-red-500 text-xl">
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
