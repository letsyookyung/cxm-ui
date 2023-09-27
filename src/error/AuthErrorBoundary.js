import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDButton from "components_carrot/MDButton";
import MDTypography from "components_carrot/MDTypography";

import { useQueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { isAxiosError } from "axios";

const AuthErrorBoundary = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  const navigate = useNavigate();
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDetail, setErrorDetail] = useState("");

  // 에러 화면
  const authFallback = ({ error, resetErrorBoundary }) => (
    <MDBox width="100%" height="100%">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Card>
            <MDBox pt={2} px={2} textAlign="center">
              <MDTypography component="p" fontSize="0.9vw" color="text">
                <b>{error?.response?.data?.code ?? error?.response?.status}: {errorTitle}</b>
              </MDTypography>
            </MDBox>
            <MDBox pt={2} px={2} textAlign="center">
              <MDTypography component="p" fontSize="0.9vw" color="text">
                {errorDetail}
              </MDTypography>
            </MDBox>
            <MDBox my={5} />
            <Divider />
            <MDBox pt={2} px={2}>
              <Grid container spacing={3} justifyContent="flex-end">
                {/* <MDButton variant="outlined" color="dark" sx={{ marginY: 2, marginLeft: 2}} onClick={() => navigate(-1)}>
                  이전 화면
                </MDButton> */}
                <MDButton variant="outlined" color="dark" sx={{ marginY: 2, marginLeft: 2}} onClick={() => resetErrorBoundary()}>
                  재 로그인
                </MDButton>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );

  return (
      <ErrorBoundary
        onReset={reset}
        onError={(error) => {
          console.log("@@ AuthErrorBoundary");
          if(!(isAxiosError(error) && error?.response?.status)) {
            // 이 ErrorBoundary에서 처리하면 안되는 오류의 경우 상위 ErrorBoundary로 위임
            throw error;
          } else {
            let title = "인증 실패, 확인 후 다시 이용해주세요.";
            const errorStatus = error?.response?.status ?? -999;
            const errorCode = error?.response?.data?.code ?? -999;
            const errorMessage = error?.response?.data?.message ?? error?.message;

            // SSO 오류
            if (error?.request?.responseURL?.indexOf("sso") !== -1) {
              switch (errorStatus) {
                // TODO 에러 문구 세분화
                case 401:
                  title = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
                  break;
                case 403:
                  title = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
                  break;
                case 404:
                  title = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
                  break;
                case 500:
                  title = "SSO 서버 오류, 잠시 후 다시 이용해주세요.";
                  break;
                default:
                  title = "SSO 연결 오류, 잠시 후 다시 이용해주세요.";
                  break;
              }
            } else {
              // JWT 오류
              switch (errorStatus) {
                case 400:
                  if (errorCode === -101)
                    title = "권한이 없거나 만료되었습니다 확인 후 다시 이용해주세요.";
                  else
                    title = "잘못된 요청입니다 확인 후 다시 이용해주세요.";
                  break;
                case 401:
                  title = "허용되지 않은 요청입니다 확인 후 다시 이용해주세요.";
                  break;
                case 403:
                  title = "허용되지 않은 IP 입니다 확인 후 다시 이용해주세요.";
                  break;
                case 500:
                  title = "인증 서버 오류입니다 잠시 후 다시 이용해주세요.";
                  break;
                default:
                  title = "인증 서버와의 연결이 원활하지 않습니다 잠시 후 다시 이용해주세요.";
                  break;
              }
            }
            setErrorTitle(title);
            setErrorDetail(errorMessage)
          }
        }}
        FallbackComponent={authFallback}
      >
        {children}
      </ErrorBoundary>
  );
};

export default AuthErrorBoundary;