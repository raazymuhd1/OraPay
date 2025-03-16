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
    <header className="w-full sticky bg-[rgba(9,9,11,255)] top-0 h-[70px] py-[15px] border-b-[1px] border-b-[#202021] z-[2]">
        <Nav />
    </header>
  )
}

export default Header