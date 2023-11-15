import { makeObjectFromParameters } from "./utils/aws-utils";
import {
  API_GATEWAY_URL,
  DATA_BUCKET_NAME,
  COGNITO_IDENTITYPOOL_ID,
  COGNITO_USERPOOL_ID,
  COGNITO_USERPOOL_WEBCLIENT_ID,
  POTREE_PROXY_ENDPOINT,
  TIMESERIES_ENDPOINT,
  CAL_API_ENDPOINT,
  MAPPING_REQUEST_URL,
} from "./utils/constant";
import { Auth } from "aws-amplify";

const Parameters = await fetch(import.meta.env.VITE_PUBLIC_SSM_URL!)
  .then((res) => res.json())
  .catch((error) => {
    throw new Error(error);
  });

export const configObject = makeObjectFromParameters(
  Parameters as {
    Name: string;
    Value: string;
  }[]
);

export const amplifyConfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: configObject[COGNITO_IDENTITYPOOL_ID],
    // REQUIRED - Amazon Cognito Region
    region: import.meta.env.VITE_PUBLIC_REGION!,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: configObject[COGNITO_USERPOOL_ID],
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: configObject[COGNITO_USERPOOL_WEBCLIENT_ID],
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
  Storage: {
    AWSS3: {
      bucket: configObject[DATA_BUCKET_NAME],
      region: import.meta.env.VITE_PUBLIC_REGION!,
    },
  },
  API: {
    endpoints: [
      {
        name: "DronesquareApi-PublicStorage",
      },
      {
        name: "DronesquareApi",
        endpoint: configObject[API_GATEWAY_URL],
        custom_header: async () => {
          return {
            Authorization: `${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
      {
        name: "DronesquareApi-Timeseries",
        endpoint: configObject[TIMESERIES_ENDPOINT],
        custom_header: async () => {
          return {
            Authorization: `${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
      {
        name: "DronesquareApi-Calculation",
        endpoint: configObject[CAL_API_ENDPOINT],
        custom_header: async () => {
          return {
            Authorization: `${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
      {
        name: "DronesquareApi-Potree",
        endpoint: configObject[POTREE_PROXY_ENDPOINT],
        custom_header: async () => {
          return {
            Authorization: `${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
      {
        name: "MyCustomCloudFrontApi",
        endpoint: "https://d12nqhyx53o365.cloudfront.net/api",
      },
      {
        name: "DronesquareApi-Mapping-Request",
        endpoint: configObject[MAPPING_REQUEST_URL],
        custom_header: async () => {
          return {
            Authorization: `${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
    ],
  },
  ssr: true,
};
