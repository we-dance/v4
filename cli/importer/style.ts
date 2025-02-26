import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function clearVotes() {
  await prisma.vote.deleteMany();
}

export async function addDanceStyle(danceStyle: any) {
  const data = {
    ...danceStyle,
    hashtag: danceStyle.id,
    partner: danceStyle.parent === "yes",
    group: danceStyle.group === "yes",
    familyOnly: danceStyle.family === "yes",
    active: danceStyle.active === "yes",
    root: danceStyle.root === "yes",
  };

  delete data.videos;
  delete data.id;

  const createdDanceStyle = await prisma.danceStyle.upsert({
    where: { hashtag: data.hashtag },
    update: data,
    create: data,
  });

  if (danceStyle.video) {
    const video = {
      url: danceStyle.video,
      styleId: createdDanceStyle.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await prisma.video.upsert({
      where: { url: video.url },
      update: video,
      create: video,
    });
  }

  if (danceStyle.videos) {
    for (const dataVideo of danceStyle.videos) {
      const video = {
        url: dataVideo.url,
        styleId: createdDanceStyle.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await prisma.video.upsert({
        where: { url: video.url },
        update: video,
        create: video,
      });
    }
  }

  return {
    state: "created",
    id: createdDanceStyle.id,
  };
}
