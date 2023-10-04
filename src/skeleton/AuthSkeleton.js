// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDTypography from "components_carrot/MDTypography";

// Spinner
import PuffLoader from "react-spinners/PuffLoader";

const AuthSkeleton = () => (
  <MDBox 
  display="flex"
  width="100%" 
  height="100%"
  zIndex={1}
  >
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      mx="auto"
    >
      <PuffLoader size={35} color="#36d7b7" loading speedMultiplier={0.7} />
      <MDTypography ml={1} variant="body2" color="text" fontWeight="regular">
        Authenticating...
      </MDTypography>
    </MDBox>
  </MDBox>
  );

export default AuthSkeleton;