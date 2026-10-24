import Script from "next/script";

const GA_ID = process.env.GA_MEASUREMENT_ID || "G-XH0EGD5PMT";

/** Google Analytics 4. Loaded on every page. */
export default function Analytics() {
  const id = GA_ID;
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
