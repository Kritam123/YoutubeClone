import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@clerk/nextjs";
const f = createUploadthing();

export const ourFileRouter = {
  profileUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      return { imageUrl: file.url };
    }),
  VideoUploader: f({
    video: { maxFileSize: "2GB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async (data) => {
      const { file, metadata } = data;
      console.log("Upload complete for userId:", metadata.userId);
      return { videoUrl: file.url };
    }),
  thumbnailUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async (data) => {
      const { file, metadata } = data;
      console.log("Upload complete for userId:", metadata.userId);
      return { thumbnailUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
