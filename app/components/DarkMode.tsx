'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Image from "next/image";

const DarkMode = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), [])

    if (!mounted) return null;

    return (
        <div className="">
            {theme === 'light' ?
                (<button type="button" className="rounded-lg p-2 bg-neutral-100" onClick={() => setTheme('dark')}>
                    <span className="sr-only">Switch to dark mode</span>
                    <Image src="/images/icon-moon.svg" alt="Moon icon" width={24} height={24} />
                </button>)
                :
                (<button type="button" className="rounded-lg p-2 bg-neutral-700" onClick={() => setTheme('light')}>
                    <span className="sr-only">Switch to light mode</span>
                    <Image src="/images/icon-sun.svg" alt="Sun icon" width={24} height={24} />
                </button>)
            }
        </div>
    )
}

export default DarkMode