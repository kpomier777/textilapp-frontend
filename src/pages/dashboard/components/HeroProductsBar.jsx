import { ResponsiveBar } from "@nivo/bar"
import PropTypes from "prop-types"

const HeroProductsBar = ({ data }) => (
  <div className="w-[95%] h-96 pb-8 mt-10">
    <h1 className="font-dmSans font-bold text-3xl">
      Estimacion de usabilidad (Kilos)
    </h1>
    <ResponsiveBar
      data={data}
      keys={["Devanado", "Ovillado", "Tintoreria"]}
      indexBy="mes"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Meses",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Kilos",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`
      }
      theme={{
        labels: {
          text: {
            fontSize: 12,
            fill: "#ff0000",
          },
        },
        legends: {
          text: {
            fontSize: 14,
            fill: "white",
          },
        },
        axis: {
          legend: {
            text: {
              fontSize: 14,
              fill: "#b2d563",
            },
          },
          ticks: {
            text: {
              fill: "white",
            },
          },
        },
      }}
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: 12,
            color,
            background: "#222",
          }}
        >
          <strong>
            {id}: {value}
          </strong>
        </div>
      )}
    />
  </div>
)

HeroProductsBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default HeroProductsBar
