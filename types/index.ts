export interface Venue {
  id: number;
  name: string;
  image: string;
  address: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  styles: string[];
  fullVenuePricing: {
    hourly: number;
    daily: number;
    weekly: number;
  };
  packages?: Package[];
  services?: Service[];
  areas: Area[];
}

export interface Package {
  id: string;
  name: string;
  description: string;
  includedAreas: number[];
  duration: string;
  price: number;
  minimumBookings: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  type: "per_hour" | "per_event";
}

export interface Area {
  id: number;
  name: string;
  description: string;
  minimumBookingTime: number;
  setupTimeRequired: number;
  cleanupTimeRequired: number;
  pricing: {
    hourly: number;
    daily: number;
    weekly: number;
    monthly: number;
  };
  capacity: number;
  size: {
    width: number;
    length: number;
    height: number;
    unit: string;
  };
  equipment?: Equipment[];
  storage?: Storage[];
  amenities: string[];
  floorType: string;
  images: string[];
  availability: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  policies: {
    cancellation: {
      hours: number;
      refundPercentage: number;
    }[];
    insurance: {
      required: boolean;
      pricePerEvent: number;
    };
  };
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  available: number;
}

export interface Storage {
  id: string;
  name: string;
  size: string;
  pricePerMonth: number;
  available: number;
}
