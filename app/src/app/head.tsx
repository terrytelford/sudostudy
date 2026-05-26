const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID ?? ''

export default function Head() {
  return (
    <>
      <meta name="impact-site-verification" content="54b14d4a-df41-41fa-9092-de8a1d823b31" />
      {ADSENSE_CLIENT ? (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      ) : null}
    </>
  )
}
