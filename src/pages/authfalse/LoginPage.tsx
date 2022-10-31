import { useState } from "react";
import { ThemeConsumer } from "styled-components";
import PhotoIcon from "../../assets/icons/photoIcon";
import Spinner from "../../components/ui/loading";
import {
  ErrorMessageTxt,
  FormContainer,
  LinkTxt,
  LogoContainer,
  LogoTitle,
} from "../../components/ui/Login/Login.style";
import {
  LoginComponent,
  LoginInput,
  LoginInputButton,
} from "../../components/ui/Login/LoginComponent";
import { useGetUsersQuery } from "../../redux/api";
import { useAppDispatch } from "../../redux/hooks";
import { login, setLoggedInUser } from "../../redux/slices/login.slice";
import { ContainerMain } from "./LoginPage.styles";

const LoginPage = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [loginForm, setLoginForm] = useState<{
    email: string;
    password: string;
  }>({ email: "Sincere@april.biz", password: "123456" });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    setErrorMessage(null);
    setIsLoadingLogin(true);
    setTimeout(() => {
      const lsitOfMails = data?.map((user) => user.email);
      const inputUser = lsitOfMails?.filter((mail) => mail === loginForm.email);
      if (inputUser?.length === 0) {
        setErrorMessage("User not found");
      } else {
        const loggedInUser = data?.filter((user) => {
          if (user.email === loginForm.email) {
            return user;
          }
          return null;
        })[0];
        dispatch(login());
        if (loggedInUser) dispatch(setLoggedInUser(loggedInUser?.id));
      }
      setIsLoadingLogin(false);
    }, 1000);
  };

  return (
    <ThemeConsumer>
      {(theme) => (
        <ContainerMain>
          {isLoading ? (
            <Spinner />
          ) : (
            <LoginComponent>
              {isLoadingLogin ? (
                <Spinner />
              ) : (
                <>
                  <Logo />
                  <FormContainer>
                    <LoginInput
                      autoFocus
                      placeholder="Email address"
                      setValue={(text: string) =>
                        setLoginForm({ ...loginForm, email: text })
                      }
                      value={loginForm.email}
                    />
                    <LoginInput
                      placeholder="Password"
                      type="password"
                      setValue={(text: string) =>
                        setLoginForm({ ...loginForm, password: text })
                      }
                      value={loginForm.password}
                    />
                    {errorMessage && (
                      <ErrorMessageTxt> Error: {errorMessage}</ErrorMessageTxt>
                    )}
                    <LoginInputButton
                      type={"button"}
                      value={"Login"}
                      dark
                      onClick={() => onSubmit()}
                    />
                  </FormContainer>
                  <LinkTxt to={"/"}>
                    Do not have account? Try to create one there.{" "}
                  </LinkTxt>
                </>
              )}
            </LoginComponent>
          )}
        </ContainerMain>
      )}
    </ThemeConsumer>
  );
};

export default LoginPage;

export const Logo = ({
  height,
  align,
}: {
  height?: number;
  align?: string | undefined;
}) => {
  const { width } = window.screen;
  return (
    <ThemeConsumer>
      {(theme) => (
        <LogoContainer align={align}>
          <PhotoIcon
            size={height ? height : width / 10}
            color={theme.color.darkest}
          />
          <LogoTitle size={height && height}> PhotoChat </LogoTitle>
        </LogoContainer>
      )}
    </ThemeConsumer>
  );
};
