import { useQueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";

const RootErrorBoundary = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();

  // 에러 화면
  const rootFallback = ({ error, resetErrorBoundary }) => {
    return(
        <div>
            <h1> 데이터를 불러오는데 실패하였습니다. </h1>
            <p> 에러가 지속되면 관리자에게 문의하세요. </p>
            <footer> {error?.response?.data?.message} </footer>
        </div>
    );
  };

  return (
    <ErrorBoundary
        onReset={reset}
        onError={(error) => {
          console.log("@@ RootErrorBoundary");
          console.log(error);
        }}
        FallbackComponent={rootFallback}
    >
        {children}
    </ErrorBoundary>
  );
};

export default RootErrorBoundary;