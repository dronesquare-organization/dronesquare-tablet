import Error from "../components/Error";
import Header from "../components/Header";

export default function Error404() {
  return (
    <>
      <Header />
      <Error description="해당 페이지를 찾을 수 없습니다." code="404" />
    </>
  );
}
