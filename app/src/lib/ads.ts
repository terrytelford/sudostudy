export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID ?? ''

export const ADSENSE_SLOTS = {
  banner: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BANNER ?? '',
  sidebar: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_SIDEBAR ?? '',
  inline: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_INLINE ?? '',
}
