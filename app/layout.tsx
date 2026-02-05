import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ingresse Club - Gestão de Adesões",
  description: "Sistema de gestão de adesões ao Ingresse Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
