import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { fetchCuurentUser } from "../authSlice/authSlice";
import type { UserType } from "../schema/types";
import { avatarLetter } from "@/lib/helpers";

export function useUsers() {
  const [avatarLetters, setAvatarLetters] = useState<string>("");
  const [user, setUser] = useState<UserType | null>(null);
  const dispatch = useAppDispatch();
  const { data, status, loading, error } = useAppSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCuurentUser());
    }
  }, [status]);
  useEffect(() => {
    if (status === "success" && data) {
      const name = data?.name;
      const currentUser: UserType = {
        department: data?.department,
        email: data?.email,
        email_verified: data?.email_verified,
        name: data?.name,
        phone_verified: data?.phone_verified,
        sub: data?.sub,
      };
      setUser(currentUser);
      const avatarLetters = avatarLetter(name);
      setAvatarLetters(avatarLetters || "");
    }
  }, [data]);

  return {
    userData: user,
    status,
    loading,
    authError: error,
    avatarLetters,
  };
}
