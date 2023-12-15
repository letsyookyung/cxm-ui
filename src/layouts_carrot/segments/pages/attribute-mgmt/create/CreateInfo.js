// CreateInfo.js


// export const createFieldInit = [
//   tabnm: null,
//   tablXpnm: null,
//   clmNm: null,
//   clmXpnm: null,
//   clmTyp: null,
//   psinfYn: null,
//   xpnm: null,
// ]

export const createField = [
  {
    id: "tabnm",
    label: "테이블명",
    type: "text",
    required: true,
    helperText: "TABLE1"
  },
  {
    id: "tablXpnm",
    label: "테이블 설명",
    type: "text",
  },
  {
    id: "clmNm",
    label: "컬럼명",
    type: "text",
    required: true,
    helperText: "COL1"
  },
  {
    id: "clmXpnm",
    label: "컬럼 설명",
    type: "text",
  },
  {
    id: "clmTyp",
    label: "컬럼 타입",
    type: "text",
    required: true,
  },
  {
    id: "psinfYn",
    label: "개인정보여부",
    type: "select",
    options: [{ label: "Y", id: "Y" }, { label: "N", id: "N" }],
    defaultValue: "N",
    required: true,
  },
  {
    id: "xpnm",
    label: "설명",
    type: "text",
  },
];




