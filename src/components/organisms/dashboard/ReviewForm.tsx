"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { StarRating } from "@/components/atoms/StarRating";
import { GuidanceTooltip } from "@/components/molecules/dashboard/GuidanceTooltip";
import { AISuggestions } from "@/components/molecules/dashboard/AISuggestions";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const reviewFormSchema = z.object({
  waitTime: z.number().min(0).max(60),
  serviceQuality: z.number().min(1).max(5, { message: "Silakan pilih peringkat." }),
  medicationAvailability: z.enum(["in_stock", "out_of_stock", "not_applicable"], {
    required_error: "Anda harus memilih status ketersediaan obat.",
  }),
  staffFriendliness: z.number().min(1).max(5, { message: "Silakan pilih peringkat." }),
  comments: z.string().max(500, "Komentar maksimal 500 karakter.").optional(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const defaultValues: Partial<ReviewFormValues> = {
  waitTime: 15,
  comments: "",
};

export default function ReviewForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ReviewFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        toast({
            title: "Ulasan Terkirim!",
            description: "Terima kasih atas umpan balik Anda yang berharga.",
        });
        form.reset();
        setIsSubmitting(false);
    }, 1500);
  }

  const handleSuggestionSelect = (suggestion: string) => {
    const currentComments = form.getValues("comments") || "";
    const newComments = currentComments ? `${currentComments}\n- ${suggestion}` : `- ${suggestion}`;
    form.setValue("comments", newComments, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                 <FormField
                    control={form.control}
                    name="serviceQuality"
                    render={({ field }) => (
                        <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                            <FormLabel>Kualitas Pelayanan</FormLabel>
                            <GuidanceTooltip aspect="kualitas pelayanan" />
                        </div>
                        <FormControl>
                           <StarRating value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />

                 <FormField
                    control={form.control}
                    name="staffFriendliness"
                    render={({ field }) => (
                        <FormItem>
                         <div className="flex items-center gap-2 mb-2">
                            <FormLabel>Keramahan Staf</FormLabel>
                            <GuidanceTooltip aspect="keramahan staf" />
                         </div>
                        <FormControl>
                            <StarRating value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />

                <FormField
                    control={form.control}
                    name="waitTime"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-2 mb-2">
                                <FormLabel>Waktu Tunggu</FormLabel>
                                <GuidanceTooltip aspect="waktu tunggu" />
                            </div>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                <Slider
                                    min={0}
                                    max={60}
                                    step={5}
                                    value={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                />
                                <span className="font-semibold text-primary w-24 text-right">
                                    {field.value}+ menit
                                </span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="medicationAvailability"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <div className="flex items-center gap-2">
                                <FormLabel>Ketersediaan Obat</FormLabel>
                                <GuidanceTooltip aspect="ketersediaan obat" />
                            </div>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                            >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="in_stock" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Semuanya tersedia
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="out_of_stock" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Beberapa item habis
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="not_applicable" />
                                </FormControl>
                                <FormLabel className="font-normal">Tidak Berlaku</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-6">
                <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                        <FormItem>
                         <div className="flex items-center gap-2 mb-2">
                             <FormLabel>Komentar Tambahan</FormLabel>
                             <GuidanceTooltip aspect="umpan balik umum" />
                         </div>
                        <FormControl>
                            <Textarea
                            placeholder="Ceritakan lebih banyak tentang pengalaman Anda..."
                            className="resize-none min-h-[150px]"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <AISuggestions onSelect={handleSuggestionSelect} />
            </div>
        </div>
        
        <Separator />

        <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Kirim Ulasan
            </Button>
        </div>
      </form>
    </Form>
  );
}
