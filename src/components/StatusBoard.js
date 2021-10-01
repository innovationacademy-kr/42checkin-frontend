import { useSelector, shallowEqual } from 'react-redux';

const StatusBoard = () => {
  const { maxGaepo, maxSeocho } = useSelector(
    state => ({
      maxGaepo: state.config.gaepo,
      maxSeocho: state.config.seocho
    }),
    shallowEqual
  );

  const { gaepo, seocho } = useSelector(state => ({
    gaepo: state.status.gaepo,
    seocho: state.status.seocho
  }));

  return (
    <div>
      <h3>
        개포 인원 : {gaepo} / {maxGaepo}
      </h3>
      <h3>
        서초 인원 : {seocho} / {maxSeocho}
      </h3>
    </div>
  );
};

export default StatusBoard;
