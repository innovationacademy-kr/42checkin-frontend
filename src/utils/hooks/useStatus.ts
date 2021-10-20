import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/modules";
import { setHeadCount as sHC } from "../../redux/modules/status";

const useStatus = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.statusReducer);

  const setHeadCount = useCallback(
    (param: Status) => {
      dispatch(sHC(param));
    },
    [dispatch],
  );

  return { status, setHeadCount };
};

export default useStatus;
