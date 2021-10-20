import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/modules";
import { setConfig as sC } from "../../redux/modules/config";

const useConfig = () => {
  const dispatch = useDispatch();
  const config = useSelector((state: RootState) => state.configReducer);

  const setConfig = useCallback(
    (param: Config) => {
      dispatch(sC(param));
    },
    [dispatch],
  );

  return { config, setConfig };
};

export default useConfig;
