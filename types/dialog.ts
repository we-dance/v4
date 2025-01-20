import type { Area, Venue } from "./index";

export interface DialogArea extends Omit<Area, "pricing"> {
  pricing: {
    hourly: number;
    daily: number;
    weekly: number;
    monthly?: number;
  };
  availability: {
    [key: string]: string | null; // days of week -> hours string or null if closed
  };
}

export interface DialogVenue extends Pick<Venue, "id" | "name"> {
  areas: DialogArea[];
}
