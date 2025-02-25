import { PrismaClient } from "@prisma/client";
import { getDate, getDateOrNow } from "../utils/date";
import { getNormalizedString, getSlug } from "../utils/slug";

const prisma = new PrismaClient();

async function getCity(lat: number, lng: number) {
  const distance = 50000;
  const results: { distance: number; id: string }[] = await prisma.$queryRaw`
    SELECT
      ROUND(earth_distance(ll_to_earth(${lat}, ${lng}), ll_to_earth(lat, lng))::NUMERIC, 2) AS distance,
      id
    FROM "City"
    WHERE ROUND(earth_distance(ll_to_earth(${lat}, ${lng}), ll_to_earth(lat, lng))::NUMERIC, 2) < ${distance}
    ORDER BY distance
    LIMIT 1;`;

  if (results && results.length < 1) {
    return null;
  }

  return results[0];
}

async function addVenue(venue: any, cityId: string, creatorProfileId: string) {
  if (!venue?.place_id) {
    return {
      state: "failed",
      error: "empty",
      id: null,
    };
  }

  const existingVenue = await prisma.profile.findFirst({
    where: { id: venue.place_id },
  });
  if (existingVenue) {
    return {
      state: "ignored",
      id: existingVenue.id,
    };
  }

  const data: any = {
    id: venue.place_id,
    name: venue.name,
    username: venue.place_id,
    bio: "",
    formattedAddress: venue.formatted_address,
    mapUrl: venue.url,
    lng: venue.geometry?.location?.lng,
    lat: venue.geometry?.location?.lat,
    placeId: venue.place_id,
    phone: venue.international_phone_number,
    type: "Venue",
  };

  let city: any;

  city = await prisma.city.findFirst({
    where: { id: cityId },
  });

  if (!city) {
    city = await getCity(
      venue.geometry?.location?.lat,
      venue.geometry?.location?.lng
    );
  }

  if (city) {
    data.cityId = city.id;
  }

  const creator = await prisma.user.findFirst({
    where: { id: creatorProfileId },
  });

  if (creator) {
    data.createdById = creator.id;
  }

  const result = await prisma.profile.create({
    data,
  });

  return {
    state: "created",
    id: result.id,
  };
}

export async function addEvent(event: any) {
  const existingEvent = await prisma.event.findFirst({
    where: { id: event.id },
  });
  if (existingEvent) {
    return {
      state: "ignored",
      id: existingEvent.id,
    };
  }

  if (!event.name) {
    return {
      state: "failed",
      error: "no_name",
      id: event.id,
    };
  }

  if (!event.startDate) {
    return {
      state: "failed",
      error: "no_start_date",
      id: event.id,
    };
  }

  if (!event.endDate) {
    return {
      state: "failed",
      error: "no_end_date",
      id: event.id,
    };
  }

  let creatorId = "";
  if (event.createdBy) {
    const creator = await prisma.profile.findFirst({
      where: { id: event.createdBy },
    });
    if (!creator) {
      return {
        state: "failed",
        error: "creator_not_found",
        id: event.id,
        ref: event.createdBy,
      };
    }

    creatorId = creator.id;
  }

  const organizer = await prisma.profile.findFirst({
    where: { firebaseUsername: event.org?.username },
  });
  if (!organizer) {
    return {
      state: "failed",
      error: "organizer_not_found",
      id: event.id,
      ref: event.org?.username,
    };
  }
  const organizerId = organizer.id;

  const venueId = (await addVenue(event.venue, event.place, creatorId)).id;
  if (!venueId) {
    return {
      state: "failed",
      error: "no_venue",
      id: event.id,
      ref: event.address,
    };
  }

  const connectStyles: any[] = [];
  if (event.styles) {
    const hashtags = Object.keys(event.styles);
    for (const hashtag of hashtags) {
      const style = await prisma.danceStyle.findUnique({
        where: { hashtag },
      });

      if (style) {
        connectStyles.push({ id: style.id });
      }
    }
  }

  const slug = getSlug(event.name);

  const data = {
    id: event.id,
    slug,
    createdAt: getDateOrNow(event.createdAt),
    updatedAt: getDateOrNow(event.updatedAt),
    name: getNormalizedString(event.name),
    published: true,
    styles: {
      connect: connectStyles,
    },
    startDate: getDate(event.startDate),
    endDate: getDate(event.endDate),
    description: event.description || "",
    type: event.eventType,
    cover: event.cover || "",
    price: event.price || "",
    creatorId,
    organizerId,
    venueId,
    firebaseId: event.id,
  };

  try {
    const result = await prisma.event.create({
      data,
    });

    if (event.artists) {
      for (const artist of event.artists) {
        await prisma.guest.create({
          data: {
            role: "artist",
            profileId: artist.id,
            eventId: result.id,
            status: "confirmed",
          },
        });
      }
    }

    if (event.star?.usernames) {
      for (const firebaseUsername of event.star.usernames) {
        const profile = await prisma.profile.findFirst({
          where: { firebaseUsername },
        });
        if (profile) {
          await prisma.guest.create({
            data: {
              role: "attendee",
              profileId: profile.id,
              eventId: result.id,
              status: "registered",
            },
          });
        }
      }
    }

    return {
      state: "created",
      id: result.id,
    };
  } catch (exception) {
    return {
      state: "failed",
      error: "invalid_prisma_event_create",
      id: event.id,
      exception,
    };
  }
}
