import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import css from "./Start.module.css";

const Start: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Start your workout</h2>
      <ul className={css.list}>
        <li className={css.item}>
          <div className={css.number}>1</div>
          <p className={css.text}>
            <span>Create a personal library:</span>
            add the books you intend to read to it.
          </p>
        </li>
        <li className={css.item}>
          <div className={css.number}>2</div>
          <p className={css.text}>
            <span>Create your first workout:</span>
            define a goal, choose a period, start training.
          </p>
        </li>
      </ul>
      <div className={css.link}>
        <Link to="/library">My library</Link>
        <Link to="/library">
          <IconContext.Provider value={{ size: "20px", color: "white" }}>
            <FaArrowRight />
          </IconContext.Provider>
        </Link>
      </div>
    </div>
  );
};

export default Start;
