import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

function MyDocument() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#000000" />
                <link
                    rel="shortcut icon"
                    href="https://res.cloudinary.com/ak-tracuusaubenh/image/upload/v1667751701/ak-tracuusaubenh/Screenshot_2022-09-02_152018-removebg-preview_1_meicoh.png"
                />
            </Head>
            <body className="text-slate-700 antialiased">
                <div id="page-transition"></div>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;
