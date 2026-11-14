import { type RouteConfig, index, route } from "@react-router/dev/routes";

// One line per cipher page. The page itself lives in app/ciphers/<slug>/route.tsx.
export default [
  index("routes/home.tsx"),
  route("ciphers/enigma", "ciphers/enigma/route.tsx"),
] satisfies RouteConfig;
