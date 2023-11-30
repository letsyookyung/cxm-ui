export const UpdateFields = [
  {
    id: "recid",
    label: "이벤트 ID",
    type: "text",
    editable: false,
  },
  {
    id: "sgmtRecId",
    label: "세그먼트 이름",
    type: "select",
    options:[...segmentOptions],
    editable: true,
  },
  {
    id: "eventNm",
    label: "이벤트 이름",
    type: "text",
    editable: true,
  },
  {
    id: "extrAtrRecId",
    label: "추출 컬럼",
    type: "select",
    options:[...extrAtrOptions],
    editable: true,
  },
  {
    id: "schdExpre",
    label: "이벤트 주기",
    type: "react",
    editable: true,
  },
  {
    id: "stcd",
    label: "상태 코드",
    type: "select",
    editable: true,
  },
  {
    id: "stcdMdfDthms",
    label: "상태코드 변경일시",
    type: "text",
    editable: false,
  },
  {
    id: "strDthms",
    label: "시작",
    type: "text",
    editable: true,
  },
  {
    id: "ndDthms",
    label: "종료",
    type: "text",
    editable: true,
  },
  {
    id: "rstTyp",
    label: "결과 타입",
    type: "text",
    editable: true,
  },
  {
    id: "rst",
    label: "결과",
    type: "text",
    editable: false,
  },
  {
    id: "mdfUsrId",
    label: "수정자",
    type: "text",
    editable: false,
  },
  {
    id: "mdfDthms",
    label: "수정일시",
    type: "text",
    editable: false,
  },

];