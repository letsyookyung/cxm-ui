import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
// import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDTypography from "components_carrot/MDTypography";

// PieChart configurations
import configs from "examples/Charts/PieChart/configs";

// Nivo Chart
import { ResponsivePie } from "@nivo/pie";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ icon, title, description, height, chart }) {
  // const { data, options } = configs(chart.labels || [], chart.datasets || {});


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


  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "dark"}
              variant="gradient"
              coloredShadow={icon.color || "dark"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && <MDTypography variant="h6">{title}</MDTypography>}
            <MDBox mb={2}>
              <MDTypography component="div" variant="button" color="text">
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox height={height}>
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
                // defs={[
                //   {
                //     id: 'dots',
                //     type: 'patternDots',
                //     background: 'inherit',
                //     color: 'rgba(255, 255, 255, 0.3)',
                //     size: 4,
                //     padding: 1,
                //     stagger: true
                //   },
                //   {
                //     id: 'lines',
                //     type: 'patternLines',
                //     background: 'inherit',
                //     color: 'rgba(255, 255, 255, 0.3)',
                //     rotation: -45,
                //     lineWidth: 6,
                //     spacing: 10
                //   }
                // ]}
                // fill={[
                //   {
                //     match: {
                //       id: 'ruby'
                //     },
                //     id: 'dots'
                //   },
                //   {
                //     match: {
                //       id: 'c'
                //     },
                //     id: 'dots'
                //   },
                //   {
                //     match: {
                //       id: 'go'
                //     },
                //     id: 'dots'
                //   },
                //   {
                //     match: {
                //       id: 'python'
                //     },
                //     id: 'dots'
                //   },
                //   {
                //     match: {
                //       id: 'scala'
                //     },
                //     id: 'lines'
                //   },
                //   {
                //     match: {
                //       id: 'lisp'
                //     },
                //     id: 'lines'
                //   },
                //   {
                //     match: {
                //       id: 'elixir'
                //     },
                //     id: 'lines'
                //   },
                //   {
                //     match: {
                //       id: 'javascript'
                //     },
                //     id: 'lines'
                //   }
                // ]}
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
          </MDBox>
        ),
        [chart, height]
      )}
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of DoughnutChart
DoughnutChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the DoughnutChart
DoughnutChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default DoughnutChart;
