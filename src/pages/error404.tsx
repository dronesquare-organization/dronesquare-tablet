import { useLocation } from "react-router-dom";
import Error from "../components/Error";
import Header from "../components/Header";
import { localeString } from "../utils/localeString";
import useLocale from "../hooks/useLocale";

export default function Error404() {
  const location = useLocation();
  const { locale } = useLocale();
  const code = location.search.split("code=").pop();

  return (
    <>
      <Header />
      {code === "project_id_not_found" ? (
        <Error
          description={localeString.error.notExistProject[locale.locale]}
          code="404"
        />
      ) : (
        <Error
          description={localeString.error.notFound[locale.locale]}
          code="404"
        />
      )}
    </>
  );
}
