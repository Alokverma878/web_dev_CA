import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Settings, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface CarCardProps {
  id: string;
  name: string;
  brand: string;
  model: string;
  image_url: string | null;
  fuel_type: string;
  transmission: string;
  price_per_hour: number;
  price_per_day: number;
  is_available: boolean;
}

export const CarCard = ({
  id,
  name,
  brand,
  model,
  image_url,
  fuel_type,
  transmission,
  price_per_hour,
  price_per_day,
  is_available,
}: CarCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-medium">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={image_url || "/placeholder.svg"}
          alt={`${brand} ${model}`}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {brand} {model}
            </p>
          </div>
          <Badge variant={is_available ? "default" : "secondary"}>
            {is_available ? "Available" : "Booked"}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Fuel className="h-4 w-4" />
            <span className="capitalize">{fuel_type}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Settings className="h-4 w-4" />
            <span className="capitalize">{transmission}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2 border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Per Hour</span>
            </div>
            <span className="text-lg font-bold text-primary">
              ${price_per_hour.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Per Day</span>
            </div>
            <span className="text-lg font-bold text-primary">
              ${price_per_day.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full" disabled={!is_available}>
          <Link to={`/book/${id}`}>
            {is_available ? "Book Now" : "Currently Unavailable"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
