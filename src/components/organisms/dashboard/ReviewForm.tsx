
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
import { Separator } from "@/components/ui/separator";
import { Loader2, Smile, ThumbsUp, ThumbsDown, Clock, Rocket, Turtle, HelpCircle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { addReview } from "@/lib/actions";

const reviewFormSchema = z.object({
  serviceSpeed: z.enum(["fast", "medium", "slow"], {
    required_error: "Silakan pilih kecepatan layanan.",
  }),
  rawCompleteness: z.enum(["complete", "incomplete", "not_applicable"], {
    required_error: "Anda harus memilih status kelengkapan layanan.",
  }),
  comments: z.string().max(500, "Komentar maksimal 500 karakter.").optional(),
  serviceQualityNew: z.enum(["positive", "negative"], {
    required_error: "Silakan berikan penilaian kualitas layanan.",
  }),
  staffFriendlinessNew: z.enum(["positive", "negative"], {
    required_error: "Silakan berikan penilaian keramahan staf.",
  }),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const defaultValues: Partial<ReviewFormValues> = {
  comments: "",
};

export default function ReviewForm() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const unitParam = searchParams.get('unit');
  const userId = searchParams.get('userId');
  
  const [unit, setUnit] = useState(unitParam || "Tidak Diketahui");

  useEffect(() => {
    if (unitParam) {
      setUnit(unitParam);
    }
  }, [unitParam]);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ReviewFormValues) {
    setIsSubmitting(true);
    
    try {
      await addReview({
        ...data,
        unit,
        userId: userId // Can be null for anonymous kiosk users
      });
        
      toast({
          title: "Ulasan Terkirim!",
          description: "Terima kasih atas umpan balik Anda.",
      });
        
      form.reset(defaultValues);
      
      if (userId) {
        const params = new URLSearchParams(searchParams.toString());
        router.push(`/dashboard/history?${params.toString()}`);
      }

    } catch (error) {
       toast({
          variant: "destructive",
          title: "Gagal Mengirim Ulasan",
          description: "Terjadi kesalahan saat menyimpan ulasan Anda.",
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="space-y-8">
                <FormField
                    control={form.control}
                    name="serviceQualityNew"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-2 mb-2">
                                <Smile className="h-5 w-5 text-primary"/>
                                <FormLabel className="text-base">Kualitas Pelayanan</FormLabel>
                            </div>
                            <FormControl>
                                <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-2">
                                    <ToggleGroupItem value="positive" aria-label="Baik" className="flex flex-col h-20 gap-1">
                                        <ThumbsUp className="h-6 w-6 text-green-500"/>
                                        <span>Baik</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="negative" aria-label="Buruk" className="flex flex-col h-20 gap-1">
                                         <ThumbsDown className="h-6 w-6 text-red-500"/>
                                        <span>Buruk</span>
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                 />

                 <FormField
                    control={form.control}
                    name="staffFriendlinessNew"
                    render={({ field }) => (
                        <FormItem>
                         <div className="flex items-center gap-2 mb-2">
                            <Smile className="h-5 w-5 text-primary"/>
                            <FormLabel className="text-base">Keramahan Staf</FormLabel>
                         </div>
                        <FormControl>
                             <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-2">
                                <ToggleGroupItem value="positive" aria-label="Ramah" className="flex flex-col h-20 gap-1">
                                    <ThumbsUp className="h-6 w-6 text-green-500"/>
                                    <span>Ramah</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="negative" aria-label="Tidak Ramah" className="flex flex-col h-20 gap-1">
                                        <ThumbsDown className="h-6 w-6 text-red-500"/>
                                    <span>Tidak Ramah</span>
                                </ToggleGroupItem>
                            </ToggleGroup>
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
                            </div>
                            <FormControl>
                                <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="grid grid-cols-3 gap-2">
                                    <ToggleGroupItem value="fast" aria-label="Cepat" className="flex flex-col h-20 gap-1">
                                        <Rocket className="h-6 w-6"/>
                                        <span>Cepat</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="medium" aria-label="Sedang" className="flex flex-col h-20 gap-1">
                                         <Clock className="h-6 w-6"/>
                                        <span>Sedang</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="slow" aria-label="Lambat" className="flex flex-col h-20 gap-1">
                                        <Turtle className="h-6 w-6"/>
                                        <span>Lambat</span>
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-6">
                 <FormField
                    control={form.control}
                    name="rawCompleteness"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-5 w-5 text-primary" />
                          <FormLabel className="text-base">Kelengkapan Layanan/Produk</FormLabel>
                        </div>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-wrap items-center gap-4"
                          >
                            <Label
                              htmlFor="complete"
                              className="flex items-center gap-2 text-base font-normal p-3 rounded-md border border-input cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary transition-colors"
                            >
                              <RadioGroupItem value="complete" id="complete" />
                              <ThumbsUp className="h-5 w-5" /> Ya, Lengkap
                            </Label>
                            <Label
                              htmlFor="incomplete"
                              className="flex items-center gap-2 text-base font-normal p-3 rounded-md border border-input cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary transition-colors"
                            >
                              <RadioGroupItem value="incomplete" id="incomplete" />
                              <ThumbsDown className="h-5 w-5" /> Tidak Lengkap
                            </Label>
                            <Label
                              htmlFor="not_applicable"
                              className="flex items-center gap-2 text-base font-normal p-3 rounded-md border border-input cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary transition-colors"
                            >
                              <RadioGroupItem value="not_applicable" id="not_applicable" />
                              Tidak Tahu
                            </Label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                        <FormItem>
                         <div className="flex items-center gap-2 mb-2">
                             <FormLabel>Komentar Tambahan (Opsional)</FormLabel>
                         </div>
                        <FormControl>
                            <Textarea
                            placeholder="Ceritakan lebih banyak tentang pengalaman Anda..."
                            className="resize-none min-h-[220px]"
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
            <Button type="submit" disabled={isSubmitting || !form.formState.isValid} size="lg">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Kirim Ulasan
            </Button>
        </div>
      </form>
    </Form>
  );
}
