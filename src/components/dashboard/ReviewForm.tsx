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
import { StarRating } from "@/components/shared/StarRating";
import { GuidanceTooltip } from "./GuidanceTooltip";
import { AISuggestions } from "./AISuggestions";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const reviewFormSchema = z.object({
  waitTime: z.number().min(0).max(60),
  serviceQuality: z.number().min(1).max(5, { message: "Please select a rating." }),
  medicationAvailability: z.enum(["in_stock", "out_of_stock", "not_applicable"], {
    required_error: "You need to select a medication availability status.",
  }),
  staffFriendliness: z.number().min(1).max(5, { message: "Please select a rating." }),
  comments: z.string().max(500, "Comments must be 500 characters or less.").optional(),
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
            title: "Review Submitted!",
            description: "Thank you for your valuable feedback.",
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
                            <FormLabel>Service Quality</FormLabel>
                            <GuidanceTooltip aspect="service quality" />
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
                            <FormLabel>Staff Friendliness</FormLabel>
                            <GuidanceTooltip aspect="staff friendliness" />
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
                                <FormLabel>Wait Time</FormLabel>
                                <GuidanceTooltip aspect="wait time" />
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
                                    {field.value}+ min
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
                                <FormLabel>Medication Availability</FormLabel>
                                <GuidanceTooltip aspect="medication availability" />
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
                                Everything was in stock
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="out_of_stock" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Some items were out of stock
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="not_applicable" />
                                </FormControl>
                                <FormLabel className="font-normal">Not Applicable</FormLabel>
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
                             <FormLabel>Additional Comments</FormLabel>
                             <GuidanceTooltip aspect="general feedback" />
                         </div>
                        <FormControl>
                            <Textarea
                            placeholder="Tell us more about your experience..."
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
                Submit Review
            </Button>
        </div>
      </form>
    </Form>
  );
}
