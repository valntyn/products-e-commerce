/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  getIdTokenResult,
  User,
  getAuth,
} from 'firebase/auth';

import { RootState } from '@store/store';

import { auth } from '../../firebase';

type UserState = {
  user: User | null;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
};

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',

  async (_, { getState }) => {
    const state = getState() as RootState;
    const { user } = state.auth;

    if (user) {
      const authInstance = getAuth();
      const { currentUser } = authInstance;

      if (currentUser) {
        const idTokenResult = await getIdTokenResult(currentUser);

        const refreshedUser: User = {
          ...user,
          refreshToken: idTokenResult.token,
        };

        return refreshedUser;
      }
    }

    return null;
  },
);

export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',

  async (_, { dispatch }) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    dispatch(refreshToken());

    return result.user;
  },
);

export const githubSignIn = createAsyncThunk(
  'auth/githubSignIn',

  async (_, { dispatch }) => {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);

    dispatch(refreshToken());

    return result.user;
  },
);

export const logOut = createAsyncThunk(
  'auth/logOut',

  async (_, { dispatch }) => {
    await signOut(auth);
    dispatch(refreshToken());
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(googleSignIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(githubSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(githubSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(githubSignIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
