import { useState } from "react";
// import { useNavigate } from "react-router-dom";

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

import AuthStore from "store/AuthStore";

const AppErrorBoundary = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  // const navigate = useNavigate();
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDetail, setErrorDetail] = useState("");

  // 에러 화면
  const authFallback = ({ error, resetErrorBoundary }) => (
    <MDBox my={25}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card>
            <MDBox pt={2} px={2} textAlign="center">
              <MDTypography component="p" variant="h4" fontWeight="regular" color="text">
                <b>{error?.response?.data?.code ?? error?.response?.status}: {errorTitle}</b>
              </MDTypography>
            </MDBox>
            <MDBox pt={2} px={2} textAlign="center">
              <MDTypography component="p" variant="h6" fontWeight="regular" color="text">
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
                  재 시도
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
        onError={( error ) => {
          console.log("@@ AppErrorBoundary");
          if(!(isAxiosError(error) && error?.response?.status)) {
            // 이 ErrorBoundary에서 처리하면 안되는 오류의 경우 상위 ErrorBoundary로 위임
            throw error;
          } else {
            // 그 외 오류 재시도
            let title = "요청 실패, 잠시 후 다시 이용해주세요.";
            const errorStatus = error?.response?.status ?? -999;
            const errorCode = error?.response?.data?.code ?? -999;
            const errorMessage = error?.response?.data?.message ?? error?.message;

            switch (errorStatus) {
              case 401:
                // 권한 오류의 경우 RT 로 AT 재발급
                AuthStore.tokenRefreshRequest();
                title = "인가되지 않은 접근입니다.";
                break;
              case 400:
                if (errorCode == -6 || errorCode == -7) {
                  title = "잘못된 요청입니다.";
                } else if (errorCode == -100) {
                  title = "중복 데이터가 존재합니다.";
                } else if (errorCode == -101) {
                  title = "데이터가 존재하지 않습니다.";
                } else if (errorCode == -250) {
                  title = "유효한 토큰이 없습니다.";
                }
                break;
              case 409:
                title = "중복 데이터가 존재합니다.";
                break;
              case 500:
                if (errorCode == -900 || errorCode == -901) {
                  title = "일시적인 연동 오류입니다 잠시 후 다시 이용해주세요.";
                }
                break;
              default:
                title = "서버와의 연결이 원활하지 않습니다 잠시 후 다시 이용해주세요.";
                break;
            }
            setErrorTitle(title);
            setErrorDetail(errorMessage);
          }
        }}
        FallbackComponent={authFallback}
      >
        {children}
      </ErrorBoundary>
  );
};

export default AppErrorBoundary;