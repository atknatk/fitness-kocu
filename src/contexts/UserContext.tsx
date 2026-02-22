"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserKey, UserProfile } from "@/types";
import { getUserKey, USER_PROFILES } from "@/lib/user";

interface UserContextType {
  userKey: UserKey;
  profile: UserProfile;
  mounted: boolean;
}

const UserContext = createContext<UserContextType>({
  userKey: "atakan",
  profile: USER_PROFILES.atakan,
  mounted: false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userKey, setUserKey] = useState<UserKey>("atakan");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUserKey(getUserKey());
    setMounted(true);
  }, []);

  return (
    <UserContext.Provider value={{ userKey, profile: USER_PROFILES[userKey], mounted }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
