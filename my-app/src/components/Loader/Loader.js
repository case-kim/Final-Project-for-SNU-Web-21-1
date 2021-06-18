import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
});

function Loader({message}) {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <h1>{message}</h1>
      <CircularProgress />
    </div>
  );
}

export default Loader;
