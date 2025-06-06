'use server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface RemoveCloudinaryProps {
  itemId: string | undefined
  folder: string
  path: string
}

export const removeCloudinary = async (props: RemoveCloudinaryProps) => {
  const { folder, itemId, path } = props
  try {
    await cloudinary.uploader.destroy(`instagram/${folder}/${path}-${itemId}`, {
      invalidate: true,
    })
  } catch {
    throw new Error('Failed to remove image.')
  }
}
