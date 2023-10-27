import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "components_carrot/MDBox";
import MDInput from "components_carrot/MDInput";
import MDButton from "components_carrot/MDButton";
import axios from "axios";

const SearchBox = ({ searchForm, jwtToken, onSearchComplete }) => {
  const [optionsData, setOptionsData] = useState({
    eventNms: [],
    sgmtNames: [],
    eventTypes: [],
  });

  const [selectedValues, setSelectedValues] = useState({
    eventNm: "",
    sgmtName: "",
    eventTyp: "",
  });

  const fetchDataBasedOnKey = async (key, value) => {
    try {
      const eventTypValue = selectedValues.eventTyp;
      const baseEndpoint = `http://localhost:7777/api/cxbd/v1/ui/events-mgmt/retrieve`;

      const params = {};

      switch (key) {
        case "eventNm": {
          params.eventNm = value;
          const { data: eventNmResponse } = await axios.get(baseEndpoint, {
            params: params,
            headers: {
              Authorization: `Bearer ${jwtToken}`
            }
          });
          console.log(eventNmResponse)
          setOptionsData(prev => ({
            ...prev,
            segmentIds: eventNmResponse.content.map(segment => ({ label: segment.name, id: segment.id }))
          }));
          break;
        }

        case "sgmtRecId": {
          params.segment = value;
          if (eventTypValue) {
            params.eventTyp = eventTypValue;
          }
          const { data: sgmtRecIdResponse } = await axios.get(baseEndpoint, {
            params: params,
            headers: {
              Authorization: `Bearer ${jwtToken}`
            }
          });
          setOptionsData(prev => ({
            ...prev,
            eventNames: sgmtRecIdResponse.content.map(event => ({ label: event.name, id: event.id }))
          }));
          break;
        }

        default:
           break;
      }
    } catch (error) {
      console.error(`${key}를 기반으로 데이터를 가져오는 중 오류 발생:`, error);
    }
  };


  useEffect(() => {
    if (selectedValues.eventNm) {
      fetchDataBasedOnKey("eventNm", selectedValues.eventNm);
    }
  }, [selectedValues.eventNm]);

  useEffect(() => {
    if (selectedValues.sgmtRecId) {
      fetchDataBasedOnKey("sgmtRecId", selectedValues.sgmtRecId);
    }
  }, [selectedValues.sgmtRecId]);

  useEffect(() => {
    if (selectedValues.eventTyp) {
      fetchDataBasedOnKey("eventTyp", selectedValues.eventTyp);
    }
  }, [selectedValues.eventTyp]);


  const handleChange = (key, newValue) => {
    setSelectedValues(prev => ({ ...prev, [key]: newValue }));
    fetchDataBasedOnKey(key, newValue);
  };

  const createSearchForm = () => {
    return (
      <Grid container spacing={1} m={4}>
        {searchForm.map((form) => {
          if (form.hide) return null;

          let selectedValue;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={form.key}>
              <Autocomplete
                disableClearable
                options={form.options}
                value={selectedValue}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, newValue) => handleChange(form.key, newValue)}
                size="small"
                style={{ width: '90%' }}
                renderInput={(params) => (
                  <MDInput {...params} variant="standard" label={form.label} InputLabelProps={{ shrink: true }} />
                )}
                disabled={form.isDisabled}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MDButton
            variant="outlined"
            color="info"
            size="small"
            onClick={searchBtn}
          >
            조회
          </MDButton>
        </Grid>
      </Grid>
    );
  };

  const searchBtn = async () => {
    try {
      const endpoint = 'http://localhost:7777/api/cxbd/v1/ui/events-mgmt/retrieve';
      const { data: response } = await axios.get(endpoint, {
        params: selectedValues,
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      onSearchComplete(response.content);
    } catch (error) {
      console.error('이벤트 검색 중 오류 발생:', error);
    }
  };

  return (
    <Card>
      <MDBox mt={1} pr={4}>
        {createSearchForm()}
      </MDBox>
    </Card>
  );
};

export default SearchBox;
