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
import { IUser } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login, setLoggedInUser } from "../../redux/slices/login.slice";
import { ContainerMain } from "./LoginPage.styles";

export interface IUserWithImage {
  userId: number;
  image: string;
}

export const onLoginSubmit = async ({
  allUsersData,
  setErrorMessage,
  loginForm,
  next,
}: {
  allUsersData: IUser[];
  setErrorMessage: () => void;
  loginForm: {
    email: string;
    password: string;
  };
  next: () => void;
}): Promise<IUser | null> => {
  return new Promise<IUser | null>((resolve) => {
    setTimeout(() => {
      const listOfMails = allUsersData?.map((user) => user.email);
      const inputUser = listOfMails?.filter((mail) => mail === loginForm.email);

      if (inputUser?.length === 0) {
        setErrorMessage();
        resolve(null);
      } else {
        const returnUser = allUsersData.find(
          (user) => user.email === loginForm.email
        );
        next();
        if (returnUser) resolve(returnUser);
        else {
          resolve(null);
        }
      }
    }, 1000);
  });
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const allUsersData = useAppSelector((state) => state.Users.users);
  const [loginForm, setLoginForm] = useState<{
    email: string;
    password: string;
  }>({ email: "Sincere@april.biz", password: "123456" });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);

  return (
    <ThemeConsumer>
      {(theme) => (
        <ContainerMain data-testid="loginpage">
          {isLoadingLogin ? (
            <Spinner />
          ) : (
            <LoginComponent>
              <Logo height={40} />
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
                  onClick={async () => {
                    //
                    if (allUsersData) {
                      setErrorMessage(null);
                      setIsLoadingLogin(true);
                      const test = await onLoginSubmit({
                        allUsersData,
                        setErrorMessage: () =>
                          setErrorMessage("User not found"),
                        next: () => {
                          const loggedInUser = allUsersData?.filter((user) => {
                            if (user.email === loginForm.email) {
                              sessionStorage.setItem(
                                "loggedInId",
                                user.id.toString()
                              );
                              return user;
                            }
                            return null;
                          })[0];
                          dispatch(login());
                          if (loggedInUser) {
                            dispatch(setLoggedInUser(loggedInUser?.id));
                          }
                        },
                        loginForm,
                      });
                      console.log(test);

                      setIsLoadingLogin(false);
                    }
                  }}
                />
              </FormContainer>
              <LinkTxt to={"/"}>
                Do not have account? Try to create one there.{" "}
              </LinkTxt>
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
  height: number;
  align?: string | undefined;
}) => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <LogoContainer align={align}>
          <PhotoIcon size={height} color={theme.color.tint} />
          <LogoTitle size={height}> PhotoChat </LogoTitle>
        </LogoContainer>
      )}
    </ThemeConsumer>
  );
};
