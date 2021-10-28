import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/modules";
import { setCluster as sC, setCurrentUserCount as sCUC } from "../../redux/modules/cluster";

const useCluster = () => {
  const dispatch = useDispatch();
  const cluster = useSelector((state: RootState) => state.clusterReducer);

  const setCluster = useCallback(
    (param: Cluster) => {
      dispatch(sC(param));
    },
    [dispatch],
  );
  const setCurrentUserCount = useCallback(
    ({ gaepo, seocho }: { gaepo: number; seocho: number }) => {
      dispatch(sCUC({ gaepo, seocho }));
    },
    [dispatch],
  );

  return { cluster, setCluster, setCurrentUserCount };
};

export default useCluster;
