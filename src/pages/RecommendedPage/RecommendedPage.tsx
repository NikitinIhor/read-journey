import Header from "../../components/Header/Header";
import RecommendedFilters from "../../components/RecomendedPage/RecommendedFilters/RecommendedFilters";
import Start from "../../components/RecomendedPage/Start/Start";
import css from "./RecommendedPage.module.css";

interface RecommendedPageProps {}

const RecommendedPage: React.FC<RecommendedPageProps> = () => {
  return (
    <div className={css.container}>
      <div className="container">
        <Header />
        <div className={css.filter_body}>
          <RecommendedFilters />
          <Start />
        </div>
      </div>
    </div>
  );
};

export default RecommendedPage;
