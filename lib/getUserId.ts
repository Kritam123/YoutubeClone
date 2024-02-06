import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getUserId = async () => {
  const user = await currentUser();
  if (!user) return "UnAuthentication!";
  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: user.id,
    },
  });
  if (!dbUser) return "User not found!";
  return dbUser?.id;
};

