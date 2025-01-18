// src/app/layout.tsx
import './globals.css'; // or your CSS file name
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
          <body>{children}</body>
        </html>
      );
}