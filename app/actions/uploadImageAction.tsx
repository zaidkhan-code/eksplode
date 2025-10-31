"use server";

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("image") as unknown as File;
  if (!file) throw new Error("No image provided.");

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadResponse = await imagekit.upload({
    file: buffer,
    fileName: file.name,
  });

  // ✅ Return only serializable data
  return { ...uploadResponse };
}
