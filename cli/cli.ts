import { Command } from "commander";
import {
  importAccounts,
  importEvents,
  importProfiles,
  importCities,
  importSubscribers,
  importDanceStyles,
  importPosts,
} from "./importer";
import { getUniqueUsername } from "./importer/profile";
import { logger } from "./utils/logger";
import * as cliProgress from "cli-progress";
import { exportAccounts, reindex } from "./importer/account";

function getLogLevel(verbosity: number) {
  switch (verbosity) {
    case 0:
      return "";
    case 1:
      return "warning";
    case 2:
      return "info";
    default:
      return "debug";
  }
}

const program = new Command();

program
  .name("prisma-import")
  .option(
    "-v, --verbose",
    "increase verbosity",
    (value, previous) => previous + 1,
    0
  );

program.command("username <name>").action(async (name) => {
  const result = await getUniqueUsername(name);
  console.log(result);
});

program.command("export").action(async (name) => {
  const result = await exportAccounts();
  console.log(result);
});

program.command("reindex").action(async (name) => {
  const result = await reindex();
  console.log(result);
});

program
  .command("import")
  .option("--all", "Import everything")
  .option("-d, --dance-styles", "Import dance styles")
  .option("-a, --accounts", "Import accounts")
  .option("-c, --cities", "Import cities")
  .option("-p, --profiles", "Import profiles")
  .option("-b, --posts", "Import blog posts")
  .option("-e, --events", "Import events")
  .option("-s, --subscribers", "Import subscribers")
  .action(async (options) => {
    const {
      all,
      accounts,
      profiles,
      events,
      cities,
      subscribers,
      danceStyles,
      posts,
    } = options;
    logger.level = getLogLevel(program.opts().verbose);

    logger.info("Starting import", {
      level: logger.level,
      all,
      accounts,
      profiles,
      events,
      posts,
      cities,
      subscribers,
      danceStyles,
    });

    const multibar = new cliProgress.MultiBar({
      clearOnComplete: false,
      hideCursor: true,
      format: ` {bar} | {collection} | {eta_formatted} | {value}/{total} | {failed} failed, {created} created, {ignored} ignored, {updated} updated`,
    });

    if (all || danceStyles) {
      await importDanceStyles(multibar);
    }

    if (all || accounts) {
      await importAccounts(multibar);
    }

    if (all || cities) {
      await importCities(multibar);
    }

    if (all || profiles) {
      await importProfiles(multibar);
    }

    if (all || events) {
      await importEvents(multibar);
    }

    if (all || subscribers) {
      await importSubscribers(multibar);
    }

    if (all || posts) {
      await importPosts(multibar);
    }

    multibar.stop();

    logger.info("Finish import");
  });

program.parse(process.argv);
