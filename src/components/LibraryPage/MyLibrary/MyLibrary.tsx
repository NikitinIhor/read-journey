import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowDownSLine, RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import books from "../../../assets/images/books.png";
import { deleteBook } from "../../../redux/books/ops";
import { selectLibrary, selectLoading } from "../../../redux/books/slice";
import { AppDispatch } from "../../../redux/store";
import Loader from "../../Loader/Loader";
import css from "./MyLibrary.module.css";

const MyLibrary: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("all");
  const library = useSelector(selectLibrary);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await dispatch(deleteBook(bookId)).unwrap();

      toast.success("Book was deleted from library", {
        duration: 4000,
        position: "top-right",
      });
    } catch (error) {
      const errorMessage = error as string;
      toast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  if (loading) return <Loader />;

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
                onClick={() => handleDeleteBook(book._id)}
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
