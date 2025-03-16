'use client'
 
import { sendRequest } from '@/lib/utils'
import { createContext, useEffect, useState } from 'react'

export type AppContextType = {
  userId: string | null,
  setUserId: Function,
  userName: string,
  isLoading: boolean,
}

export const AppContext = createContext<AppContextType>({
  userId: null,
  setUserId: () => {},
  userName: "",
  isLoading: true,
})
 
export function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (userId === null) {
      return;
    }

    if (userId) {
      localStorage.setItem("userId", userId);

      sendRequest(`/api/user/${userId}`, "GET", {})
        .then((data: any) => {
          setUserName(data.full_name);
        });
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  return <AppContext.Provider value={{userId, setUserId, userName, isLoading}}>{children}</AppContext.Provider>
}