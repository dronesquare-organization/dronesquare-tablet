import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./style/GlobalStyle";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Amplify } from "aws-amplify";
import { amplifyConfig } from "./awsconfig";

Amplify.configure(amplifyConfig);

function App() {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
