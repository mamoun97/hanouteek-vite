import { useTheme } from 'next-themes';
import React, { useEffect } from 'react'
import { ThemeProvider } from '../utils/ThemeProvider';

export default function LayoutTheme({ children }: { children: React.ReactNode }) {
    
    return (
        <>
        <ThemeProvider>
            {children}
        </ThemeProvider>
            
        </>
    )
}
