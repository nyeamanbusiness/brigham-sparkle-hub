import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      navigate("/booking");
    }
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
          <CardDescription>
            Your payment has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            We've received your booking and payment. You'll receive a confirmation
            email shortly with all the details of your service appointment.
          </p>
          
          <div className="bg-accent/50 rounded-lg p-4">
            <p className="text-sm font-medium mb-2">What's Next?</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Check your email for booking confirmation</li>
              <li>We'll contact you to schedule your service</li>
              <li>Prepare your vehicle for the appointment</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <Button onClick={() => navigate("/")} size="lg" className="w-full">
              Return Home
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Contact Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
