import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className="antialiased"
        style={{
          fontFamily:
            'Inter, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
