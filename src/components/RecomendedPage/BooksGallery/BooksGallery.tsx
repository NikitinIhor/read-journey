import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../../redux/books/ops";
import {
  selectBooks,
  selectError,
  selectLoading,
} from "../../../redux/books/slice";
import { AppDispatch } from "../../../redux/store";
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";
import css from "./BooksGallery.module.css";

import sprite from "../../../assets/icons/sprite.svg";

const BooksGallery: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Error />;

  const toggleMenu = (book?: any) => {
    setSelectedBook(book);
    setMenu((prev) => !prev);
  };

  const nextBook = () => {
    if (index < books.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const prevBook = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Recommended</h2>
        <div className={css.btns}>
          <button
            className={`${css.btn} ${index === 0 ? css.disabled : ""}`}
            onClick={prevBook}
            disabled={index === 0}
          >
            <IconContext.Provider value={{ size: "14px" }}>
              <SlArrowLeft />
            </IconContext.Provider>
          </button>
          <button
            className={`${css.btn} ${
              index >= books.length - 1 ? css.disabled : ""
            }`}
            onClick={nextBook}
            disabled={index >= books.length - 1}
          >
            <IconContext.Provider value={{ size: "14px" }}>
              <SlArrowRight />
            </IconContext.Provider>
          </button>
        </div>
      </div>

      <div className={css.slider}>
        <ul
          className={css.list}
          style={{ transform: `translateX(-${index * 160}px)` }}
        >
          {books.map((book) => (
            <li
              className={css.item}
              key={book._id}
              onClick={() => toggleMenu(book)}
            >
              <img src={book.imageUrl} alt={book.title} />
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
      </div>

      {menu && selectedBook && (
        <>
          <div className={css.overlay} onClick={toggleMenu}></div>
          <div className={css.modal}>
            <div className={css.body}>
              <button onClick={toggleMenu} className={css.close} type="button">
                <svg className={css.menu_close} width={28} height={28}>
                  <use href={`${sprite}#icon-x`}></use>
                </svg>
              </button>
              <div className={css.content}>
                <img src={selectedBook.imageUrl} alt={selectedBook.title} />
                <h2>{selectedBook.title}</h2>
                <p className={css.author}>{selectedBook.author}</p>
                <p
                  className={css.total}
                >{`${selectedBook.totalPages} pages`}</p>
                <button>Add to library</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BooksGallery;
