/* eslint-disable react-refresh/only-export-components */
import { SubmitHandler, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import withAuth from "../hoc/withAuth";
import useAuthentication from "../hooks/useAuthentication";
import DefaultLayout from "../layout/DefaultLayout";
import { COLOR } from "../style";
import useLocale from "../hooks/useLocale";
import { localeString } from "../utils/localeString";

export type LogInParameters = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LogInParameters>();
  const { signIn, error } = useAuthentication();
  const { locale } = useLocale();

  const onSubmit: SubmitHandler<LogInParameters> = async (data) => {
    signIn(data);
  };

  return (
    <DefaultLayout>
      <form css={formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h3 css={formh3}>{localeString.login.login[locale.locale]}</h3>
        <label css={formLabel} htmlFor="username">
          {localeString.login.id[locale.locale]}
        </label>
        <input
          css={loginInput}
          type="text"
          id="username"
          placeholder="username"
          autoComplete="username"
          {...register("username", { required: true })}
        />
        <label css={formLabel} htmlFor="password">
          {localeString.login.password[locale.locale]}
        </label>
        <input
          css={loginInput}
          type="password"
          id="password"
          placeholder="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
        />
        <div css={errorDiv}>{error}</div>
        <button css={loginButton} type="submit">
          {localeString.login.login[locale.locale]}
        </button>
      </form>
    </DefaultLayout>
  );
};

const formContainer = css`
  width: 340px;
  padding: 42px 30px;
  background-color: #ffffff21;
  position: absolute;
  transform: translate(-50%, -50%);
  // 헤더 57px
  top: calc(50% + 29px);
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid #ffffff21;
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
`;

const formh3 = css`
  font-size: 24px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
`;

const loginInput = css`
  display: block;
  height: 44px;
  width: 100%;
  background-color: #ffffff12;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  color: white;
  letter-spacing: 1px;
  outline: none;
  border: none;
`;

const formLabel = css`
  display: block;
  margin-top: 30px;
  font-size: 14px;
  font-weight: 500;
`;

const basicButton = css`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
`;

export const loginButton = css`
  margin-top: 40px;
  background-color: white;
  color: #080710;
  ${basicButton}
`;

const errorDiv = css`
  margin-top: 10px;
  color: ${COLOR.Red100};
`;

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(Login, { needLogin: false });
