import React, { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { UserLogin } from "./YupForm";
import { AccountContextData } from "../components/Context/AccountContext";
import LoginSpinner from "./LoginSpinner";
import { useNavigate } from "react-router-dom";

function Login() {
  const [DisBtn, setDisBtn] = useState(false);
  const [Spin, setSpin] = useState(false);
  const { LoginStatus, setLoginStatus, User, setUser } =
    React.useContext(AccountContextData);

  const Navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: UserLogin,

    onSubmit: async (values, actions) => {
      setDisBtn(true);
      setSpin(true);
      //---------------------------------
      // Making Token with Slice methode

      const allValues = { ...values };

      //--------------------------------------

      fetch("http://localhost:5000/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allValues),
      })
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          setUser({ ...data });
          if (data.status) {
            toast.warn(data.status);
            setSpin(false);
            setDisBtn(false);
            setLoginStatus(data.loggedIn);
          } else if (data.loggedIn) {
            //setLoginToken(data.UserToke)
            // setFormLoad(false)
            toast.success(data.status);
            setLoginStatus(data.loggedIn);
            setUser({ ...data });
            if (User.UserType === "Admin") {
              Navigate("/Section");
            } else {
              Navigate("/Exchange");
            }
            setDisBtn(false);
            setSpin(false);
            actions.resetForm();
          }
        });
    },
  });

  return (
    <div className="LoginCon">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label style={{ color: "white" }} for="" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={formik.values.Email}
            name="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Email && formik.errors.Email ? (
            <p className="required-p-user">{formik.errors.Email}</p>
          ) : null}
        </div>
        <div className="mb-3">
          <label style={{ color: "white" }} for="" className="form-label ">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={formik.values.Password}
            name="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Password && formik.errors.Password ? (
            <p className="required-p-user">{formik.errors.Password}</p>
          ) : null}
        </div>
        <button
          disabled={DisBtn}
          type="submit"
          className="btn btn-primary flex justify-center self-center"
        >
          Login
          {Spin && (
            <span className="ml-2">
              <LoginSpinner />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
