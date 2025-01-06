"use client";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </SessionProvider>
    </RecoilRoot>
  );
};
export default Providers;
