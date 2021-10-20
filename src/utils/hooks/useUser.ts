import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/modules";
import {
  login as lg,
  logout as lgo,
  setCardNum as sCN,
  setUser as sU,
} from "../../redux/modules/user";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer);

  const login = useCallback(() => {
    dispatch(lg());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(lgo());
  }, [dispatch]);

  const setUser = useCallback(
    (param: User) => {
      dispatch(sU(param));
    },
    [dispatch],
  );

  const setCardNum = useCallback(
    ({ cardNum }: { cardNum: string }) => {
      dispatch(sCN({ cardNum }));
    },
    [dispatch],
  );

  return { user, login, logout, setCardNum, setUser };
};

export default useUser;
