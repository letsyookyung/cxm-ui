import { useCallback, useState } from "react";
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

const AppErrorBoundary = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  const navigate = useNavigate();
  // const [axiosError, setAxiosError] = useState({});

  // 에러 화면
  const authFallback = useCallback(({ error, resetErrorBoundary }) => {
    // setAxiosError(error);

    return(
      <MDBox my={25}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Card>
              <MDBox pt={2} px={2} textAlign="center">
                <MDTypography component="p" variant="h4" fontWeight="regular" color="text">
                  <b>{error?.response?.data?.code ?? error?.response?.status}: {error?.display ?? error?.response?.data?.message}</b>
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
  }, []);

  return (
      <ErrorBoundary
        onReset={reset}
        onError={({ error }) => {
          if(!(isAxiosError(error) && error?.response?.status)) {
            // 이 ErrorBoundary에서 처리하면 안되는 오류의 경우 상위 ErrorBoundary로 위임
            console.log(error);
            throw error;
          } else {
            console.log("AppErrorBoundary");
          }
        }}
        fallbackRender={authFallback}
      >
        {children}
      </ErrorBoundary>
  );
};

export default AppErrorBoundary;