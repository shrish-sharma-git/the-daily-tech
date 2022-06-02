import Head from 'next/head';
import Script from 'next/script';
import './index.css';
import '../node_modules/react-quill/dist/quill.snow.css';
import '../node_modules/nprogress/nprogress.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
