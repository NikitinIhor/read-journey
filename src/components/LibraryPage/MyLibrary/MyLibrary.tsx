import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import books from "../../../assets/images/books.png";
import css from "./MyLibrary.module.css";

const MyLibrary: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("all");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>My library</h2>

        <div className={css.selectWrapper}>
          <select
            className={css.select}
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="unread">Unread</option>
            <option value="progress">In progress</option>
            <option value="done">Done</option>
            <option value="all">All books</option>
          </select>

          <div className={css.icon}>
            <RiArrowDownSLine color="white" />
          </div>
        </div>
      </div>

      <div className={css.empty}>
        <div className={css.image}>
          <img src={books} alt="image of books" />
        </div>
        <p className={css.text}>
          To start training, add <span>some of your books</span> or from the
          recommended ones.
        </p>
      </div>
    </div>
  );
};

export default MyLibrary;
