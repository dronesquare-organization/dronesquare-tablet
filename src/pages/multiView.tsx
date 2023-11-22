import withAuth from "../hoc/withAuth";
import DefaultLayout from "../layout/DefaultLayout";

function MultiView() {
  return <DefaultLayout>MultiView</DefaultLayout>;
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(MultiView, { needLogin: true });
