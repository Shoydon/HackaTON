'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TonConnectButton } from '@tonconnect/ui-react'

export default function Navbar() {
  const [navBackground, setNavBackground] = useState('bg-transparent')

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50
      if (show) {
        setNavBackground('bg-white dark:bg-black')
      } else {
        setNavBackground('bg-transparent')
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`fixed w-full z-10 transition-colors duration-300 ${navBackground}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            Hacka<span className='font-extralight'>TON</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/services" className="hover:text-gray-300">Services</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
          <TonConnectButton />
        </div>
      </div>
    </nav>
  )
}

