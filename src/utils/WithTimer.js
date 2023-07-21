import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

import AuthStore from "stores_carrot/AuthStore";
import UserStore from "stores_carrot/UserStore";

const signoutTime = 1000 * 60 * 60 * 8;
const warningTime = signoutTime - 1000 * 60;

const events = ["load", "click", "keypress"];

let warnTimeout;
let logoutTimeout;

const WithTimer = ({ children }) => {
  const authStore = useContext(AuthStore);
  const userStore = useContext(UserStore);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;

    Swal.fire({
      title: i18n.t("alert.logout_title"),
      text: i18n.t("alert.logout_soon"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: i18n.t("alert.keep_login"),
      cancelButtonText: i18n.t("alert.logout_now"),
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === "backdrop") {
        keepLogin();
      } else if (result.dismiss === "cancel") {
        logout();
      }
    });
  }, [showModal]);

  useEffect(() => {
    events.forEach((event) => window.addEventListener(event, resetTimeout));

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimeout));
    };
  }, [showModal]);

  const setTimer = () => {
    warnTimeout = setTimeout(() => {
      setShowModal(true);
    }, warningTime);

    logoutTimeout = setTimeout(() => {
      resetStore();
    }, signoutTime);
  };

  const clearTimeoutFunc = () => {
    if (warnTimeout) clearTimeout(warnTimeout);
    if (logoutTimeout) clearTimeout(logoutTimeout);
  };

  const resetTimeout = () => {
    if (showModal) return;

    clearTimeoutFunc();
    setTimer();
  };

  const resetStore = () => {
    userStore.forgetUser();
    authStore.logout();
  };

  const logout = () => {
    userStore.forgetUser();
    authStore.logout();
  };

  const keepLogin = () => {
    setShowModal(false);
    resetTimeout();
  };

  return <>{children}</>;
};

export default WithTimer;
