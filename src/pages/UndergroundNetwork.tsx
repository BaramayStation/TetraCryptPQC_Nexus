
import React from "react";
import { Helmet } from "react-helmet";
import UndergroundNetworkDashboard from "@/components/military/UndergroundNetworkDashboard";

const UndergroundNetworkPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>TetraCryptPQC - Underground Military Network</title>
      </Helmet>
      <UndergroundNetworkDashboard />
    </>
  );
};

export default UndergroundNetworkPage;
