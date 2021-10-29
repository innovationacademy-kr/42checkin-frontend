import { makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import useCluster from "../utils/hooks/useCluster";

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

const formatTime = ({ openAt, closeAt }: Pick<Cluster, "closeAt" | "openAt">) => {
  if (openAt === null && closeAt === null) return `운영 시간:00:00 ~ 24:00`;
  if (openAt === null || closeAt === null) return ``;
  return `운영 시간: ${openAt.slice(0, 5)} ~ ${closeAt.slice(0, 5)}`;
};

const Notice: React.FC = () => {
  const classes = useStyles();
  const {
    cluster: { openAt, closeAt },
  } = useCluster();
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(formatTime({ openAt, closeAt }));
  }, [closeAt, openAt]);
  return (
    <>
      {time && (
        <Alert severity='info' variant='filled' className={classes.info}>
          <AlertTitle className={classes.title}>{time}</AlertTitle>
          <span>※ 사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
        </Alert>
      )}
    </>
  );
};

export default Notice;
