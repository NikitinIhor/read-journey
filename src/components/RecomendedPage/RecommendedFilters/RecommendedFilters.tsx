import css from "./RecommendedFilters.module.css";

interface RecommendedFiltersProps {}

const RecommendedFilters: React.FC<RecommendedFiltersProps> = () => {
  return (
    <div>
      <h2 className={css.title}>Filters:</h2>
      <div className={css.filter}>
        <label>Book title:</label>
        <input type="text" name="text" placeholder="Enter text" />
      </div>
      <div className={css.filter}>
        <label>The author:</label>
        <input type="text" name="text" placeholder="Enter text" />
      </div>
      <button className={css.btn}>To apply</button>
    </div>
  );
};

export default RecommendedFilters;
