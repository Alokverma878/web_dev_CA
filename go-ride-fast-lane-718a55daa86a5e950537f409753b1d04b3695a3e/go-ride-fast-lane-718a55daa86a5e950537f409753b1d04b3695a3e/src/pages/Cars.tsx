import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CarCard } from "@/components/CarCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Cars() {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [fuelFilter, setFuelFilter] = useState<string>("all");
  const [transmissionFilter, setTransmissionFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, [searchQuery, fuelFilter, transmissionFilter, availabilityFilter]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      let query = supabase.from("cars").select("*");

      // Apply filters
      if (fuelFilter !== "all") {
        query = query.eq("fuel_type", fuelFilter as any);
      }
      if (transmissionFilter !== "all") {
        query = query.eq("transmission", transmissionFilter as any);
      }
      if (availabilityFilter !== "all") {
        query = query.eq("is_available", availabilityFilter === "available");
      }

      const { data, error } = await query;

      if (error) throw error;

      // Apply search filter on client side
      let filteredData = data || [];
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        filteredData = filteredData.filter(
          (car) =>
            car.name.toLowerCase().includes(search) ||
            car.brand.toLowerCase().includes(search) ||
            car.model.toLowerCase().includes(search)
        );
      }

      setCars(filteredData);
    } catch (error: any) {
      toast({
        title: "Error loading cars",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-hero py-12 text-primary-foreground md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Browse Our Fleet</h1>
            <p className="text-lg text-primary-foreground/90">
              Find the perfect vehicle for your journey
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by car name, brand, or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={fuelFilter} onValueChange={setFuelFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fuel</SelectItem>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={transmissionFilter} onValueChange={setTransmissionFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cars</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center">
              <p className="text-muted-foreground">Loading vehicles...</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground">
                No vehicles found matching your criteria
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-muted-foreground">
                Showing {cars.length} {cars.length === 1 ? "vehicle" : "vehicles"}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <CarCard key={car.id} {...car} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
