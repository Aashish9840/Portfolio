import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  title: "Aashish Shah | Frontend developer",
  description:
    "Frontend developer in Bhaktapur, Nepal, building React and Next.js interfaces.",
  icons: {
    icon: "/portfolio_icon.png",
    shortcut: "/portfolio_icon.png",
    apple: "/portfolio_icon.png",
  },
  openGraph: {
    title: "Aashish Shah | Frontend developer",
    description:
      "Frontend developer in Bhaktapur, Nepal, building React and Next.js interfaces.",
    type: "website",
  },
};

// Runs before paint so the saved theme never flashes. Dark is the default.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light")document.documentElement.classList.add("dark")}catch(e){document.documentElement.classList.add("dark")}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${bricolage.variable} font-sans antialiased`}>
        <Providers>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
