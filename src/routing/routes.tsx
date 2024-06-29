

import { Home, SignIn, SignUp, VerifyPassword } from "../pages";
import {
  homePath,
  registrationPath,
  signInPath,
  verifyPagePath,
} from "./route.constants";

export interface RouteType {
  path?: string;
  component: any;
  exact: boolean;
}

export const routes: RouteType[] = [
  {
    path: homePath,
    component: (
      <>
        <Home />
      </>
    ),
    exact: true,
  },
  {
    path: signInPath,
    component: (
      <>
        <SignIn />
      </>
    ),
    exact: true,
  },
  {
    path: registrationPath,
    component: (
      <>
        <SignUp />
      </>
    ),
    exact: true,
  },
  {
    path: verifyPagePath,
    component: (
      <>
        <VerifyPassword />
      </>
    ),
    exact: true,
  },
];
