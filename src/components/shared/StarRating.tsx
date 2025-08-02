"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  count?: number;
  value: number;
  onChange: (rating: number) => void;
  size?: number;
  className?: string;
}

export function StarRating({
  count = 5,
  value,
  onChange,
  size = 24,
  className,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const stars = Array.from({ length: count }, (_, i) => i + 1);

  const handleClick = (rating: number) => {
    onChange(rating);
  };

  const handleMouseEnter = (rating: number) => {
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {stars.map((rating) => (
        <Star
          key={rating}
          size={size}
          className={cn(
            "cursor-pointer transition-colors text-muted-foreground/50",
            (hoverValue || value) >= rating && "text-accent"
          )}
          onClick={() => handleClick(rating)}
          onMouseEnter={() => handleMouseEnter(rating)}
          onMouseLeave={handleMouseLeave}
          fill={ (hoverValue || value) >= rating ? "currentColor" : "transparent"}
        />
      ))}
    </div>
  );
}
