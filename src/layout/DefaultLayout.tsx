import { ReactNode } from "react";
import Header from "../components/Header";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}