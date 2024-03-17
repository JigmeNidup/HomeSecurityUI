import Nav from "@/components/Nav";

export const metadata = {
  title: "Home Guard",
  description: "Complete IoT solution for Home security and safety",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav>{children}</Nav>
      </body>
    </html>
  );
}
