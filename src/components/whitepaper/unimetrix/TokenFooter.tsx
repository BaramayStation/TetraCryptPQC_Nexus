
import React from "react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const TokenFooter = () => {
  return (
    <CardFooter className="border-t flex justify-between bg-muted/20 px-6">
      <div className="flex items-center text-xs text-muted-foreground">
        <Globe className="h-3.5 w-3.5 mr-1" />
        <span>Interstellar Finance Protocol</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-xs" asChild>
          <Link to="/documentation">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Technical Details
          </Link>
        </Button>
        <Button size="sm" className="text-xs">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          Join Token Ecosystem
        </Button>
      </div>
    </CardFooter>
  );
};

export default TokenFooter;
