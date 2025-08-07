
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Smile, ThumbsUp, ThumbsDown, Clock, Rocket, Turtle, HelpCircle, Star, MessageSquare } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { addReview } from "@/lib/actions";

const reviewFormSchema = z.object({
  serviceQualityNew: z.enum(["positive", "negative"], {
    required_error: "Silakan berikan penilaian kualitas layanan.",
  }),
  staffFriendlinessNew: z.enum(["positive", "negative"], {
    required_error: "Silakan berikan penilaian keramahan staf.",
  }),
  serviceSpeed: z.enum(["fast", "medium", "slow"]).optional(),
  rawCompleteness: z.enum(["complete", "incomplete", "not_applicable"]).optional(),
  comments: z.string().max(500, "Komentar maksimal 500 karakter.").optional(),
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

  const { watch } = form;
  const serviceQuality = watch("serviceQualityNew");
  const staffFriendliness = watch("staffFriendlinessNew");
  const isCoreFeedbackProvided = serviceQuality && staffFriendliness;

  async function onSubmit(data: ReviewFormValues) {
    setIsSubmitting(true);
    
    try {
      await addReview({
        ...data,
        // Set default values for optional fields if they are not provided
        serviceSpeed: data.serviceSpeed ?? 'medium', 
        rawCompleteness: data.rawCompleteness ?? 'not_applicable',
        unit,
        userId: userId,
      });
        
      toast({
          title: "Ulasan Terkirim!",
          description: "Terima kasih atas umpan balik Anda yang berharga.",
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
          description: "Terjadi kesalahan saat menyimpan ulasan Anda. Silakan coba lagi.",
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        
        <div className="space-y-10">
            {/* Kualitas & Keramahan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <FormField
                    control={form.control}
                    name="serviceQualityNew"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-3 mb-3">
                                <Star className="h-6 w-6 text-primary"/>
                                <FormLabel className="text-lg font-semibold">Bagaimana kualitas pelayanannya?</FormLabel>
                            </div>
                            <FormControl>
                                <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-3 h-24">
                                    <ToggleGroupItem value="positive" aria-label="Baik" className="flex flex-col h-full gap-2 text-base">
                                        <ThumbsUp className="h-7 w-7 text-green-500"/>
                                        <span>Baik</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="negative" aria-label="Buruk" className="flex flex-col h-full gap-2 text-base">
                                         <ThumbsDown className="h-7 w-7 text-red-500"/>
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
                         <div className="flex items-center gap-3 mb-3">
                            <Smile className="h-6 w-6 text-primary"/>
                            <FormLabel className="text-lg font-semibold">Bagaimana keramahan stafnya?</FormLabel>
                         </div>
                        <FormControl>
                             <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-3 h-24">
                                <ToggleGroupItem value="positive" aria-label="Ramah" className="flex flex-col h-full gap-2 text-base">
                                    <ThumbsUp className="h-7 w-7 text-green-500"/>
                                    <span>Ramah</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="negative" aria-label="Tidak Ramah" className="flex flex-col h-full gap-2 text-base">
                                    <ThumbsDown className="h-7 w-7 text-red-500"/>
                                    <span>Tidak Ramah</span>
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
            </div>

            {/* Kecepatan & Kelengkapan */}
             <div className="space-y-4">
                 <p className="text-lg font-semibold text-foreground">Detail Tambahan (Opsional)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                     <FormField
                        control={form.control}
                        name="serviceSpeed"
                        render={({ field }) => (
                            <FormItem>
                                 <div className="flex items-center gap-3 mb-3">
                                    <Clock className="h-6 w-6 text-primary"/>
                                    <FormLabel className="text-base font-medium">Kecepatan Pelayanan</FormLabel>
                                </div>
                                <FormControl>
                                    <ToggleGroup type="single" variant="outline" value={field.value} onValueChange={field.onChange} className="grid grid-cols-3 gap-3 h-24">
                                        <ToggleGroupItem value="fast" aria-label="Cepat" className="flex flex-col h-full gap-2 text-base">
                                            <Rocket className="h-7 w-7"/>
                                            <span>Cepat</span>
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="medium" aria-label="Sedang" className="flex flex-col h-full gap-2 text-base">
                                             <Clock className="h-7 w-7"/>
                                            <span>Sedang</span>
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="slow" aria-label="Lambat" className="flex flex-col h-full gap-2 text-base">
                                            <Turtle className="h-7 w-7"/>
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
                        name="rawCompleteness"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-3 mb-3">
                              <HelpCircle className="h-6 w-6 text-primary" />
                              <FormLabel className="text-base font-medium">Kelengkapan Layanan/Produk</FormLabel>
                            </div>
                             <FormControl>
                                <ToggleGroup type="single" variant="outline" value={field.value} onValueChange={field.onChange} className="grid grid-cols-3 gap-3 h-24">
                                    <ToggleGroupItem value="complete" aria-label="Lengkap" className="flex flex-col h-full gap-2 text-base">
                                        <ThumbsUp className="h-7 w-7" />
                                        <span>Lengkap</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="incomplete" aria-label="Tidak Lengkap" className="flex flex-col h-full gap-2 text-base">
                                        <ThumbsDown className="h-7 w-7" />
                                        <span>Tdk Lengkap</span>
                                    </ToggleGroupItem>
                                     <ToggleGroupItem value="not_applicable" aria-label="Tidak Tahu" className="flex flex-col h-full gap-2 text-base">
                                        <HelpCircle className="h-7 w-7" />
                                        <span>Tidak Tahu</span>
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Komentar */}
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                        <FormItem>
                         <div className="flex items-center gap-3 mb-3">
                             <MessageSquare className="h-6 w-6 text-primary"/>
                             <FormLabel className="text-lg font-semibold">Ada komentar tambahan? (Opsional)</FormLabel>
                         </div>
                        <FormControl>
                            <Textarea
                            placeholder="Ceritakan lebih banyak tentang pengalaman Anda untuk membantu kami menjadi lebih baik..."
                            className="resize-none min-h-[150px] text-base"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isSubmitting || !isCoreFeedbackProvided} size="lg" className="text-lg">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Kirim Ulasan
            </Button>
        </div>
      </form>
    </Form>
  );
}


    