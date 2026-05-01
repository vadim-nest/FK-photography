// src/pages/+config.js (global)
import vikeReact from "vike-react/config";

export default {
  extends: vikeReact,
  prerender: true,
  passToClient: ["nav"],
};
