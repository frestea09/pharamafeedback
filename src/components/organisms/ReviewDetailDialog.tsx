
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { StarRating } from "../atoms/StarRating";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ThumbsUp, ThumbsDown, HelpCircle, Rocket, Turtle, Smile, Clock } from "lucide-react";
import { UnitReview } from "@/lib/definitions";

interface ReviewDetailDialogProps {
  review: UnitReview | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const getSpeedBadge = (speed: string) => {
    switch (speed) {
      case 'slow':
        return <Badge variant="destructive" className="gap-1.5"><Turtle className="h-4 w-4" />Lambat</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="gap-1.5"><Clock className="h-4 w-4" />Sedang</Badge>;
      case 'fast':
        return <Badge variant="default" className="bg-green-500 gap-1.5"><Rocket className="h-4 w-4"/>Cepat</Badge>;
      default:
        return <Badge variant="outline">N/A</Badge>;
    }
};

const getCompletenessBadge = (status: string) => {
    switch(status) {
        case 'complete':
            return <Badge className="bg-green-500 gap-1.5"><ThumbsUp className="h-4 w-4" /> Lengkap</Badge>;
        case 'incomplete':
            return <Badge variant="destructive" className="gap-1.5"><ThumbsDown className="h-4 w-4" /> Tidak Lengkap</Badge>;
        default:
            return <Badge variant="secondary" className="gap-1.5"><HelpCircle className="h-4 w-4" /> Tidak Tahu</Badge>;
    }
};

const NewRatingDisplay = ({ value, positiveText, negativeText }: { value: string, positiveText: string, negativeText: string }) => {
    if (value === "positive") {
        return <div className="flex items-center gap-2 text-green-600"><ThumbsUp className="h-5 w-5" /> <span>{positiveText}</span></div>;
    }
    return <div className="flex items-center gap-2 text-red-600"><ThumbsDown className="h-5 w-5" /> <span>{negativeText}</span></div>;
};

export function ReviewDetailDialog({ review, isOpen, onOpenChange }: ReviewDetailDialogProps) {
  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail Ulasan</DialogTitle>
          <DialogDescription>
            Ulasan dari <strong>{review.user.name}</strong> untuk unit <strong>{review.unit}</strong> pada tanggal {format(new Date(review.date), "d MMMM yyyy", { locale: id })}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm">Kualitas Pelayanan</span>
                {review.serviceQualityNew ? (
                    <NewRatingDisplay value={review.serviceQualityNew} positiveText="Baik" negativeText="Buruk" />
                ) : (
                    <div className="flex items-center gap-2">
                        <StarRating value={review.serviceQuality} onChange={() => {}} size={20} />
                        <span className="text-muted-foreground">({review.serviceQuality}/5)</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm">Keramahan Staf</span>
                {review.staffFriendlinessNew ? (
                    <NewRatingDisplay value={review.staffFriendlinessNew} positiveText="Ramah" negativeText="Tidak Ramah" />
                ) : (
                    <div className="flex items-center gap-2">
                        <StarRating value={review.staffFriendliness} onChange={() => {}} size={20} />
                        <span className="text-muted-foreground">({review.staffFriendliness}/5)</span>
                    </div>
                )}
            </div>
          </div>
           <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm">Kecepatan Pelayanan</span>
                {getSpeedBadge(review.serviceSpeed)}
            </div>
             <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm">Kelengkapan</span>
                {getCompletenessBadge(review.rawCompleteness)}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Komentar Pengguna</h4>
            <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md border">
              {review.comments || "Tidak ada komentar."}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
