import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// civic auth config
const withCivicAuth = createCivicAuthPlugin({
  clientId: "YOUR CLIENT ID"
});

export default withCivicAuth(nextConfig)