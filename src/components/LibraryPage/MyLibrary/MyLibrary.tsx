import { useState } from "react";
import { RiArrowDownSLine, RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import books from "../../../assets/images/books.png";
import { deleteBook } from "../../../redux/books/ops";
import {
  selectError,
  selectLibrary,
  selectLoading,
} from "../../../redux/books/slice";
import { AppDispatch } from "../../../redux/store";
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";
import css from "./MyLibrary.module.css";

const MyLibrary: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("all");
  const library = useSelector(selectLibrary);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

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

      {library.length > 0 ? (
        <ul className={css.list}>
          {library.map((book) => (
            <li className={css.item} key={book._id}>
              <Link to="/statistica">
                <img src={book.imageUrl} alt={book.title} />
                <div className={css.content}>
                  <h2>{book.title}</h2>
                  <p>{book.author}</p>
                </div>
              </Link>
              <button
                onClick={() => dispatch(deleteBook(book._id))}
                className={css.delete}
              >
                <RiDeleteBin5Line color="red" size={20} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.empty}>
          <div className={css.image}>
            <img src={books} alt="image of books" />
          </div>
          <p className={css.text}>
            To start training, add <span>some of your books</span> or from the
            recommended ones.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
