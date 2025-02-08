'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false)

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), [])

    if (!mounted) return null;

    return (
        <Link href="/">
            {theme === 'light' ?
            (<Image src="/images/logo-light-theme.svg" alt="Logo" width={200} height={40} />)
            :
            (<Image src="/images/logo-dark-theme.svg" alt="Logo" width={200} height={40} />)
            }
        </Link>
    )
}

export default Logo