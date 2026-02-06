import {useTranslation} from "react-i18next";
import {Link} from "react-router";

import {LoginForm, loginReducer} from "@/features/login";

import {routePaths} from "@/shared/config";
import {DynamicModuleLoader} from "@/shared/lib";
import {AppPage} from "@/shared/ui";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
    const {t} = useTranslation("auth");

    return (
        <AppPage className={styles.wrapper}>
            <div className={styles.main}>
                <h1 className={styles.title}>{t("login.signIn")}</h1>
                <DynamicModuleLoader
                    reducers={{loginForm: loginReducer}}
                    removeAfterUnmount
                >
                    <LoginForm/>
                </DynamicModuleLoader>
                <span className={styles.footer}>
          {t("login.dontHaveAccount")}{" "}
                    <Link className={styles.link} to={routePaths.register}>
            {t("register.signUp")}
          </Link>
        </span>
            </div>
        </AppPage>);
};

export default LoginPage;
