import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { addBook, getAllBooks } from "../../../redux/books/ops";
import {
  selectBooks,
  selectLibrary,
  selectLoading,
} from "../../../redux/books/slice";
import { AppDispatch } from "../../../redux/store";
import Loader from "../../Loader/Loader";
import css from "./RecommendedBooks.module.css";

import toast from "react-hot-toast";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import {
  selectFilterByAPages,
  selectFilterByAuthor,
  selectFilterByTitle,
} from "../../../redux/filters/slice";
import GoodJob from "../../GoodJob/GoodJob";

interface RecommendedBooksProps {}

const RecommendedBooks: React.FC<RecommendedBooksProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector(selectBooks);
  const library = useSelector(selectLibrary);
  const loading = useSelector(selectLoading);

  const titleFilter = useSelector(selectFilterByTitle);
  const authorFilter = useSelector(selectFilterByAuthor);
  const pageFilter = useSelector(selectFilterByAPages);

  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  if (loading) return <Loader />;

  const toggleMenu = (book?: any) => {
    setSelectedBook(book);
    setMenu((prev) => !prev);
  };

  const toggleSubMenu = () => {
    setMenu(false);
    setSubMenu((prev) => !prev);
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

  const handleAddBook = async () => {
    const isAlreadyAdded = library.some(
      (book) => book.title === selectedBook.title
    );

    if (isAlreadyAdded) {
      toast.error("This book is already in your library!", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    try {
      await dispatch(addBook(selectedBook._id)).unwrap();
      toggleSubMenu();

      toast.success("Book was added to library", {
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

  const filteredBooks = books.filter((book) => {
    const title = titleFilter
      ? book.title.toLowerCase().includes(titleFilter.toLowerCase())
      : true;
    const author = authorFilter
      ? book.author.toLowerCase().includes(authorFilter.toLowerCase())
      : true;
    const pages = pageFilter ? book.totalPages === pageFilter : true;

    return title && author && pages;
  });

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Recommended books</h2>
      </div>
      <div className={css.slider}>
        <ul
          className={css.list}
          style={{ transform: `translateX(-${index * 90}px)` }}
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <li
                className={css.item}
                key={book._id}
                onClick={() => toggleMenu(book)}
              >
                <img src={book.imageUrl} alt={book.title} />
                <h2>{book.title}</h2>
                <p>{book.author}</p>
              </li>
            ))
          ) : (
            <p>No books are matching your search</p>
          )}
        </ul>
      </div>

      <div className={css.footer}>
        <Link className={css.recommended} to="/recommended">
          Home
        </Link>

        <div className={css.btns}>
          <button
            className={`${css.btn} ${index === 0 ? css.disabled : ""}`}
            onClick={prevBook}
            disabled={index === 0}
          >
            <IconContext.Provider value={{ size: "14px" }}>
              <FaArrowLeftLong />
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
              <FaArrowRightLong />
            </IconContext.Provider>
          </button>
        </div>
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
                <button onClick={handleAddBook}>Add to library</button>
              </div>
            </div>
          </div>
        </>
      )}
      {subMenu && <GoodJob toggleSubMenu={toggleSubMenu} />}
    </div>
  );
};

export default RecommendedBooks;
