import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/modules";
<<<<<<< HEAD
import { setCluster as sC, setCurrentUserCount as sCUC } from "../../redux/modules/cluster";
=======
import { setConfig as sC, setCurrentUserCount as sCUC } from "../../redux/modules/cluster";
>>>>>>> d7450ad (CHKN-146 Config리듀서 이름 변경)

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
