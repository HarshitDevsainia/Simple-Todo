// app/layout.tsx
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "SimpleTodo",
  description: "SimpleTodo app",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
