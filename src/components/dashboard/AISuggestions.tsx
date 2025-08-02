"use client";

import { useEffect, useState } from "react";
import { getReviewSuggestions } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Loader2, Lightbulb } from "lucide-react";

interface AISuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export function AISuggestions({ onSelect }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviewSuggestions()
      .then((sugs) => {
        if(sugs) setSuggestions(sugs);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 rounded-lg bg-accent/20 border border-accent/30">
        <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-accent" />
            <h4 className="font-semibold text-foreground">Need some inspiration?</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Click a suggestion to add it to your comments.</p>
        {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating AI suggestions...</span>
            </div>
        ) : (
            <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                    <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer bg-card hover:bg-accent/50 transition-colors"
                        onClick={() => onSelect(suggestion)}
                    >
                        {suggestion}
                    </Badge>
                ))}
            </div>
        )}
    </div>
  );
}
