// SearchInfo.js


export const searchDataInit = {
  tabnm: null,
  clmNm: null,
  psinfYn: null,
};

export const searchField = [
  {
    id: "tabnm",
    label: "테이블명",
    key: "tabnm",
    type: "text",
    helperText: "예: CXM_CUS_BA_ATR"
  },
  {
    id: "clmNm",
    label: "컬럼명",
    key: "clmNm",
    type: "text",
    helperText: "예: CTMNO"
  },
  {
    id: "psinfYn",
    label: "개인정보여부",
    key: "psinfYn",
    type: "select",
    options: [{ label: "전체", id: null }, { label: "Y", id: "Y" }, { label: "N", id: "N" }],
    defaultValue: "전체",
  },
];
