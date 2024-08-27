import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextThemeProvider
      // enableSystem
      defaultTheme="light"
      storageKey="theme-r"
      disableTransitionOnChange
      themes={["dark","light"]}
    >
      {children}
    </NextThemeProvider>
  );
}