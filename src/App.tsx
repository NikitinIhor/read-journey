import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { refresh } from "./redux/auth/ops";
import { AppDispatch } from "./redux/store";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const RecommendedPage = lazy(
  () => import("./pages/RecommendedPage/RecommendedPage")
);
const LibraryPage = lazy(() => import("./pages/LibraryPage/LibraryPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/recommended" element={<RecommendedPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
