import "./globals.css";
import { Toast } from "@heroui/react";

export const metadata = {
  title: "BetterAuth",
  description: "A stylish, user-friendly authentication starter built with Next.js and Better Auth.",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full">
        {children}
        <Toast.Provider />
      </body>
    </html>
  );
}
