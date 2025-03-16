'use client'
 
import { buildURL } from '@/lib/utils'
import { createContext, useEffect, useState } from 'react'

export type AppContextType = {
  userId: string,
  setUserId: Function,
  userName: string,
}

export const AppContext = createContext<AppContextType>({
  userId: "",
  setUserId: () => {},
  userName: "",
})
 
export function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (userId) {
      fetch(buildURL("/api/user/" + userId))
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.full_name);
        });
    }
  }, [userId]);

  return <AppContext.Provider value={{userId, setUserId, userName}}>{children}</AppContext.Provider>
}