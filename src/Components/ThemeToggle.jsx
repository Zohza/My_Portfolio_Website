import { Moon, Sun } from "lucide-react"
import { useState } from 'react'
import { cn } from "../lib/utils"

export const ThemeToggle = () =>{
    const [ isDarkMode, setIsDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark')
            return true;
        }
        document.documentElement.classList.remove('dark')
        return false;
    })
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
            <button onClick={handleToggle} className={cn("transition-colors duration-300" )}>
                {isDarkMode ?
                <Sun className="h-6 w-6 text-yellow-300" />:
                <Moon className="h-6 w-6 text-blue-900" />}
                </button>
        )
}
