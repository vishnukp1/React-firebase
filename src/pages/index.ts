import { lazy } from "react";

const Home = lazy(() => import("./home-page/Home"));
const SignUp = lazy(() => import("./auth/SignUp"));
const SignIn = lazy(() => import("./auth/SignIn"));
const VerifyPassword = lazy(() => import("./auth/VerifyPassword"));


export { Home,SignUp,SignIn,VerifyPassword };
