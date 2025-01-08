import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import sprite from "../../assets/icons/sprite.svg";
import css from "../SignupForm/SignupForm.module.css";

interface SignInFormProps {
  login: boolean;
  handleChangeForm: () => void;
}

const initialValues = {
  mail: "",
  password: "",
};

const FeedbackSchema = Yup.object().shape({
  mail: Yup.string().email("Enter a valid email").required(),
  password: Yup.string().min(7, "Too short").max(256, "Too long").required(),
});

const handleSubmit = (values: { mail: string; password: string }) => {
  console.log(values);
};

const SignInForm: React.FC<SignInFormProps> = ({ login, handleChangeForm }) => {
  const [showIcon, setShowIcon] = useState(false);

  const handleShowIcon = () => {
    setShowIcon((prev) => !prev);
  };

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
                errors.mail && touched.mail
                  ? css.errorField
                  : touched.mail && !errors.mail
                  ? css.validField
                  : ""
              }`}
              type="email"
              name="mail"
              placeholder="Your@email.com"
            />
            <ErrorMessage className={css.error} name="mail" component="span" />
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
