"use client"
import {useEffect} from 'react'
import Nav from './Nav'

const Header = () => {

  useEffect(() => {
     if(typeof window != "undefined") {
        const clientHeight = window.scrollY
        console.log(clientHeight)
     }
  }, [window.scrollY])

  return (
    <header className="w-full h-[70px] py-[15px]">
        <Nav />
    </header>
  )
}

export default Header