import { sortBy } from "lodash";
import { getProfiles } from "../provider/profiles";
import { getAccounts, getUsers, getSuspended } from "../provider/accounts";
import { getDanceStyles } from "../provider/styles";
import { getEvents } from "../provider/events";
import { getPosts } from "../provider/posts";
import { addEvent } from "./event";
import { addPost } from "./post";
import {
  addProfile,
  addCity,
  addFollowers,
  addCitySubscribers,
} from "./profile";
import { addAccount } from "./account";
import { addDanceStyle, clearVotes } from "./style";
import * as cliProgress from "cli-progress";
import { getLogger } from "../utils/logger";

export async function importDanceStyles(multibar: cliProgress.MultiBar) {
  let collection = "styles";
  const logger = getLogger(collection);
  logger.info("Importing dance styles");

  const danceStyles = await getDanceStyles();

  let created = 0;
  let ignored = 0;
  let failed = 0;
  let updated = 0;

  const bar = multibar.create(danceStyles.length, 0, {
    collection,
    created,
    ignored,
    failed,
    updated,
  });

  await clearVotes();

  for (const danceStyle of danceStyles) {
    logger.debug("importing", danceStyle.id);

    const result = await addDanceStyle(danceStyle);

    if (result.state === "created") {
      created++;
    } else if (result.state === "ignored") {
      ignored++;
    } else if (result.state === "failed") {
      failed++;
    } else if (result.state === "updated") {
      updated++;
    }

    bar.increment({ created, ignored, failed, updated });
  }

  bar.stop();

  logger.info("Finished importing dance styles", {
    total: danceStyles.length,
    created,
    ignored,
    failed,
    updated,
  });
}

export async function importAccounts(multibar: cliProgress.MultiBar) {
  let collection = "accounts";
  const logger = getLogger(collection);
  logger.info("Importing accounts");

  const accounts = await getAccounts();
  const users = getUsers();
  const suspended = getSuspended();

  let created = 0;
  let ignored = 0;
  let failed = 0;

  const bar = multibar.create(accounts.length, 0, {
    collection,
    updated: 0,
  });

  for (const account of accounts) {
    logger.debug({
      state: "importing",
      id: account.id,
      email: account.email,
    });

    const user = users.find((u: any) => u.localId === account.id);
    const isSuspended = suspended.find((s: any) => s.uid === account.id);
    bar.increment({ failed, created, ignored });

    const result = await addAccount(account, user, isSuspended);

    if (result.state === "created") {
      created++;
    }

    if (result.state === "ignored") {
      ignored++;
    }

    if (result.state === "failed") {
      failed++;
    }

    logger.log(result.state === "failed" ? "error" : "debug", result);
  }

  bar.stop();
}

export async function importCities(multibar: cliProgress.MultiBar) {
  let collection = "cities";
  const logger = getLogger(collection);
  logger.info("Importing cities");

  const allProfiles = sortBy(await getProfiles(), "createdAt");
  const cities = allProfiles.filter((p: any) => p.type === "City");

  let created = 0;
  let updated = 0;
  let failed = 0;
  let ignored = 0;

  const bar = multibar.create(cities.length, 0, {
    collection,
  });

  for (const city of cities) {
    logger.debug({
      state: "importing",
      id: city.id,
      username: city.username,
    });

    bar.increment({ failed, created, updated, ignored });

    const result = await addCity(city);
    if (result.state === "updated") {
      updated++;
    }

    if (result.state === "ignored") {
      ignored++;
    }

    if (result.state === "created") {
      created++;
    }

    if (result.state === "failed") {
      failed++;
    }

    logger.log(result.state === "failed" ? "error" : "debug", result);
  }

  bar.stop();
}

export async function importSubscribers(multibar: cliProgress.MultiBar) {
  const profiles = sortBy(await getProfiles(), "createdAt");
  let created = 0;
  let failed = 0;

  let collection = "subscribers";
  const logger = getLogger(collection);

  const bar = multibar.create(profiles.length, 0, {
    collection,
    ignored: 0,
    updated: 0,
  });

  for (const profile of profiles) {
    let result;
    if (profile.type === "City") {
      result = await addCitySubscribers(profile);
      created += result.created;
      failed += result.failed;
    } else {
      result = await addFollowers(profile);
      created += result.created;
      failed += result.failed;
    }

    for (const error of result.errors) {
      logger.error(error);
    }

    bar.increment({ failed, created });
  }
  bar.stop();
}

export async function importProfiles(multibar: cliProgress.MultiBar) {
  let collection = "profiles";
  const logger = getLogger(collection);
  logger.info("Importing profiles");

  let profiles = sortBy(await getProfiles(), ["lastLoginAt", "viewsCount"]);
  profiles = profiles.filter((p: any) => p.type !== "City");

  let created = 0;
  let failed = 0;
  let updated = 0;

  const bar = multibar.create(profiles.length, 0, {
    collection,
    ignored: 0,
  });

  for (const profile of profiles) {
    logger.debug({
      state: "importing",
      id: profile.id,
      username: profile.username,
    });

    const result = await addProfile(profile);

    if (result.state === "created") {
      created++;
    }

    if (result.state === "updated") {
      updated++;
    }

    if (result.state === "failed") {
      failed++;
    }

    if (result.state === "ignored") {
      failed++;
    }

    logger.log(result.state === "failed" ? "error" : "debug", result);

    bar.increment({ failed, created, updated });
  }
  bar.stop();
}

export async function importPosts(multibar: cliProgress.MultiBar) {
  let collection = "posts";
  const logger = getLogger(collection);
  logger.info("Importing posts");

  let created = 0;
  let updated = 0;
  let ignored = 0;
  let failed = 0;

  const posts = await getPosts();

  const bar = multibar.create(posts.length, 0, {
    collection,
  });

  for (const post of posts) {
    logger.debug("importing", post.id);

    const result = await addPost(post);
    bar.increment({ created, updated, ignored, failed });

    if (result.state === "created") {
      created++;
    }
    if (result.state === "updated") {
      updated++;
    }
    if (result.state === "ignored") {
      ignored++;
    }
    if (result.state === "failed") {
      failed++;
    }

    logger.log(result.state === "failed" ? "error" : "debug", result);
  }

  bar.stop();
}

export async function importEvents(multibar: cliProgress.MultiBar) {
  let collection = "events";
  const logger = getLogger(collection);

  logger.info("Importing events");

  let created = 0;
  let updated = 0;
  let ignored = 0;
  let failed = 0;

  const events = await getEvents();

  const bar = multibar.create(events.length, 0, {
    collection,
  });

  for (const event of events) {
    logger.debug("importing", event.id);

    const result = await addEvent(event);
    bar.increment({ created, updated, ignored, failed });

    if (result.state === "created") {
      created++;
    }
    if (result.state === "updated") {
      updated++;
    }
    if (result.state === "ignored") {
      ignored++;
    }
    if (result.state === "failed") {
      failed++;
    }

    logger.log(result.state === "failed" ? "error" : "debug", result);
  }

  bar.stop();
}
