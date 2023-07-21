# UI Admin 개발

## 기본 정보
- Material Dashboard Pro : 2.2.0
- node : 18.12.0
- yarn : 1.22.19

## 패키지 추가
<b>패키지 추가되는 경우 사용 목적 및 절차를 아래에 작성</b>
- ESLint
  ```
  yarn add -D eslint @babel/core @babel/eslint-parser
  yarn add -D eslint-plugin-react
  yarn add -D eslint-config-airbnb
  yarn add -D eslint-config-prettier
  ```
- rewired 구성
  ```
  yarn add --dev customize-cra
  yarn add --dev react-app-rewired
  yarn add --dev @babel/plugin-proposal-decorators
  ```
- mobx
  ```
  yarn add mobx
  yarn add mobx-react-lite
  ```
- role 처리를 위한 jwt decoder
  ```
  yarn add jwt-decode
  ```
- rest client
  ```
  yarn add superagent
  yarn add superagent-promise
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