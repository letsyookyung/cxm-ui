/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDTypography from "components_carrot/MDTypography";

// Material Dashboard 2 PRO React base styles
import typography from "assets_carrot/theme/base/typography";

import { useContext, useEffect, useState } from "react";

function Footer({ company }) {
  // const agentStore = useContext(AgentStore);
  const { href, name } = company;
  const { size, fontWeightBold } = typography;
  const [isViewWarning, setIsViewWarning] = useState(true);

  // TODO
  // useEffect(() => {
  //   if (
  //     agentStore.pageName === "리워드이력" ||
  //     agentStore.pageName === "영수이력" ||
  //     agentStore.pageName === "리워드추첨" ||
  //     agentStore.pageName === "영수정산" ||
  //     agentStore.pageName === "설계정산" ||
  //     agentStore.pageName === "캠페인정산" ||
  //     agentStore.pageName === "제휴사정산" ||
  //     agentStore.pageName === "리워드정산" ||
  //     agentStore.pageName === "고객이력"
  //   ) {
  //     setIsViewWarning(true);
  //   } else {
  //     setIsViewWarning(false);
  //   }
  // }, [agentStore.pageName, agentStore.pagePath]);

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontWeight={fontWeightBold}
        fontSize={size.sm}
        px={1.5}
        >
        {isViewWarning && (
          <p>
            <span style={{ color: "black" }} >*고객정보 취급(처리) 주의*</span>
            {" "}개인정보가 포함된 페이지로, 문서 처리 시 비공개 설정 등 취급에 주의하여 주시기 바랍니다. 사용 목적을 달성한 경우{" "}
            <span style={{ textDecoration: "underline" }}>즉시 파기</span>
            하여 주시기 바랍니다.
          </p>
        )}
      </MDBox>
      <MDBox
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color="text"
          fontSize={size.sm}
          px={1.5}
        >
          &copy; {new Date().getFullYear()} &nbsp;
          <Link href={href} target="_blank">
            <MDTypography variant="button" fontWeight="regular" color="warning">
                {name}
            </MDTypography>
          </Link>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://www.carrotins.com", name: "캐롯손해보험" },
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
};

export default Footer;
