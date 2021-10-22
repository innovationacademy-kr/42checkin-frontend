import { makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";
import useConfig from "../utils/hooks/useConfig";

const useStyles = makeStyles(() => ({
  info: {
    background: "rgba(0, 0, 0, 0.5)",
    "& span": {
      fontSize: "0.6rem",
    },
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bolder",
    fontFamily: "D2Coding",
  },
}));

const Notice: React.FC = () => {
  const classes = useStyles();
  const {
    config: { openAt, closeAt },
  } = useConfig();
  return (
    <Alert severity='info' variant='filled' className={classes.info}>
      <AlertTitle className={classes.title}>
        운영 시간: {openAt} ~ {closeAt}
      </AlertTitle>
      <span>※ 사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
    </Alert>
  );
};

export default Notice;
