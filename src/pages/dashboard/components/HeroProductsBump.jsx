import { ResponsiveAreaBump } from "@nivo/bump"
import PropTypes from "prop-types"

const HeroProductsBump = ({ data }) => (
  <div className="w-[95%] h-96 pb-8">
    <h1 className="font-dmSans font-bold text-3xl">Estimacion de produccion (por operador)</h1>
    <ResponsiveAreaBump
      data={data}
      margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
      spacing={8}
      colors={{ scheme: "nivo" }}
      blendMode="normal"
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
          color: "red",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      startLabel="id"
      endLabel="id"
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -36,
        truncateTickAt: 0,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      theme={{
        legends: {
          text: {
            fontSize: 14,
            fill: "white",
          },
        },
        labels: {
          text: {
            fontWeight: "bold",
            fontSize: 14,
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
      tooltip={({ serie }) => (
        <div
          style={{
            background: "#222",
            padding: "10px",
          }}
        >
          <div>
            <strong>{serie.id}</strong>
          </div>
        </div>
      )}
    />
  </div>
)

HeroProductsBump.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default HeroProductsBump
