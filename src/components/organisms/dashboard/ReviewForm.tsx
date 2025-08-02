
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { StarRating } from "@/components/atoms/StarRating";
import { GuidanceTooltip } from "@/components/molecules/dashboard/GuidanceTooltip";
import { Separator } from "@/components/ui/separator";
import { Loader2, Smile, ThumbsUp, ThumbsDown, Clock, Rocket, Turtle, HelpCircle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AISuggestions } from "@/components/molecules/dashboard/AISuggestions";

const reviewFormSchema = z.object({
  serviceSpeed: z.enum(["fast", "medium", "slow"], {
    required_error: "Silakan pilih kecepatan layanan.",
  }),
  serviceQuality: z.number().min(1, { message: "Silakan pilih peringkat." }).max(5),
  serviceCompleteness: z.enum(["complete", "incomplete", "not_applicable"], {
    required_error: "Anda harus memilih status kelengkapan layanan.",
  }),
  staffFriendliness: z.number().min(1, { message: "Silakan pilih peringkat." }).max(5),
  comments: z.string().max(500, "Komentar maksimal 500 karakter.").optional(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const defaultValues: Partial<ReviewFormValues> = {
  comments: "",
  serviceQuality: 0,
  staffFriendliness: 0
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="space-y-8">
                 <FormField
                    control={form.control}
                    name="serviceQuality"
                    render={({ field }) => (
                        <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                            <Smile className="h-5 w-5 text-primary"/>
                            <FormLabel className="text-base">Kualitas Pelayanan</FormLabel>
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
                            <Smile className="h-5 w-5 text-primary"/>
                            <FormLabel className="text-base">Keramahan Staf</FormLabel>
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
                    name="serviceSpeed"
                    render={({ field }) => (
                        <FormItem>
                             <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-5 w-5 text-primary"/>
                                <FormLabel className="text-base">Kecepatan Pelayanan</FormLabel>
                                <GuidanceTooltip aspect="kecepatan pelayanan" />
                            </div>
                            <FormControl>
                                <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="grid grid-cols-3 gap-2">
                                    <ToggleGroupItem value="fast" aria-label="Cepat" className="flex flex-col h-20 gap-1">
                                        <Rocket className="h-6 w-6"/>
                                        <span>Cepat</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="medium" aria-label="Sedang" className="flex flex-col h-20 gap-1">
                                         <Turtle className="h-6 w-6"/>
                                        <span>Sedang</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="slow" aria-label="Lambat" className="flex flex-col h-20 gap-1">
                                        <Turtle className="h-6 w-6 opacity-50"/>
                                        <span>Lambat</span>
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="serviceCompleteness"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <div className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-primary"/>
                                <FormLabel className="text-base">Kelengkapan Layanan/Produk</FormLabel>
                                <GuidanceTooltip aspect="kelengkapan layanan" />
                            </div>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex items-center gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="complete" id="complete"/>
                                    <Label htmlFor="complete" className="flex items-center gap-2 text-base font-normal p-3 rounded-md border border-input cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary">
                                        <ThumbsUp className="h-5 w-5"/> Ya, Lengkap
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="incomplete" id="incomplete" />
                                     <Label htmlFor="incomplete" className="flex items-center gap-2 text-base font-normal p-3 rounded-md border border-input cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary">
                                        <ThumbsDown className="h-5 w-5"/> Tidak Lengkap
                                     </Label>
                                </div>
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="not_applicable" id="not_applicable" />
                                     <Label htmlFor="not_applicable" className="flex items-center gap-2 text-base font-normal p-3 rounded-md border border-input cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary">
                                        Tidak Tahu
                                     </Label>
                                </div>
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
            </div>
        </div>
        
        <Separator />

        <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Kirim Ulasan
            </Button>
        </div>
      </form>
    </Form>
  );
}
