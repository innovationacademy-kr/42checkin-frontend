import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/modules";
import { setConfig as sC, setCurrentUserCount as sCUC } from "../../redux/modules/config";

const useConfig = () => {
  const dispatch = useDispatch();
  const config = useSelector((state: RootState) => state.configReducer);

  const setConfig = useCallback(
    (param: Config) => {
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

  return { config, setConfig, setCurrentUserCount };
};

export default useConfig;
