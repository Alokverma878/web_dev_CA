import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Users, Award, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">About Go-Ride</h1>
            <p className="text-lg text-primary-foreground/90 md:text-xl">
              Your trusted partner for convenient, flexible, and affordable car rentals.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="mb-4 text-lg text-muted-foreground">
              At Go-Ride, we believe that renting a car should be simple, transparent, and
              affordable. Founded with a vision to revolutionize the car rental industry,
              we've built a platform that puts our customers first.
            </p>
            <p className="text-lg text-muted-foreground">
              Whether you need a vehicle for a few hours or several days, we offer
              flexible rental options that fit your schedule and budget. Our commitment is
              to provide well-maintained, reliable vehicles backed by exceptional customer
              service.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground">
              We stand out from the competition with our core values
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Safety First</h3>
              <p className="text-muted-foreground">
                All vehicles undergo rigorous safety inspections and regular maintenance
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Customer Focus</h3>
              <p className="text-muted-foreground">
                24/7 support team ready to assist you throughout your rental journey
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <Award className="h-8 w-8 text-success" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Quality Fleet</h3>
              <p className="text-muted-foreground">
                Wide selection of modern, well-maintained vehicles to choose from
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
                <Clock className="h-8 w-8 text-warning" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Flexibility</h3>
              <p className="text-muted-foreground">
                Rent by the hour or day with easy online booking and instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Rent a car in three simple steps
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-8">
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold">Browse & Select</h3>
                <p className="text-muted-foreground">
                  Browse our extensive fleet of vehicles and select the perfect car for
                  your needs. Filter by type, price, and availability.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold">Book Online</h3>
                <p className="text-muted-foreground">
                  Choose your rental duration (hourly or daily), upload your driving
                  license, and complete the booking in minutes. Get instant confirmation.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold">Pick Up & Drive</h3>
                <p className="text-muted-foreground">
                  Once your booking is approved, receive pickup instructions via email.
                  Collect your car and hit the road!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
