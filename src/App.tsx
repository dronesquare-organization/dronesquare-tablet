import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./style/GlobalStyle";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Amplify } from "aws-amplify";
import { amplifyConfig } from "./awsconfig";
import { QUERY_OPTIONS } from "./utils/constant";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

Amplify.configure(amplifyConfig);

const queryClient = new QueryClient({
  defaultOptions: { queries: QUERY_OPTIONS },
});

function App() {
  return (
    <RecoilRoot>
      <CustomProvider theme="dark">
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CustomProvider>
    </RecoilRoot>
  );
}

export default App;
