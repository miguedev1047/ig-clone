import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  const data = await request.formData()

  const file = data.get('filePost') as File
  const folder = data.get('folder')
  const path = data.get('path')
  const itemId = data.get('itemId')

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const { secure_url } = (await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `/instagram/${folder}`,
            public_id: `${path}-${itemId}`,
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            }
            resolve(result as UploadApiResponse)
          }
        )
        .end(buffer)
    })) as UploadApiResponse

    return NextResponse.json({ url: secure_url }, { status: 201 })
  } catch {
    return NextResponse.json({ url: null }, { status: 500 })
  }
}
