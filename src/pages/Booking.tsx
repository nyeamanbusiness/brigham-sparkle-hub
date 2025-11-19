import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const bookingSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
  base_service_id: z.string().min(1, "Please select a service"),
  addon_ids: z.array(z.string()).default([]),
  vehicle_details: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Service {
  id: string;
  name: string;
  type: string;
  price_cents: number;
  description: string | null;
}

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [baseServices, setBaseServices] = useState<Service[]>([]);
  const [addons, setAddons] = useState<Service[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      base_service_id: "",
      addon_ids: [],
      vehicle_details: "",
      notes: "",
    },
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .order("display_order");

    if (error) {
      toast.error("Failed to load services");
      return;
    }

    const base = data?.filter((s) => s.type === "base") || [];
    const addOnServices = data?.filter((s) => s.type === "addon") || [];

    setBaseServices(base);
    setAddons(addOnServices);
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const calculateTotal = () => {
    const baseServiceId = form.watch("base_service_id");
    const baseService = baseServices.find((s) => s.id === baseServiceId);
    const basePrice = baseService?.price_cents || 0;

    const addonPrice = addons
      .filter((addon) => selectedAddons.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price_cents, 0);

    return formatPrice(basePrice + addonPrice);
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) => {
      if (prev.includes(addonId)) {
        return prev.filter((id) => id !== addonId);
      }
      return [...prev, addonId];
    });
  };

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke(
        "create-booking-checkout",
        {
          body: {
            ...data,
            addon_ids: selectedAddons,
          },
        }
      );

      if (error) throw error;

      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(error.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Book Your Service</h1>
          <p className="text-muted-foreground">
            Select your service and provide your details to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Service Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Service</CardTitle>
                <CardDescription>Choose your main detailing service</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="base_service_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-3"
                        >
                          {baseServices.map((service) => (
                            <div
                              key={service.id}
                              className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                            >
                              <RadioGroupItem value={service.id} id={service.id} />
                              <Label
                                htmlFor={service.id}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-semibold">{service.name}</div>
                                    {service.description && (
                                      <div className="text-sm text-muted-foreground mt-1">
                                        {service.description}
                                      </div>
                                    )}
                                  </div>
                                  <div className="font-bold text-lg">
                                    {formatPrice(service.price_cents)}
                                  </div>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Add-ons */}
            {addons.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Add-ons</CardTitle>
                  <CardDescription>Enhance your service with optional add-ons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {addons.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                    >
                      <Checkbox
                        id={addon.id}
                        checked={selectedAddons.includes(addon.id)}
                        onCheckedChange={() => handleAddonToggle(addon.id)}
                      />
                      <Label
                        htmlFor={addon.id}
                        className="flex-1 cursor-pointer flex justify-between"
                      >
                        <span className="font-medium">{addon.name}</span>
                        <span className="font-semibold">
                          {formatPrice(addon.price_cents)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle>Service Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Springfield" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="IL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="62701" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="vehicle_details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Details (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="2020 Honda Accord, Silver" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requirements or requests..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Total and Submit */}
            <Card className="bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-3xl font-bold">{calculateTotal()}</span>
                </div>

                <Separator className="my-6" />

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  You'll be redirected to Stripe for secure payment processing
                </p>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
