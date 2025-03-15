
"use client"

import { ThemeProvider as ShadcnThemeProvider } from "@/components/ui/theme-provider";

// Re-export with default dark theme
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ShadcnThemeProvider defaultTheme="dark" storageKey="tetracrypt-theme">
      {children}
    </ShadcnThemeProvider>
  );
}

// Re-export from the ui folder for compatibility
export { useTheme } from "@/components/ui/theme-provider";
