import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";
import StatisticaPage from "./pages/StatisticaPage/StatisticaPage";
import { refresh } from "./redux/auth/ops";
import { selectIsRefreshing } from "./redux/auth/slice";
import { AppDispatch } from "./redux/store";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const RecommendedPage = lazy(
  () => import("./pages/RecommendedPage/RecommendedPage")
);
const LibraryPage = lazy(() => import("./pages/LibraryPage/LibraryPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <RestrictedRoute
                component={<WelcomePage />}
                redirectTo="/recommended"
              />
            }
          />
          <Route
            path="/recommended"
            element={
              <PrivateRoute component={<RecommendedPage />} redirectTo="/" />
            }
          />
          <Route
            path="/library"
            element={
              <PrivateRoute component={<LibraryPage />} redirectTo="/" />
            }
          />
          <Route
            path="/statistica/:bookId"
            element={
              <PrivateRoute component={<StatisticaPage />} redirectTo="/" />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
