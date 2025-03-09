import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import sprite from "../../assets/icons/sprite.svg";
import { signup } from "../../redux/auth/ops";
import { selectError, selectLoading } from "../../redux/auth/slice";
import { AppDispatch } from "../../redux/store";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import css from "./SignupForm.module.css";

interface SignupFormProps {
  login: boolean;
  handleChangeForm: () => void;
}

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required(),
  email: Yup.string().email("Enter a valid email").required(),
  password: Yup.string().min(6, "Too short").max(256, "Too long").required(),
});

const SignupForm: React.FC<SignupFormProps> = ({ login, handleChangeForm }) => {
  const [showIcon, setShowIcon] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleShowIcon = () => {
    setShowIcon((prev) => !prev);
  };

  const handleSubmit = (values: SignupFormValues) => {
    dispatch(signup(values));
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.container}>
            <label htmlFor="name">Name:</label>
            <Field
              className={`${css.field} ${css.name} ${
                errors.name && touched.name
                  ? css.errorField
                  : touched.name && !errors.name
                  ? css.validField
                  : ""
              }`}
              type="text"
              name="name"
              placeholder="Ilona Ratushniak"
            />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>

          <div className={css.container}>
            <label htmlFor="email">Mail:</label>
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

export default SignupForm;
