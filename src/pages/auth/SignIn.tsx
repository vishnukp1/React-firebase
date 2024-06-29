import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Logo } from "../../components";
import { LOGIN_PHONE } from "../../assets";
import { sendOtp } from "../../store/slices/authSlice";
import { AppDispatch, RootState } from "../../store/Store";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input"; 
import "react-phone-number-input/style.css";

const SignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);
  const [otpError, setOtpError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      await dispatch(sendOtp(phoneNumber)).unwrap();
      setOtpError(null);
      toast.success("OTP sent successfully");
      navigate("/verify");
    } catch (err) {
      console.error("Error sending OTP:", err);
      setOtpError(error || "Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="flex lg:flex-row xs:flex-col justify-center lg:mx-14 xl:mx-auto pl-[35px] lg:gap-[91px]">
      <div className="flex flex-col mt-[54px] w-full md:w-[512px]">
        <div className="-ml-[50px]">
          <Logo />
        </div>

        <span className="text-customGray text-3xl  font-title leading-title mt-[100px]">
          Login
        </span>
        <p className="text-base text-[1rem] text-gray-700 mt-4 mb-8 opacity-75">
          Let's access your travelwise account
        </p>

        <PhoneInput
          className="border-2 h-10 w-80"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          defaultCountry="US" 
        />
        <div id="recaptcha"></div>
        <Button
          text="Get OTP"
          className="w-full mt-4"
          type="button"
          onClick={handleSubmit}
        />
        {error && <p>Error: {error}</p>}

        <p className="mt-4 text-base text-center text-gray-700">
          Don't have an account?{" "}
          <Link to="/registration" className="text-customPink font-semibold">
            Sign up
          </Link>
        </p>
      </div>
      <div>
        <img
          src={LOGIN_PHONE}
          className="w-full md:w-[616px] h-[816px] object-cover mt-[144px] rounded-sm"
          alt=""
        />
      </div>
    </div>
  );
};

export default SignIn;
