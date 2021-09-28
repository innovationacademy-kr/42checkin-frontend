import { useEffect, useState } from 'react';
import { getMaxCapacity, getUsingCard } from '../api/api';

const StatusBoard = () => {
  const [headCount, setHeadCount] = useState({
    gaepo: 0,
    seocho: 0,
    maxCapGaepo: 0,
    maxCapSeocho: 0
  });

  const getHeadCount = async () => {
    try {
      const today = new Date();
      const resMaxCapacity = await getMaxCapacity(today.toISOString().slice(0, 10));
      try {
        const resUsingCard = await getUsingCard();
        setHeadCount({
          gaepo: resUsingCard.data.gaepo,
          seocho: resUsingCard.data.seocho,
          maxCapGaepo: resMaxCapacity.data.gaepo,
          maxCapSeocho: resMaxCapacity.data.seocho,
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
    return () => {
      setHeadCount({});
    };
  }, []);

  return (
    <div>
      <h3>
        개포 인원 : {headCount.gaepo} / {headCount.maxCapGaepo}
      </h3>
      <h3>
        서초 인원 : {headCount.seocho} / {headCount.maxCapSeocho}
      </h3>
    </div>
  );
};

export default StatusBoard;
