import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import AuthStore from "store/AuthStore";
import { flowResult } from "mobx";

const { REACT_APP_SIGNOUT_TIME } = window.runConfig;
const signoutTime = REACT_APP_SIGNOUT_TIME ?? 1000 * 60 * 60 * 8;
const warningTime = signoutTime - 1000 * 60;
// TEST
// const signoutTime = 1000 * 10;
// const warningTime = signoutTime - 1000 * 5;

const events = ["load", "click", "keydown", "scroll"];

let warnTimeout;
let logoutTimeout;

const WithTimer = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(`WithTimer showModal=${showModal}`);
    if (!showModal) return;

    Swal.fire({
      title: "자동 로그아웃 안내",
      text: "안전한 거래를 위해 잠시 후 자동 로그아웃 됩니다",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "로그인 연장",
      cancelButtonText: "지금 로그아웃",
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === "backdrop") {
        keepLogin();
      } else if (result.dismiss === "cancel") {
        logout();
      }
    });
  }, [showModal]);

  useEffect(() => {
    console.log(`@@ WithTimer add eventListener`);
    events.forEach((event) => window.addEventListener(event, resetTimeout));

    // componentWillUnmount
    return () => {
      console.log(`@@ WithTimer remove eventListener`);
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

  const resetStore = async () => {
    await flowResult(AuthStore.logout());
  };

  const logout = async () => {
    await flowResult(AuthStore.logout());
  };

  const keepLogin = () => {
    setShowModal(false);
    resetTimeout();
  };

  return children;
};

export default WithTimer;
