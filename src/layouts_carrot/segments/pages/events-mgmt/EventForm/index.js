import React, { useState, useEffect } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import MDButton from "components_carrot/MDButton";
import MDBox from "components_carrot/MDBox";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function EventForm({jwtToken }) {

  const [formValues, setFormValues] = useState({});
  const [segmentArray, setSegmentArray] = useState([]);

  const eventForm = [
    { id: "eventNm", label: '이벤트명', type: "text-input", placeholder: 'eventNm', helperText: "예: EVENT1"},
    { id: "sgmtName", label: '세그먼트명', type: "select", placeholder: 'sgmtName', options: [...segmentArray],},
    { id: "extrAtrRecId", label: '추출 기준', type: "text-input", placeholder: 'extrAtrRecId', helperText: "예: COL1"},
    { id: "eventTyp", label: '이벤트타입', type: "text-input", placeholder: 'eventTyp', helperText: "예: CSV"},
    { id: "eventCycle", label: '이벤트주기', type: "text-input", placeholder: 'eventCycle'},
    { id: "eventPeriod", label: '이벤트기간', type: "text-input", placeholder: 'eventPeriod'},
  ];

// 서버로부터 세그먼트 데이터를 가져오는 함수
  useEffect(() => {
    async function fetchSegments() {
      try {
        const segmentEndpoint = 'http://localhost:7777/api/cxbd/v1/ui/segment-mgmt/retrieve';
        const { data: response } = await axios.get(segmentEndpoint, {
          params: { sgmtName: null },
          headers: {
            Authorization: `Bearer ${jwtToken}`
          },
        });
        setSegmentArray(response.content.map(segment => ({ label: segment.sgmtName, value: segment.recid })));
      } catch (error) {
        console.error("Error fetching segments", error);
      }
    }

    fetchSegments();
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 호출
  
  

  const [eventData, setEventData] = useState({
    eventNm: '',
    sgmtRecId: '',
    extrAtrRecId: '',
    eventTyp: '',
    stcd: '',
    strDthms: new Date(), // 시작일시는 현재 날짜로 자동 설정
    ndDthms: new Date(), // 종료일시도 현재 날짜로 자동 설정
    rst: ''
  });

  const handleInputChange = (name) => (event) => {
    const value = event.target.value || null;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // 폼 제출을 처리할 함수입니다.
  const handleSubmit = () => {
    // 여기에 백엔드 서버로 데이터를 보내는 로직을 구현합니다.
    console.log(eventData);
  };

  const renderFormField = (form) => {
    if (form.type === 'select') {
      return (
        <FormControl fullWidth variant="standard">
          <Select
            fullWidth
            labelId={`${form.id}-label`}
            id={form.id}
            value={formValues[form.id] || ''}
            onChange={handleInputChange(form.id)}
            label={form.label}
          >
            {form.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    return (
      <FormControl fullWidth>
        <TextField
          required
          fullWidth
          id={form.id}
          label={form.label}
          type="text"
          value={formValues[form.id] || ''}
          onChange={handleInputChange(form.id)}
          helperText={form.helperText}
          variant="standard"
        />
      </FormControl>

    );
  };

  return (
    <Grid container direction="column" alignItems="center" sx={{ padding: '16px', paddingTop: '0px' }}>
      <Grid item style={{ padding: '0px', margin: '5px'}} >
        <Typography variant="h5">이벤트 등록</Typography>
      </Grid>
      {eventForm.map((form) => (
        <Grid item key={form.id} style={{ display: 'flex', marginTop: '7%', width: '90%' }}>
          <Box display="flex" alignItems="center" justifyContent="flex-start" width="95%">
            <Box width="80px" flexGrow={0} marginRight="7%">
              <Typography variant="subtitle1" align="right" style={{ fontSize: '15px' }}>
                {form.label}:
              </Typography>
            </Box>
            <Box flexGrow={1}>
              {renderFormField(form)}
            </Box>
          </Box>
        </Grid>
      ))}
      <MDBox py={0} lineHeight={4}>
        <MDButton
          variant="outlined"
          color="info"
          size="medium"
          onClick={handleSubmit}
        >
          등록
        </MDButton>
      </MDBox>
    </Grid>
  );
}
