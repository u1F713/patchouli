// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMeta {
  readonly env: {
    readonly CLOUDINARY_CLOUD_NAME: string
    readonly SITE_URL: string
  }
}
