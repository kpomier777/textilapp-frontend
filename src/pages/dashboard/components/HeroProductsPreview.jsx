import { ResponsiveLine } from "@nivo/line"
import PropTypes from "prop-types"

const HeroProductsPreview = ({ data }) => (
  <div className="w-full h-96 py-8 px-8 shadow-lg bg-black/30 rounded-3xl">
    <h1 className="font-dmSans font-bold text-3xl">Resumen Producción</h1>
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      colors={{
        scheme: "green_blue",
      }}
      theme={{
        axis: {
          legend: {
            text: {
              fill: "#b2d563",
            },
          },
        },
        crosshair: {
          line: {
            stroke: "#b2d563",
            strokeOpacity: 1,
          },
        },
        grid: {
          line: {
            stroke: "#7D8D96",
          },
        },
        tooltip: {
          container: {
            background: "#253541",
          },
        },
        text: {
          fill: "#fff",
        },
      }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          itemTextColor: "white",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </div>
)

HeroProductsPreview.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default HeroProductsPreview
