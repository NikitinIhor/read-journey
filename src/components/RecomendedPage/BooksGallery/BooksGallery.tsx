import { IconContext } from "react-icons";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import css from "./BooksGallery.module.css";

const BooksGallery: React.FC = () => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Recommended</h2>
        <div className={css.btns}>
          <button className={css.btn}>
            <IconContext.Provider value={{ size: "14px", color: "white" }}>
              <SlArrowLeft />
            </IconContext.Provider>
          </button>
          <button className={css.btn}>
            <IconContext.Provider value={{ size: "14px", color: "white" }}>
              <SlArrowRight />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksGallery;
