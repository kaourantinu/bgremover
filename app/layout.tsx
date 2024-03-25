import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin']},);

export const metadata: Metadata = {
  title: "Retirez l'arrière-plan de vos images gratuitement - bgremover",
  description: "Retirez automatiquement l'arrière-plan de vos images en quelques secondes en un seul clic. Ne passez plus des heures à l'effacer manuellement. Chargez votre photo et laissez la magie opérer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
