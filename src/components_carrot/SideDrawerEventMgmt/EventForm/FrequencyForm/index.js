import { React, useState } from "react"
import Select from 'react-select';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';

import OptionSelect from 'components_carrot/SideDrawerEventMgmt/EventForm/OptionSelect';
import { Month } from "components_carrot/SideDrawerEventMgmt/EventForm/FrequencyForm/Month.js";
import { Week } from "components_carrot/SideDrawerEventMgmt/EventForm/FrequencyForm/Week.js";
import { daysOfTheWeek } from "components_carrot/SideDrawerEventMgmt/EventForm/FrequencyForm/daysOfTheWeek.js";
import MDBox from "components_carrot/MDBox";

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  selectContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexGrow: 1,
  },
  labelBox: {
    marginRight: theme.spacing(1),
  },
}));

const FrequencyForm = ({ onFrequencyChange }) => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState({});
  const handleSelectChange = (selected, fieldId) => {
    const newSelectedOptions = { ...selectedOptions, [fieldId]: selected };
    setSelectedOptions(newSelectedOptions);
    onFrequencyChange(newSelectedOptions);
    // onFrequencyChange({ [fieldId]: selected });
  };

  const form = [
    {
      id: "month",
      label: '월',
      options: Month, // Month는 월별 옵션들을 나타내는 배열이어야 합니다.
    },
    {
      id: "week",
      label: '주',
      options: Week // Week는 주별 옵션들을 나타내는 배열이어야 합니다.
    },
    {
      id: "daysOfWeek",
      label: '요일',
      options: daysOfTheWeek // daysOfTheWeek는 요일별 옵션들을 나타내는 배열이어야 합니다.
    },
    {
      id: "day",
      label: '일',
      options: [
        { value: "?", label: "선택안함" },
        ...Array.from({ length: 31 }, (_, i) => ({ value: `${i + 1}`, label: `${i + 1}` })),
        { value: "L", label: "마지막날" }
        ]
    },
    // {
    //   id: "hour",
    //   label: '시간',
    //   options: Array.from({ length: 24 }, (_, i) => i) // 0부터 23까지의 시간 배열
    // },
    // {
    //   id: "minute",
    //   label: '분',
    //   options: Array.from({ length: 60 }, (_, i) => i) // 0부터 59까지의 분 배열
    // },
  ]


  const renderFormField = (field) => {
    const isWeekOrDaysOfWeek = field.id === "week" || field.id === "daysOfWeek";

    const selectStyles = {
      control: (styles) => ({
        ...styles,
        width: '100%',
        height: '35px', // 세로 높이 조정
        minHeight: '35px',
        background: '#fff',
        borderColor: '#9e9e9e',
      }),
      option: (styles) => ({
        ...styles,
        fontSize: '1rem', // 옵션의 글씨 크기 조정
        color: 'black', // 옵션의 글씨 색상 조정
      }),
      placeholder: (styles) => ({
        ...styles,
        fontSize: '15px', // Placeholder 글씨 크기 조정
        // lineWidth: '30px'
      }),
      valueContainer: (provided) => ({
        ...provided,
        height: '100%',
        width: '100%',
        padding: '0', // 필요한 경우 패딩 조정
        overflow: 'hidden', // 컨테이너에서 벗어난 내용 숨김
        display: 'flex', // Flex 컨테이너로 설정
        flexWrap: 'nowrap', // 모든 선택된 값들을 한 줄로 나열
      }),
      multiValue: (styles) => ({
        ...styles,
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fontSize: '15px', // 선택된 값의 글씨 크기 조정
        lineHeight: 'normal',
        marginLeft: '3px',
        margin: isWeekOrDaysOfWeek ? '0' : '2px',
        overflow: 'hidden', // 넘치는 내용 숨김
        whiteSpace: 'nowrap', // 텍스트를 한 줄로 표시
        marginBottom: '3PX'
      }),
      multiValueLabel: (styles) => ({
        ...styles,
        color: 'black', // 텍스트 색상을 검정색으로 설정
        display: 'flex',
        flexWrap: 'nowrap', // 모든 선택된 값들을 한 줄로 나열
        overflow: 'auto', // 가로 스크롤바 표시
        maxWidth: '100%', // 컨테이너 최대 너비 제한
      }),
      dropdownIndicator: (styles) => ({
        ...styles,
        padding: '0', // 화살표 패딩 조정'
        height: '20px'
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
    };


    return (
      <FormControl fullWidth variant="standard">
        <Select
          styles={selectStyles}
          options={field.options}
          components={{ Option: OptionSelect }}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          value={selectedOptions[field.id]}
          onChange={(selected) => handleSelectChange(selected, field.id)}
          placeholder=""
        />
      </FormControl>
    )
}

  return (
    <Grid container direction="column" alignItems="center" >
      {/* 월 */}
      <Grid item className={classes.rowContainer}>
        <Box className={classes.selectContainer}  >
          <Typography variant="subtitle1" align="right" style={{ fontSize: '15px' }} className={classes.labelBox}>
            {form[0].label}:
          </Typography>
          {renderFormField(form[0])}
        </Box>
      </Grid>

      {/* 주 및 요일 */}
      <Grid item className={classes.rowContainer}>
        <Box className={classes.selectContainer} style={{ width: '100%'}}>
          <Typography variant="subtitle1" align="right" style={{ fontSize: '15px' }} className={classes.labelBox}>
            {form[1].label}:
          </Typography>
          {renderFormField(form[1])}
          <Box style={{ width: '20px' }} />
          <Typography variant="subtitle1" align="right" style={{ fontSize: '15px' }} className={classes.labelBox}>
            {form[2].label}:
          </Typography>
          {renderFormField(form[2])}
        </Box>
      </Grid>

      {/* 일 */}
      <Grid item className={classes.rowContainer}>
        <Box className={classes.selectContainer}>
          <Typography variant="subtitle1" align="right" style={{ fontSize: '15px' }} className={classes.labelBox}>
            {form[3].label}:
          </Typography>
          {renderFormField(form[3])}
        </Box>
      </Grid>
    </Grid>
  );
};



export default FrequencyForm;