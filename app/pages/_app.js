import App from 'next/app';
import StyleSheet from "../src/components/StyleSheet"
const fontFiles = [
  'PPObjectSans-Regular.woff2',
  'PPObjectSans-Medium.woff2',
  'PPObjectSans-Bold.woff2',
  'BandwidthDisplay_Rg.woff2',
]

function MyApp({ Component, pageProps }) {
  return (
    <>
     {fontFiles.map((file, index) => (
          <StyleSheet
            key={`font-file-${index}`}
            rel="preload"
            href={`/pp_fonts/${file}`}
            as="font"
            crossOrigin=""
          />
        ))}
       <StyleSheet href={`/css/font-loader.css`} />
      <Component {...pageProps} />
    </>
  );
}
MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};

export default MyApp;
