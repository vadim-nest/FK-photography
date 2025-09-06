import vikeReact from "vike-react/config";

export default {
  extends: vikeReact, // 👈 wires React render hooks
  prerender: true, // 👈 SSG
  passToClient: ["nav"],
};
