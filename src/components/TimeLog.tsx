import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { getDailyUsage } from "../api/api";
import { sec2hour } from "../utils/utils";

import "../styles/TimeLog.css";

const FOUR_HOURS = 4 * 60 * 60;
const WALLET_PER_HOUR = 1;

interface IProps {
  handleFlip: (e: React.MouseEvent) => void;
}
const TimeLog: React.FC<IProps> = ({ handleFlip }) => {
  const [logs, setLogs] = useState([]);
  /* const [logs, setLogs] = useState([
     {
       login: 'ohjongin',
       date: '2021-10-01',
       seconds: '1125435'
     },
     {
       login: 'ohjongin',
       date: '2021-10-02',
       seconds: '176'
     },
     {
       login: 'ohjongin',
       date: '2021-11-03',
       seconds: '300'
     },
     {
       login: 'ohjongin',
       date: '2021-10-04',
       seconds: '1125435'
     },
     {
       login: 'ohjongin',
       date: '2021-10-05',
       seconds: '176'
     },
     {
       login: 'ohjongin',
       date: '2021-11-06',
       seconds: '300'
     },
     {
       login: 'ohjongin',
       date: '2021-10-07',
       seconds: '1125435'
     },
     {
       login: 'ohjongin',
       date: '2021-10-08',
       seconds: '176'
     },
     {
       login: 'ohjongin',
       date: '2021-11-09',
       seconds: '300'
     },
     {
       login: 'ohjongin',
       date: '2021-10-10',
       seconds: '1125435'
     },
     {
       login: 'ohjongin',
       date: '2021-10-11',
       seconds: '176'
     },
     {
       login: 'ohjongin',
       date: '2021-11-12',
       seconds: '300'
     },
     {
       login: 'ohjongin',
       date: '2021-10-13',
       seconds: '1125435'
     },
     {
       login: 'ohjongin',
       date: '2021-10-14',
       seconds: '176'
     },
     {
       login: 'ohjongin',
       date: '2021-11-15',
       seconds: '300'
     },
     {
       login: 'ohjongin',
       date: '2021-10-16',
       seconds: '1125435'
     },
     {
       login: 'ohjongin',
       date: '2021-10-17',
       seconds: '176'
     },
     {
       login: 'ohjongin',
       date: '2021-11-18',
       seconds: '300'
     },
     {
       login: 'ohjongin',
       date: '2021-10-19',
       seconds: '1125435'
     },
     {
       login: 'ohjongin',
       date: '2021-10-20',
       seconds: '176'
     },
     {
       login: 'ohjongin',
       date: '2021-11-21',
       seconds: '300'
     },
     {
       login: 'ohjongin',
       date: '2021-10-22',
       seconds: '1125435'
     },
     {
       login: 'ohjongin',
       date: '2021-10-23',
       seconds: '176'
     },
     {
       login: 'ohjongin',
       date: '2021-11-24',
       seconds: '300'
     }
   ]); */

  const [count, setCount] = useState(0);

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
        const wallet =
          // TODO: seconds 타입
          logData.filter(({ seconds }: { seconds: string }) => +seconds >= FOUR_HOURS).length *
          WALLET_PER_HOUR;
        setCount(wallet);
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
  }, []);

  return (
    <div id='time-log-wrapper'>
      <div style={{ textAlign: "right", width: "100%" }}>
        <AccountBoxIcon onClick={handleFlip} />
      </div>
      <h4 style={{ margin: "0 auto" }}>CLUSTER LOG</h4>
      <div style={{ width: "100%", textAlign: "right", marginBottom: "1rem" }}>ALL: {count}₳</div>
      <li className='log-data'>
        <div>DATE</div>
        <div>TIME</div>
        <div>WALLET</div>
      </li>
      <hr className='divider' />
      <ul id='log-data-wrapper'>
        {logs.map(({ date, seconds }, idx) => (
          // TODO: change key
          <div key={idx.toString()}>
            <li className='log-data'>
              <time dateTime={date}>{date}</time>
              <div>{sec2hour(+seconds)}</div>
              <div>{+seconds >= FOUR_HOURS && `${WALLET_PER_HOUR}₳`}</div>
            </li>
            <hr className='divider' />
          </div>
        ))}
      </ul>
    </div>
  );
};
export default TimeLog;
