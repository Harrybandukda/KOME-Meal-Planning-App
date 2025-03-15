'use client'
 
import { createContext, useState } from 'react'

export type AppContextType = {
  userId: string,
  setUserId: Function,
}

export const AppContext = createContext<AppContextType>({
  userId: "",
  setUserId: () => {},
})
 
export function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [userId, setUserId] = useState<string>("");

  return <AppContext.Provider value={{userId, setUserId}}>{children}</AppContext.Provider>
}