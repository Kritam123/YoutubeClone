"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";


export const getCurrentUser = async()=>{
    const user = await currentUser();
    if (!user) throw new Error("Unauthentication");
    const dbUser = await db.user.findUnique({
      where: {
        externalUserId: user.id,
      },
    });
    return dbUser 
}

