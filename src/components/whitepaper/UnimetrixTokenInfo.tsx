
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TokenHeader from "./unimetrix/TokenHeader";
import TokenFooter from "./unimetrix/TokenFooter";
import TokenTabs from "./unimetrix/TokenTabs";

const UnimetrixTokenInfo = () => {
  return (
    <Card className="overflow-hidden">
      <TokenHeader />
      
      <CardContent className="pt-6">
        <TokenTabs />
      </CardContent>
      
      <TokenFooter />
    </Card>
  );
};

export default UnimetrixTokenInfo;
