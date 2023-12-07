// ResultTableInfo.js

import { defaultCell, dateCell, updateCell, detailCell } from 'components_carrot/MDTable/cellFunctions';


export const createColumns = (
  handleDetailClick,
  handleUpdateClick,
  ) => (
    [
  {
    Header: "테이블명",
    accessor: "tabnm",
    width: "10%",
    Cell: ({ value }) => defaultCell(value),
  },
  {
    Header: "테이블 설명",
    accessor: "tablXpnm",
    width: "10%",
    Cell: ({ value }) => defaultCell(value),
  },
  {
    Header: "컬럼명",
    accessor: "clmNm",
    width: "10%",
    Cell: ({ value }) => defaultCell(value),
  },
  {
    Header: "컬럼 설명",
    accessor: "clmXpnm",
    width: "10%",
    Cell: ({ value }) => defaultCell(value),
  },
  {
    Header: "컬럼 타입",
    accessor: "clmTyp",
    width: "10%",
    Cell: ({ value }) => defaultCell(value),
  },
  {
    Header: "개인정보부여부",
    accessor: "psinfYn",
    width: "8%",
    Cell: ({ value }) => defaultCell(value),
  },
  {
    Header: "설명",
    accessor: "xpnm",
    width: "10%",
    Cell: ({ value }) => defaultCell(value),
  },
  // {
  //   Header: "등록자",
  //   accessor: "inpUsrId",
  //   width: "5%",
  //   Cell: ({ value }) => defaultCell(value),
  // },
  // {
  //   Header: "등록일자",
  //   accessor: "inpDthms",
  //   width: "10%",
  //   Cell: ({ value }) => dateCell(value),
  // },
  {
    Header: "수정자",
    accessor: "mdfUsrId",
    width: "5%",
    Cell: ({ value }) => defaultCell(value),
  },
  {
    Header: "수정일시",
    accessor: "mdfDthms",
    width: "10%",
    Cell: ({ value }) => dateCell(value),
  },
  {
    id: "detail",
    Header: "상세보기",
    accessor: "recid",
    width: "3%",
    align: "center",
    Cell: ({ row }) => detailCell(row.original, handleDetailClick),
  },
  {
    id: "update",
    Header: "수정",
    accessor: "recid",
    width: "3%",
    align: "center",
    Cell: ({ row }) => updateCell(row.original, handleUpdateClick),
  },
]
);

