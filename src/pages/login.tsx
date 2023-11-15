import { SubmitHandler, useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

type LogInParameters = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LogInParameters>();
  const onSubmit: SubmitHandler<LogInParameters> = async (data) => {
    await Auth.signIn(data.username, data.password).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("password")} />
      <button type="submit">로그인</button>
    </form>
  );
}
