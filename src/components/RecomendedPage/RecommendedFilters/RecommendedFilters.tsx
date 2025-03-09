import { useDispatch, useSelector } from "react-redux";
import {
  filterByAuthor,
  filterByTitle,
  selectFilterByAuthor,
  selectFilterByTitle,
  selectFilterError,
  selectFilterLoading,
} from "../../../redux/filters/slice";
import { AppDispatch } from "../../../redux/store";
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";
import css from "./RecommendedFilters.module.css";

interface RecommendedFiltersProps {}

const RecommendedFilters: React.FC<RecommendedFiltersProps> = () => {
  const title = useSelector(selectFilterByTitle);
  const author = useSelector(selectFilterByAuthor);
  const loading = useSelector(selectFilterLoading);
  const error = useSelector(selectFilterError);
  const dispatch = useDispatch<AppDispatch>();

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByTitle(event.target.value));
  };

  const handleAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByAuthor(event.target.value));
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div>
      <h2 className={css.title}>Filters:</h2>
      <div className={css.filter}>
        <label>Book title:</label>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter text"
          onChange={handleTitle}
        />
      </div>
      <div className={css.filter}>
        <label>The author:</label>
        <input
          type="text"
          name="author"
          value={author}
          placeholder="Enter text"
          onChange={handleAuthor}
        />
      </div>
      <button className={css.btn}>To apply</button>
    </div>
  );
};

export default RecommendedFilters;
