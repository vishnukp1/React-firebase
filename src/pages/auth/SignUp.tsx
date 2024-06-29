import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Logo } from "../../components";
import { SIGNUP_PHONE } from "../../assets";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    terms: Yup.bool()
      .oneOf([true], "You must accept the terms and privacy policies")
      .required("Required"),
  });

  const handleRegistration = async (values: typeof initialValues) => {
    try {
      const { email, password } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = userCredential._tokenResponse?.idToken;

      if (idToken) {
        localStorage.setItem("idToken", idToken);
      } else {
        throw new Error("idToken not found in response.");
      }

      toast.success("Registration successful");
      navigate("/home");
    } catch (err) {
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <>
      <div className="flex lg:flex-row xs:flex-col-reverse gap-[118px] lg:mx-14 xl:mx-auto justify-center h-screen ">
        <div>
          <img
            src={SIGNUP_PHONE}
            className="w-[486px] h-[816px] pt-[104px] rounded-sm"
            alt=""
          />
        </div>
        <div className=" mt-[54px] w-full md:w-[640px]">
          <div className=" flex justify-end">
            <Logo />
          </div>

          <div className="  items-start mt-[53px]">
            <span className="text-customGray text-3xl font-title leading-title">
              Sign up
            </span>
            <p className="text-base text-[1rem] text-gray-700 mt-4 mb-8 opacity-75">
              Let's get you all set up so you can access your personal account.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegistration}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      name="firstName"
                      type="text"
                      label="First Name"
                      as={Input}
                    />
                    <Field
                      name="lastName"
                      type="text"
                      label="Last Name"
                      as={Input}
                    />
                  </div>
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    as={Input}
                    className="mt-4"
                  />
                  <Field
                    name="password"
                    type="password"
                    label="Password"
                    as={Input}
                    className="mt-4"
                  />
                  <div className="flex items-center mt-6">
                    <Field
                      type="checkbox"
                      name="terms"
                      className="mr-2"
                      id="terms"
                    />
                    <label htmlFor="terms" className="text-gray-700 text-sm">
                      I agree to all the{" "}
                      <span className="text-customPink">
                        Terms <span className="text-customGray">and</span>{" "}
                        Privacy Policies
                      </span>
                    </label>
                    <ErrorMessage
                      name="terms"
                      component="div"
                      className="text-red-500 text-xs ml-2"
                    />
                  </div>
                  <Button
                    text="Create account"
                    className="w-full mt-8"
                    type="submit"
                  />
                </Form>
              )}
            </Formik>

            <p className="mt-4 text-base text-center text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-customPink font-semibold">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
