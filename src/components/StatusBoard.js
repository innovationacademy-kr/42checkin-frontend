import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMaxCapacity, getUsingCard } from '../api/api';

const StatusBoard = () => {
  const [headCount, setHeadCount] = useState({
    gaepo: 0,
    seocho: 0,
    maxCapacity: 0
  });

  const getHeadCount = async () => {
    try {
      const resMaxCapacity = getMaxCapacity();
      try {
        const resUsingCard = getUsingCard();
        setHeadCount({
          gaepo: resUsingCard.data.gaepo,
          seocho: resUsingCard.data.seocho,
          maxCapacity: resMaxCapacity.data.maxCapacity
        });
      } catch (err) {
        console.log(err);
      }
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
