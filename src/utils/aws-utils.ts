import * as AWS from "@aws-sdk/client-ssm";

export const makeObjectFromParameters = (
  Parameters: AWS.Parameter[] | undefined
) => {
  const map = new Map();
  Parameters?.forEach((param) => {
    map.set(param.Name, param.Value);
  });
  return Object.fromEntries(map);
};
