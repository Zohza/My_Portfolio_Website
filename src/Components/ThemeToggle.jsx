import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from 'react'
import { cn } from "../lib/utils"

export const ThemeToggle = () =>{
    const [ isDarkMode, setIsDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'dark';
    })

    useEffect(()=>{
        if (isDarkMode){
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    },[isDarkMode])
    const handleToggle =()=>{
            if (isDarkMode){
                setIsDarkMode(false)
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme','light' )
            }else{
                setIsDarkMode(true)
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme','dark' )    
            }
     }
        return(
            <button onClick={handleToggle} className={cn("fixed  top-5 right-5  transition-colors duration-300 " )}>
                {isDarkMode ? 
                <Sun className="h-6 w-6 text-yellow-300" />:
                <Moon className="h-6 w-6 text-blue-900" />}
                </button>
        )
}
