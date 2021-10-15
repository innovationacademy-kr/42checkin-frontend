import { Doughnut } from "react-chartjs-2";
import React, { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../redux/configureStore";

const StatusChart = () => {
  const { maxGaepo, maxSeocho } = useSelector(
    (state) => ({
      maxGaepo: state.config.gaepo,
      maxSeocho: state.config.seocho,
    }),
    shallowEqual,
  );

  const { gaepo, seocho } = useSelector((state) => ({
    gaepo: state.status.gaepo,
    seocho: state.status.seocho,
  }));

  const gaepoData = {
    datasets: [
      {
        data: [gaepo, maxGaepo - gaepo],
        borderWidth: 1,
        hoverBorderWidth: 3,
        backgroundColor: ["rgba(83, 227, 173, 1)", "rgba(83, 227, 173, 0.3)"],
        fill: true,
      },
    ],
  };

  const seochoData = {
    datasets: [
      {
        data: [seocho, maxSeocho - seocho],
        borderWidth: 1,
        hoverBorderWidth: 3,
        backgroundColor: ["rgba(109, 219, 226, 1)", "rgba(109, 219, 226, 0.3)"],
        fill: true,
      },
    ],
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Doughnut
          options={{
            legend: {
              display: true,
              position: "right",
            },
            animation: false,
            cutout: "70%",
            centertext: "123",
          }}
          data={gaepoData}
          height='30%'
        />
      </div>
      <div>
        <Doughnut
          options={{
            legend: {
              display: true,
              position: "right",
            },
            animation: false,
            cutout: "70%",
          }}
          data={seochoData}
          height='30%'
        />
      </div>
    </div>
  );
};
export default StatusChart;
