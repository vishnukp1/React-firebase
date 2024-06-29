import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  confirmation: ConfirmationResult | null;
  user: any;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  confirmation: null,
  user: null,
  error: null,
};

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const appVerifier = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      return confirmation;
    } catch (error: any) {
      console.error("Send OTP Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    { confirmation, otp }: { confirmation: ConfirmationResult; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await confirmation.confirm(otp);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmation = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export default authSlice.reducer;
