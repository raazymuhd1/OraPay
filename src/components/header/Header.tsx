"use client"
import {useEffect, useState} from 'react'
import MobileLinks from './MobileLinks';
import Nav from './Nav'

const Header = () => {
    const [showNav, updateShowNav] = useState<boolean>(false)

  useEffect(() => {
     if(typeof window != "undefined") {
        const clientHeight = window.scrollY
        console.log(clientHeight)
     }
  }, [typeof window != "undefined" && window.scrollY])

  return (
    <header className="w-full sticky bg-[var(--light-dark)] top-0 h-[70px] py-[15px] border-b-[1px] border-b-[#202021] z-[2]">
        <Nav updateShowNav={updateShowNav} /> 
        <MobileLinks { ...{showNav, updateShowNav} } />
    </header>
  )
}

export default Header