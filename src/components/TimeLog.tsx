import AccountBoxIcon from "@mui/icons-material/AccountBox";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { getDailyUsage } from "../api/api";
import classes from "../styles/TimeLog.module.css";

// const FOUR_HOURS = 4 * 60 * 60;
// const WALLET_PER_HOUR = 1;

interface IProps {
  handleFlip: (e: React.MouseEvent) => void;
}

const TimeLog: React.FC<IProps> = ({ handleFlip }) => {
  const [logs, setLogs] = useState<Usage[]>([]);
  // const [count, setCount] = useState(0);

  const getLogs = async () => {
    try {
      const today = new Date();
      const from = moment(new Date(today.getFullYear(), today.getMonth(), 1))
        .tz("Asia/Seoul")
        .format("YYYY-MM-DD HH:mm:ss");
      const to = moment(new Date(today.getFullYear(), today.getMonth() + 1, 1))
        .tz("Asia/Seoul")
        .format("YYYY-MM-DD HH:mm:ss");

      const response = await getDailyUsage(from, to);
      if (response.data.list) {
        const logData = response.data.list;
        // const wallet =
        //   logData.filter(({ seconds }: { seconds: string }) => +seconds >= FOUR_HOURS).length *
        //   WALLET_PER_HOUR;
        // setCount(wallet);
        setLogs(logData.reverse());
      }
      // const wallet = logs.filter(({ seconds }) => +seconds > FOUR_HOURS).length;
      // setCount(wallet);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLogs();
    return () => {
      // setCount(0);
      setLogs([]);
    };
  }, []);

  return (
    <div className={classes["time-log-wrapper"]}>
      <div className={classes["util-box"]}>
        <AccountBoxIcon onClick={handleFlip} />
      </div>
      <h4 className={classes["time-log-title"]}>CLUSTER LOG</h4>
      {/* <div className={classes["time-log-all-count"]}>ALL: {count}₳</div> */}
      <li className={classes["log-data"]}>
        <div>DATE</div>
        <div>TIME</div>
        {/* <div>WALLET</div> */}
      </li>
      <hr className={classes.divider} />
      <ul className={classes["log-data-wrapper"]}>
        {logs.map(({ date, seconds }, idx) => (
          // TODO: change key
          <div key={idx.toString()}>
            <li className={classes["log-data"]}>
              <time dateTime={date}>{date}</time>
              <div>{moment.utc(+seconds * 1000).format("HH:mm:ss")}</div>
              {/* <div>{+seconds >= FOUR_HOURS && `${WALLET_PER_HOUR}₳`}</div> */}
            </li>
            <hr className={classes.divider} />
          </div>
        ))}
      </ul>
    </div>
  );
};
export default TimeLog;
