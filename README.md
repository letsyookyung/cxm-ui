# UI Admin 개발

## 기본 정보
- Material Dashboard Pro : 2.2.0
- node : 18.12.0
- yarn : 1.22.19

## 패키지 추가
<b>패키지 추가되는 경우 사용 목적 및 절차를 아래에 작성</b>
- ESLint
  ```
  yarn add --dev eslint @babel/core @babel/eslint-parser
  yarn add --dev eslint-plugin-react
  yarn add --dev eslint-config-airbnb
  yarn add --dev eslint-config-prettier
  yarn add --dev eslint-plugin-prettier
  yarn add --dev eslint-plugin-react-hooks
  ```
- rewired 구성
  ```
  yarn add --dev customize-cra
  yarn add --dev react-app-rewired
  yarn add --dev @babel/plugin-proposal-decorators
  ```
- test 도구
  ```
  yarn add --dev jest
  yarn add --dev @testing-library/jest-dom
  yarn add --dev @testing-library/react
  ```
- mobx 상태관리
  ```
  yarn add mobx
  yarn add mobx-react-lite
  ```
- role 처리를 위한 jwt decoder
  ```
  yarn add jwt-decode
  ```
- popup query string 용도
  ```
  yarn add query-string
  ```
- Online Help 용도 Markdown
  ```
  yarn add react-markdown
  ```
- clipboard 복사 기능
  ```
  yarn add react-copy-to-clipboard
  ```
- prop-types
  ```
  yarn add prop-types
  ```
- alert modal
  ```
  yarn add sweetalert2
  ```
- styled-components
  ```
  yarn add styled-components
  ```
- websocket
  ```
  yarn add ws
  yarn add @stomp/stompjs 
  ```
- 브라우져 History 지원
  ```
  yarn add history
  ```
- react-error-boundary
  ```
  yarn add react-error-boundary
  ```
- react-query
  ```
  yarn add react-query
  ```
- axios
  ```
  yarn add axios
  ```
- qs
  ```
  yarn add qs
  ```
- alert modal
  ```
  yarn add sweetalert2
  ```
- date util
  ```
  yarn add moment
  ```
- chart
  ```
  yarn add @nivo/core @nivo/bar @nivo/pie
  ```
- styles
  ```
  yarn add @material-ui/icons
  ```
- spinner
  ```
  yarn add react-spinners
  ```

## Directory Hierarchy
```bash
cxm-ui-admin
├─ config
├─ env
├─ public
└─ src
    ├─ asset_carrot
    ├─ components_carrot
    ├─ conext_carrot
    ├─ error
    ├─ layouts_carrot
    ├─ main
    ├─ skeleton
    ├─ store
    ├─ utils
    └─ views
```

## Source Hierarchy
```bash
index
 └─ Auth
    └─ AuthProvider
        └─ App
            └─ Sidenav
                └─ routes
```
## Error Message
```
{
  "code": -4,
  "message": "Unauthorized",
  "errors": []
}
```