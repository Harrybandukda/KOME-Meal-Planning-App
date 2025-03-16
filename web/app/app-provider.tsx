'use client'
 
import { buildURL } from '@/lib/utils'
import { createContext, useEffect, useState } from 'react'

export type AppContextType = {
  userId: string | null,
  setUserId: Function,
  userName: string,
}

export const AppContext = createContext<AppContextType>({
  userId: null,
  setUserId: () => {},
  userName: "",
})
 
export function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (userId === null) {
      return;
    }

    if (userId) {
      localStorage.setItem("userId", userId);

      fetch(buildURL("/api/user/" + userId))
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.full_name);
        });
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  return <AppContext.Provider value={{userId, setUserId, userName}}>{children}</AppContext.Provider>
}