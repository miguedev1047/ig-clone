import { FileWithPreview } from '@/hooks/use-file-upload'
import { toast } from 'sonner'

type CloudinaryUploadProps = {
  itemId: string | undefined
  folder: string
  path: string
  files: FileWithPreview[]
}

export const uploadCloudinary = async (props: CloudinaryUploadProps) => {
  const { folder, itemId, path, files } = props
  const currentImage = files[0].file

  const formData = new FormData()
  formData.append('filePost', currentImage as File)
  formData.append('folder', folder)
  formData.append('path', path)
  formData.append('itemId', itemId as string)

  const options = { method: 'POST', body: formData }

  const res = await fetch('/api/cloudinary/upload', options)
  if (res.status !== 201) throw toast.error('Failed to upload image')
  return res.json()
}
