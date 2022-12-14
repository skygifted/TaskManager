import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { AdminUserForm } from "../YupForm";
import { AccountContextData } from "../Context/AccountContext";
import ProgressSpinner from "../ProgressSpinner";


function SectionUserForm() {

  const [AddShoID, setAddShID] = useState(Math.floor(Math.random() * 1676870));
  const [DisBtn, setDisBtn] = useState(false);
  const [Spin, setSpin] = useState(false);
  const { setRefresh, Refresh,User } = useContext(AccountContextData);

  const RandomID = () => {
    setAddShID(Math.floor(Math.random() * 1676870));
  };

  const formik = useFormik({
    initialValues: {
      Fname: "",
      Lname: "",
      Mobile: "",
      Email: "",
      UserType: "",
      Psswrd: "",
      Rpt_Psswrd: "",
    },
    validationSchema: AdminUserForm,

    onSubmit: async (values, actions) => {
      setDisBtn(true);
      setSpin(true);
      //---------------------------------
      // Making Token with Slice methode
      const Allslice = {
        F: values.Fname.slice(0, 4).toUpperCase(),
        S: values.Lname.slice(0, 4).toUpperCase(),
        Num1: values.Mobile.slice(3),
        Num2: values.Fname.charCodeAt(0),
        Num3: values.Lname.charCodeAt(2),
        Num4: Math.floor(Math.random() * 1676870),
        AttachedSlice: function () {
          return (
            this.Num3 + this.S + this.Num1 + this.F + this.Num2 + this.Num4
          );
        },
      };
      const allValues = {
        ...values,
        userTokenID: Allslice.AttachedSlice(),
        user_ID: AddShoID,
      };

      //--------------------------------------

      if (values.Psswrd !== values.Rpt_Psswrd) {
        toast.error("Password not Match");
        setSpin(false);
        setDisBtn(false);
      } else {
        fetch("http://localhost:5000/admin/register_users", {
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
            actions.resetForm();
            toast.success(data.status);
            RandomID();
            setDisBtn(false);
            setSpin(false);
            setRefresh(!Refresh);
          });
      }
    },
  });

  return (
    <div className="w-75 flex justify-center self-center sectionUserForm">
      {Spin && (
        <div className="ad-us-con">
          <ProgressSpinner />
        </div>
      )}
      <h3 className="text-center mb-2 mt-2 h3">Register User</h3>
      <small id="emailHelp" class="form-text text-muted">
        
      </small>
      <form onSubmit={formik.handleSubmit}>
        <div class="form-group">
          <label className="pt-2 pb-2">
            <b>First Name</b>
          </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter First Name"
            value={formik.values.Fname}
            name="Fname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Fname && formik.errors.Fname ? (
            <p className="required-p">{formik.errors.Fname}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label className="pt-2 pb-2">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Last Name"
            value={formik.values.Lname}
            name="Lname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Lname && formik.errors.Lname ? (
            <p className="required-p">{formik.errors.Lname}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label className="pt-2 pb-2">
            <b>Mobile Number</b>
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Mobile"
            value={formik.values.Mobile}
            name="Mobile"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Mobile && formik.errors.Mobile ? (
            <p className="required-p">{formik.errors.Mobile}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label className="pt-2 pb-2">
            <b>Email</b>
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            value={formik.values.Email}
            name="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Email && formik.errors.Email ? (
            <p className="required-p">{formik.errors.Email}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label className="pt-2 pb-2">
            <b>User Type</b>
          </label>

          <select
            className="form-select"
            value={formik.values.UserType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="UserType"
          >
            <option defaultValue disabled value="">
              Choose...
            </option>
            <option>Supervisor</option>
            <option>Employee</option>
          </select>
          {formik.touched.UserType && formik.errors.UserType ? (
            <p className="required-p">{formik.errors.UserType}</p>
          ) : null}
        </div>

        <div className="form-group">
          <label className="pt-2 pb-2">
            <b>Password</b>
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            value={formik.values.Psswrd}
            name="Psswrd"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Psswrd && formik.errors.Psswrd ? (
            <p className="required-p">{formik.errors.Psswrd}</p>
          ) : null}
        </div>
        <div className="form-group pb-3">
          <label className="pt-2 pb-2">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            value={formik.values.Rpt_Psswrd}
            name="Rpt_Psswrd"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Rpt_Psswrd && formik.errors.Rpt_Psswrd ? (
            <p className="required-p">{formik.errors.Rpt_Psswrd}</p>
          ) : null}
        </div>

        <button
          disabled={DisBtn}
          type="submit"
          class="btn btn-primary bg-emerald-900 "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SectionUserForm;
