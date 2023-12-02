import { ReactNode } from "react";
import Header from "../components/Header";
import useMediaQuery from "../hooks/useMediaQuery";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  useMediaQuery();
  return (
    <>
      <Header />

      {children}
    </>
  );
}
