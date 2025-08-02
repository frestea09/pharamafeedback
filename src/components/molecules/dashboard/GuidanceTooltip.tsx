"use client";

import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getReviewGuidance } from "@/lib/actions";
import { Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuidanceTooltipProps {
  aspect: string;
  className?: string;
}

export function GuidanceTooltip({ aspect, className }: GuidanceTooltipProps) {
  const [guidance, setGuidance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGuidance() {
      setIsLoading(true);
      const result = await getReviewGuidance(aspect);
      setGuidance(result);
      setIsLoading(false);
    }
    fetchGuidance();
  }, [aspect]);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn("cursor-help", className)}>
            <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs" side="top">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>Memuat panduan...</p>
            </div>
          ) : (
            <p>{guidance}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
