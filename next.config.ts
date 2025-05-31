import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// civic auth config
const withCivicAuth = createCivicAuthPlugin({
  clientId: "f3465579-401a-4d88-825d-225446db439e" // Civic's client ID
});

export default withCivicAuth(nextConfig)