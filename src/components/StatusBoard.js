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
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <h3>개포</h3>
      <h3>
        {gaepo} / {maxGaepo}
      </h3>
      <h3>서초</h3>
      <h3>
        {seocho} / {maxSeocho}
      </h3>
    </div>
  );
};

export default StatusBoard;
