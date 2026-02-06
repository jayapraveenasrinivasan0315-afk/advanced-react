import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { registerActions } from "@/features/register/model/slice/registerSlice";
import { FormSteps } from "@/features/register/model/types/registerForm";

import ArrowRight from "@/shared/assets/icons/ArrowRight.svg?react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { AppIcon, Button, PhoneInput } from "@/shared/ui";

import { selectRegisterError } from "../../../../model/selectors/selectRegisterError/selectRegisterError";
import { selectRegisterIsLoading } from "../../../../model/selectors/selectRegisterIsLoading/selectRegisterIsLoading";
import { selectRegisterPhone } from "../../../../model/selectors/selectRegisterPhone/selectRegisterPhone.ts";

import styles from "./CredentialsStep.module.scss";

export const CredentialsStep = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('auth');

  const phone = useAppSelector(selectRegisterPhone);
  const isLoading = useAppSelector(selectRegisterIsLoading);
  const error = useAppSelector(selectRegisterError);

  const handleChangePhone = (value: string) => {
    dispatch(registerActions.setPhone(value));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerActions.setStep(FormSteps.PASSWORD));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <PhoneInput
        disabled={isLoading}
        error={!!error}
        label={t("register.credentials.phone")}
        onChange={handleChangePhone}
        value={phone}
      />
      {error && <div className={styles.error}>{error}</div>}
      <Button
        className={styles.button}
        isLoading={isLoading}
        type="submit"
        fullWidth
        size="md"
      >
        {t("register.continueButton")}
        <AppIcon Icon={ArrowRight} />
      </Button>
    </form>
  );
};
