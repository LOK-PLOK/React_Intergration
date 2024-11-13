import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle></ModeToggle>
      <main>
        {children ? children : <Outlet />}
      </main>
    </ThemeProvider>
  );
}