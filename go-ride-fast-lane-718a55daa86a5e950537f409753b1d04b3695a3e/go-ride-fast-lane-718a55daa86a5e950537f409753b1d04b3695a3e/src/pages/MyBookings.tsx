import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Car, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          cars (
            name,
            brand,
            model,
            image_url
          )
        `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading bookings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "completed":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <section className="bg-gradient-hero py-12 text-primary-foreground md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">My Bookings</h1>
            <p className="text-lg text-primary-foreground/90">
              Track and manage all your car rental bookings
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center">
              <p className="text-muted-foreground">Loading your bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center">
              <p className="mb-4 text-muted-foreground">You haven't made any bookings yet</p>
              <a href="/cars" className="text-primary hover:underline">
                Browse available cars
              </a>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        {booking.cars.name}
                      </CardTitle>
                      <Badge variant={getStatusVariant(booking.status)}>
                        {booking.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {booking.cars.brand} {booking.cars.model}
                        </p>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(booking.start_date), "PPP")} -{" "}
                            {format(new Date(booking.end_date), "PPP")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">
                            {booking.rental_type} rental ({booking.duration}{" "}
                            {booking.rental_type === "hourly" ? "hours" : "days"})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">
                            Total: ${booking.total_price}
                          </span>
                        </div>
                      </div>

                      {booking.pickup_instructions && (
                        <div className="rounded-lg bg-muted p-4">
                          <h4 className="mb-2 text-sm font-semibold">Pickup Instructions</h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.pickup_instructions}
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                      Booked on {format(new Date(booking.created_at), "PPP")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
