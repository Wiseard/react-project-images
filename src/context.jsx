import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [searchImages, setSearchImages] = useState('cat')
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const body = document.querySelector('body')
  function toggleTheme() {
    setIsDarkTheme(!isDarkTheme)
    body.classList.toggle('dark-theme')
  }
  return (
    <AppContext.Provider
      value={{ searchImages, setSearchImages, toggleTheme, isDarkTheme }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
