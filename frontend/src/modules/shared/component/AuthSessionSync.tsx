"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  clearAuthCookie,
  getAuthCookie,
  isValidAuthToken,
  setAuthCookie,
} from "@/utils/authSession";

/** Keeps the middleware cookie aligned with persisted Redux auth state. */
export function AuthSessionSync() {
  const { accessToken, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && isValidAuthToken(accessToken)) {
      if (getAuthCookie() !== accessToken) {
        setAuthCookie(accessToken!);
      }
      return;
    }

    if (getAuthCookie()) {
      clearAuthCookie();
    }
  }, [accessToken, isAuthenticated]);

  return null;
}
