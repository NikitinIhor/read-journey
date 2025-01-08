import { Link } from "react-router-dom";
import image from "../../assets/images/notFound.jpg";
import css from "./NotFoundPage.module.css";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <div className={css.container}>
      <img src={image} alt="not found page" />
      <button className={css.btn}>
        <Link to="/">return Home</Link>
      </button>
    </div>
  );
};

export default NotFoundPage;
