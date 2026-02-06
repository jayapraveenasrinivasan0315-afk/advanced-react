import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import ArrowRight from "@/shared/assets/icons/ArrowRight.svg?react";
import { routePaths } from "@/shared/config";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { AppIcon, Button, Input, PhoneInput } from "@/shared/ui";
import "react-international-phone/style.css";

import { selectLoginError } from "../../model/selectors/selectLoginError/selectLoginError";
import { selectLoginIsLoading } from "../../model/selectors/selectLoginIsLoading/selectLoginIsLoading";
import { selectLoginPassword } from "../../model/selectors/selectLoginPassword/selectLoginPassword";
import { selectLoginPhone } from "../../model/selectors/selectLoginPhone/selectLoginPhone";
import { login } from "../../model/services/login/login";
import { loginActions } from "../../model/slice/loginSlice";

import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  const { t } = useTranslation("auth");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const phone = useAppSelector(selectLoginPhone);
  const password = useAppSelector(selectLoginPassword);
  const isLoading = useAppSelector(selectLoginIsLoading);
  const error = useAppSelector(selectLoginError);

  const handleChangePhone = (value: string) => {
    dispatch(loginActions.setPhone(value));
  };

  const handleChangePassword = (value: string) => {
    dispatch(loginActions.setPassword(value));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(login({ phone, password }));

    if (login.fulfilled.match(result)) {
      navigate(routePaths.home);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <PhoneInput
        label={t("login.phone")}
        error={!!error}
        onChange={handleChangePhone}
        disabled={isLoading}
        value={phone}
        className={styles.input}
        data-testid="phone-input"
      />
      <Input
        onChange={handleChangePassword}
        label={t("login.password")}
        value={password}
        type="password"
        className={styles.input}
        placeholder={t("login.enterPassword")}
        disabled={isLoading}
        data-testid="password-input"
      />
      {error && (
        <div className={styles.error} data-testid="error-message">
          {error}
        </div>
      )}
      <Button
        isLoading={isLoading}
        fullWidth
        type="submit"
        className={styles.button}
        size="md"
        data-testid="submit-button"
      >
        {t("login.loginButton")}
        <AppIcon Icon={ArrowRight} />
      </Button>
    </form>
  );
};
