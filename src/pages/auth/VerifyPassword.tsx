import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "../../components";
import { ARROW, VERIFY_PHONE } from "../../assets";
import { verifyOtp } from "../../store/slices/authSlice";
import { AppDispatch, RootState } from "../../store/Store";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast, ToastContainer } from "react-toastify";

const VerifyPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { confirmation } = useSelector((state: RootState) => state.auth);

  const initialValues = {
    number: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    number: Yup.string()
      .max(6, "Must be 6 characters or less")
      .required("Required"),
  });

  const handleVerifyOtp = async (values: typeof initialValues) => {
    try {
      if (confirmation) {
        const result = await dispatch(
          verifyOtp({ confirmation, otp: values.number })
        ).unwrap();
        toast.success("OTP verified successfully");

        const usersRef = collection(db, "users");
        const phoneNumber = result.user.phoneNumber;
        console.log("Phone number from result: ", phoneNumber);

        const q = query(usersRef, where("phoneNumber", "==", phoneNumber));

        const querySnapshot = await getDocs(q);

        console.log("querySnapshot", querySnapshot);

        if (!querySnapshot.empty) {
          navigate("/home");
        } else {
          navigate("/registration");
        }

        toast.success("OTP verified successfully");
      } else {
        toast.error("No confirmation result available");
      }
    } catch (err) {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col md:flex-row justify-center    gap-28">
        <div className=" flex  justify-center mt-[54px] w-[512px] ml-28">
          <div className="w-full  ">
            <Logo />
            <div className="mt-[91px] flex gap-1 mb-4 ">
              <img src={ARROW} alt="" />
              <span>Back to login</span>
            </div>
            <span className="text-customGray text-3xl  font-title leading-title  mb-4">
              Verify code
            </span>
            <p className="text-base text-gray-700 mb-6 opacity-75">
              An authentication code has been sent to your email.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleVerifyOtp}
            >
              {() => (
                <Form className="space-y-4">
                  <Field
                    name="number"
                    type="text"
                    label="Enter code"
                    as={Input}
                    className="w-full"
                  />
                  <p className="text-base text-start text-gray-700">
                    Didn't receive a code?{" "}
                    <Link
                      to="/resend"
                      className="text-customPink font-semibold"
                    >
                      Resend
                    </Link>
                  </p>
                  <Button className="w-full" text="Verify" type="submit" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="  mt-[144px] rounded-sm">
          <img src={VERIFY_PHONE} className=" lg:w-[616px]" alt="" />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default VerifyPassword;
