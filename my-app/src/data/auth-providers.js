import React from "react";

import { Apple as AppleIcon } from "mdi-material-ui";
import { Facebook as FacebookIcon } from "mdi-material-ui";
import { Github as GitHubIcon } from "mdi-material-ui";
import { Google as GoogleIcon } from "mdi-material-ui";
import { Microsoft as MicrosoftIcon } from "mdi-material-ui";
import { Twitter as TwitterIcon } from "mdi-material-ui";
import { Yahoo as YahooIcon } from "mdi-material-ui";

const authProviders = [

  {
    id: "github.com",
    color: "#24292e",
    icon: <GitHubIcon />,
    name: "GitHub",
    scopes: ["repo"],
  },
  {
    id: "google.com",
    color: "#ea4335",
    icon: <GoogleIcon />,
    name: "Google",
  },

];

export default authProviders;
