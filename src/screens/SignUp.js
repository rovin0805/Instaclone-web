import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import FormError from "../components/auth/FormError";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MATATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const history = useHistory();

  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MATATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  const clearLoginError = () => clearErrors("result");

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "First Name is required",
            })}
            name="firstName"
            type="text"
            placeholder="First Name"
            hasError={Boolean(formState.errors?.firstName?.message)}
            onFocus={clearLoginError}
          />
          <FormError message={formState.errors?.firstName?.message} />
          <Input
            {...register("lastName", {
              required: "Last Name is required",
            })}
            type="text"
            placeholder="Last Name"
            name="lastName"
            hasError={Boolean(formState.errors?.lastName?.message)}
            onFocus={clearLoginError}
          />
          <FormError message={formState.errors?.lastName?.message} />
          <Input
            {...register("email", {
              required: "Email is required",
            })}
            name="email"
            type="text"
            placeholder="Email"
            hasError={Boolean(formState.errors?.email?.message)}
            onFocus={clearLoginError}
          />
          <FormError message={formState.errors?.email?.message} />
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username should be longer than 3 chars.",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
            onFocus={clearLoginError}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register("password", {
              required: "Password is required",
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
            onFocus={clearLoginError}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}

export default SignUp;
