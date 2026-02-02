import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    turbopack: {}
};
// civic auth config
const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.CIVIC_CLIENT_ID as string, // Civic's client ID,
  basePath: "/",
});

export default withCivicAuth(nextConfig)