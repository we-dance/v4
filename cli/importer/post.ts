import { PrismaClient } from "@prisma/client";
import { getDateOrNow } from "../utils/date";
import { getNormalizedString, getSlug } from "../utils/slug";

const prisma = new PrismaClient();

export async function addPost(post: any) {
  const existingPost = await prisma.post.findFirst({
    where: { id: post.id },
  });
  if (existingPost) {
    return {
      state: "ignored",
      id: existingPost.id,
    };
  }

  let creatorId = "";
  if (post.createdBy) {
    const creator = await prisma.profile.findFirst({
      where: { id: post.createdBy },
    });
    if (!creator) {
      return {
        state: "failed",
        error: "creator_not_found",
        id: post.id,
        ref: post.createdBy,
      };
    }

    creatorId = creator.id;
  }

  let slug = post.title || post.description;
  if (slug) {
    slug = getSlug(slug);
  }

  const styleHashtag = post.styles ? Object.keys(post.styles)[0] : null;
  const style = styleHashtag
    ? await prisma.danceStyle.findUnique({
        where: { hashtag: styleHashtag },
      })
    : null;
  const styleId = style?.id || undefined;

  const data = {
    id: post.id,
    slug,
    url: post.url,
    styleId: styleId,
    title: getNormalizedString(post.title),
    content: post.description,
    image: post.cover,
    createdAt: getDateOrNow(post.createdAt),
    updatedAt: getDateOrNow(post.updatedAt),
    authorId: creatorId,
    published: true,
    type: post.type || "",
    firebaseId: post.id,
  };

  try {
    const result = await prisma.post.create({
      data,
    });

    return {
      state: "created",
      id: result.id,
    };
  } catch (exception) {
    return {
      state: "failed",
      error: "invalid_prisma_post_create",
      id: post.id,
      exception,
    };
  }
}
