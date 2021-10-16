import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  homeBtn: {
    color: "black",
    background: "white",
    fontFamily: "Futura",
    border: "none",
    "&:hover": {
      background: "white",
    },
  },
});

function NotFoundPage() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <h1>404 Not Found</h1>
      <Button className={classes.homeBtn} variant='outlined' onClick={handleClick}>
        Go Home
      </Button>
    </div>
  );
}

export default NotFoundPage;
