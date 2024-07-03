import { Cloudinary } from '@cloudinary/url-gen'
import { getImage } from 'astro:assets'

export const cloud = new Cloudinary({
  cloud: { cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME }
})

export const getCloudinaryImage = async (url: string) =>
  await getImage({
    src: cloud.image(url).createCloudinaryURL(),
    inferSize: true
  })
