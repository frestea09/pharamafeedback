import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Pill, Smile, Clock } from "lucide-react";
import { PharmaFeedbackLogo } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PharmaFeedbackLogo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">PharmaFeedback</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Patient Login</Link>
          </Button>
          <Button asChild>
            <Link href="/admin">Admin Login</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Improve Pharmacy Services, Together.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your feedback is vital. Help RSUD Oto Iskandar Dinata enhance its pharmacy services by sharing your experience. Quick, easy, and impactful.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">Leave a Review</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="bg-card py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground">Why Your Feedback Matters</h3>
              <p className="mt-2 text-muted-foreground">
                Your reviews provide direct insights that lead to better care for everyone.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Smile className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Enhance Service Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  Rate staff friendliness and professionalism to ensure everyone receives courteous and effective care.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Pill className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Improve Medication Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  Your feedback helps us manage our inventory better, ensuring essential medications are always in stock.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Reduce Wait Times</CardTitle>
                </CardHeader>
                <CardContent>
                  Help us identify bottlenecks and streamline our processes to get you your medications faster.
                </CardContent>
              </Card>
            </div>
             <div className="mt-16 text-center">
              <h3 className="text-3xl font-bold text-foreground">A Smart, Guided Experience</h3>
               <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Our platform uses AI to make giving feedback simpler and more effective.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 text-left p-4 rounded-lg max-w-md">
                      <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                      <p><span className="font-semibold">AI-Powered Suggestions:</span> Get smart prompts based on common feedback to help you articulate your thoughts.</p>
                  </div>
                   <div className="flex items-center gap-3 text-left p-4 rounded-lg max-w-md">
                      <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                      <p><span className="font-semibold">Guided Review Process:</span> We'll walk you through each step to ensure your feedback is detailed and impactful.</p>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PharmaFeedback. All rights reserved.</p>
      </footer>
    </div>
  );
}
