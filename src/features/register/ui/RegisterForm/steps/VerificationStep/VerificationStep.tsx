import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { selectRegisterError } from "@/features/register/model/selectors/selectRegisterError/selectRegisterError";
import { selectRegisterIsLoading } from "@/features/register/model/selectors/selectRegisterIsLoading/selectRegisterIsLoading";
import { selectRegisterPhone } from "@/features/register/model/selectors/selectRegisterPhone/selectRegisterPhone.ts";
import { resendCode } from "@/features/register/model/services/resendCode";
import { verifyCode } from "@/features/register/model/services/verifyCode";

import { routePaths } from "@/shared/config";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Button, Spinner, OTPInput } from "@/shared/ui";

import styles from "./VerificationStep.module.scss";

export const VerificationStep = () => {
  const { t } = useTranslation("auth");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const phone = useAppSelector(selectRegisterPhone);
  const error = useAppSelector(selectRegisterError);
  const isLoading = useAppSelector(selectRegisterIsLoading);

  const onSubmit = async (code: string) => {
    const result = await dispatch(verifyCode({ phone, code }));
    if (verifyCode.fulfilled.match(result)) {
      navigate(routePaths.home);
    }
  };

  const handleResend = () => {
    dispatch(resendCode({ phone }));
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.title}>
          {t("register.verification.sentTo")} <br />
          <span>{phone}</span>
        </div>
        <OTPInput disabled={isLoading} error={!!error} onComplete={onSubmit} />
        {error && <div className={styles.error}>{error}</div>}
        {isLoading && (
          <div className={styles.wrapper}>
            <Spinner size="md" />
          </div>
        )}
      </form>
      <div className={styles.resendCodeText}>
        <span>{t("register.verification.codeNotReceived")}</span>
        <Button
          onClick={handleResend}
          disabled={isLoading}
          className={styles.resendCodeButton}
          theme="ghost"
        >
          {t("register.verification.resend")}
        </Button>
      </div>
    </>
  );
};
