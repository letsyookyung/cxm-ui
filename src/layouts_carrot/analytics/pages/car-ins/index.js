import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
// import MDTypography from "components_carrot/MDTypography";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";

// Nivo Chart
import { ResponsivePie } from "@nivo/pie";

import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";

import SearchBox from "./SearchBox";
import RegionChart from "./chart/RegionChart";
import AgeChart from "./chart/AgeChart";
import AffiliateChart from "./chart/AffiliateChart";



const apiURL = "/ui/cs/customer";

const CarIns = () => {

  const searchDataInit = {
    sd: null,
    aggb: null,
    afccdNm: null,
  };

  const [sdArray, setSdArray] = useState([]);
  const [aggbArray, setAggbArray] = useState([]);
  const [afccdNmArray, setAfccdNmArray] = useState([]);

  const searchForm = [
    {
      label: "시/도",
      key: "sd",
      type: "select",
      options: [{ label: "전체", id: null }, ...sdArray],
      defaultValue: "전체",
    },
    {
      label: "나이대",
      key: "aggb",
      type: "select",
      options: [{ label: "전체", id: null }, ...aggbArray],
      defaultValue: "전체",
    },
    {
      label: "제휴사코드명",
      key: "afccdNm",
      type: "select",
      options: [{ label: "전체", id: null }, ...afccdNmArray],
      defaultValue: "전체",
    },
  ];

  const [params, setParams] = useState({});

  const data = [
    {
      "id": "elixir",
      "label": "elixir",
      "value": 593,
      "color": "hsl(346, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 403,
      "color": "hsl(316, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 529,
      "color": "hsl(200, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 578,
      "color": "hsl(178, 70%, 50%)"
    },
    {
      "id": "ruby",
      "label": "ruby",
      "value": 549,
      "color": "hsl(275, 70%, 50%)"
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} lineHeight={1}>
        <SearchBox
          searchDataInit={searchDataInit}
          searchForm={searchForm}
          setParams={setParams}
        />
        <MDBox p={3}>
          {/* <MDTypography variant="h5" fontWeight="medium">
            </MDTypography> */}
        </MDBox>

        {/* chart */}
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} container spacing={3}>
              <Grid item xs={12} md={12}>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <RegionChart
                      params={params}
                      setSdArray={setSdArray}
                    />
                  </Suspense>
                </AppErrorBoundary>
              </Grid>
              <Grid item xs={12} md={12}>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <AgeChart
                      params={params}
                      setAggbArray={setAggbArray}
                    />
                  </Suspense>
                </AppErrorBoundary>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} >
              <AppErrorBoundary>
                <Suspense fallback={<AppSkeleton />}>
                  <AffiliateChart
                    params={params}
                    setAfccdNmArray={setAfccdNmArray}
                  />
                </Suspense>
              </AppErrorBoundary>
            </Grid>
          </Grid>
          {/* {
            render: () => <Pie {...commonProperties} 
            innerRadius={0.8}
             enableArcLabels={false} 
             arcLinkLabel={d => `${d.id} (${d.formattedValue})`} 
             activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset} 
             layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]} />
          } */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MDBox height="50rem">
                {/* mdbox */}
              <div>
                <span>5</span>
                <span >total components</span>
              </div>
              <ResponsivePie
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends']}
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                  from: 'color',
                  modifiers: [
                    [
                      'darker',
                      0.2
                    ]
                  ]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: 'color',
                  modifiers: [
                    [
                      'darker',
                      2
                    ]
                  ]
                }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  }
                ]}
                fill={[
                  {
                    match: {
                      id: 'ruby'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'c'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'go'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'python'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'scala'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'lisp'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'elixir'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'javascript'
                    },
                    id: 'lines'
                  }
                ]}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000'
                        }
                      }
                    ]
                  }
                ]}
              />
              <div>
                <span>5</span>
                <span >total components</span>
              </div>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CarIns;
