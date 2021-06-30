import { useEffect, useState } from 'react';
import axios from 'axios';

const StatusBoard = () => {
  const [headCount, setHeadCount] = useState({
    gaepo: 0,
    seocho: 0,
    maxCapacity: 0
  });

  const getHeadCount = async () => {
    try {
      const response = await axios.get('https://api.checkin.42seoul.io/config');
      setHeadCount({
        gaepo: response.data.gaepo,
        seocho: response.data.seocho,
        maxCapacity: response.data.maxCapacity
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHeadCount();
  }, []);

  return (
    <div>
      <h3>
        개포 인원 : {headCount.gaepo} / {headCount.maxCapacity}
      </h3>
      <h3>
        서초 인원 : {headCount.seocho} / {headCount.maxCapacity}
      </h3>
    </div>
  );
};

export default StatusBoard;
