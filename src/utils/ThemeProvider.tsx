import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextThemeProvider
      enableSystem
      defaultTheme="system"
      storageKey="theme-r"
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}