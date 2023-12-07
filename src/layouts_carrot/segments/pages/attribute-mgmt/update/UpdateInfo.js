// UpdateInfo.js

export const updateField = [
  {
    id: "tabnm",
    label: "테이블명",
    type: "text",
    editable: true,
  },
  {
    id: "tablXpnm",
    label: "테이블 설명",
    type: "text",
    editable: true,
  },
  {
    id: "clmNm",
    label: "컬럼명",
    type: "text",
    editable: true,
  },
  {
    id: "clmTyp",
    label: "컬럼 타입",
    type: "text",
    editable: true,
  },
  {
    id: "clmXpnm",
    label: "컬럼 타입",
    type: "text",
    editable: true,
  },
  {
    id: "psinfYn",
    label: "개인정보여부",
    type: "select",
    options: [{ label: "Y", id: "Y" }, { label: "N", id: "N" }],
    defaultValue: "N",
    editable: true,
  },
  {
    id: "xpnm",
    label: "설명",
    type: "text",
    editable: true,
  },
  {
    id: "inpUsrId",
    label: "등록자",
    type: "text",
    editable: false,
  },
  {
    id: "inpDthms",
    label: "등록일자",
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

]