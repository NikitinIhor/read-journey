import Header from "../../components/Header/Header";
import RecommendedFilters from "../../components/RecommendedFilters/RecommendedFilters";
import css from "./RecommendedPage.module.css";

interface RecommendedPageProps {}

const RecommendedPage: React.FC<RecommendedPageProps> = () => {
  return (
    <div className={css.container}>
      <div className="container">
        <Header />
        <RecommendedFilters />
      </div>
    </div>
  );
};

export default RecommendedPage;
