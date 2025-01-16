import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import sprite from "../../assets/icons/sprite.svg";
import { signin } from "../../redux/auth/ops";
import { selectIsLoggedIn, selectLoading } from "../../redux/auth/slice";
import { AppDispatch } from "../../redux/store";
import Loader from "../Loader/Loader";
import css from "../SignupForm/SignupForm.module.css";

interface SignInFormProps {
  login: boolean;
  handleChangeForm: () => void;
}

interface SigninFormValues {
  email: string;
  password: string;
}

const initialValues: SigninFormValues = {
  email: "",
  password: "",
};

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required(),
  password: Yup.string().min(6, "Too short").max(256, "Too long").required(),
});

const SignInForm: React.FC<SignInFormProps> = ({ login, handleChangeForm }) => {
  const [showIcon, setShowIcon] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggodIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (isLoggodIn) {
      navigate("/recommended");
    }
  }, [isLoggodIn, navigate]);

  const handleShowIcon = () => {
    setShowIcon((prev) => !prev);
  };

  const handleSubmit = (values: SigninFormValues) => {
    dispatch(signin(values));
  };

  if (loading) return <Loader />;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.container}>
            <label htmlFor="mail">Mail:</label>
            <Field
              className={`${css.field} ${css.mail} ${
                errors.email && touched.email
                  ? css.errorField
                  : touched.email && !errors.email
                  ? css.validField
                  : ""
              }`}
              type="email"
              name="email"
              placeholder="Your@email.com"
            />
            <ErrorMessage className={css.error} name="email" component="span" />
          </div>

          <div className={css.container}>
            <label htmlFor="password">Password:</label>
            <Field
              className={`${css.field} ${css.password} ${
                errors.password && touched.password
                  ? css.errorField
                  : touched.password && !errors.password
                  ? css.validField
                  : ""
              }`}
              type={showIcon ? "password" : "text"}
              name="password"
              placeholder="Yourpasswordhere"
            />
            <button className={css.btn_icon} onClick={handleShowIcon}>
              {showIcon ? (
                <svg width={18} height={18}>
                  <use href={`${sprite}#icon-eye-off`}></use>
                </svg>
              ) : (
                <svg width={18} height={18}>
                  <use href={`${sprite}#icon-eye`}></use>
                </svg>
              )}
            </button>
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />
          </div>
          <div className={css.btns}>
            <button type="submit" className={css.registration}>
              {login ? "Log in" : "Registration"}
            </button>
            <button
              type="button"
              className={css.login}
              onClick={handleChangeForm}
            >
              {login ? "Don’t have an account?" : "Already have an account?"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
