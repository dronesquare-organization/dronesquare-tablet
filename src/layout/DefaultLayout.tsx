import { ReactNode } from "react";
import Header from "../components/Header";
import useMediaQuery from "../hooks/useMediaQuery";
import Error from "../components/Error";
import useLocale from "../hooks/useLocale";
import { localeString } from "../utils/localeString";

export default function DefaultLayout({
  children,
  projectId,
}: {
  children: ReactNode;
  projectId?: number;
}) {
  const { isDisabled } = useMediaQuery();
  const { locale } = useLocale();

  // isDisabled일때 Error 페이지
  return (
    <>
      {isDisabled ? (
        <Error
          description={localeString.error.notSupportedDevice[locale.locale]}
        />
      ) : (
        <>
          <Header projectId={projectId} />
          {children}
        </>
      )}
    </>
  );
}
