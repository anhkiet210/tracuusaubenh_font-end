import ReactDOM from 'react-dom';
import { useRef, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import Router from 'next/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from '../Layout';
import '../styles/output.css';
import store from '../redux/store';
import PageChange from '../components/PageChange';

Router.events.on('routeChangeStart', (url) => {
    // console.log(`Loading: ${url}`);
    document.body.classList.add('body-page-transition');
    ReactDOM.render(<PageChange path={url} />, document.getElementById('page-transition'));
});
Router.events.on('routeChangeComplete', () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
    document.body.classList.remove('body-page-transition');
});
Router.events.on('routeChangeError', () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
    document.body.classList.remove('body-page-transition');
});

function MyApp({ Component, pageProps }) {
    const tokenRef = useRef();
    useEffect(() => {
        if (typeof window !== undefined) {
            tokenRef.current = localStorage.getItem('accessToken');
        }
    }, []);
    useEffect(() => {
        AOS.init({
            easing: 'ease-out-cubic',
            once: true,
            offset: 300,
        });
    }, []);
    return (
        <Provider store={store}>
            <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Layout token={tokenRef.current}>
                    <Component {...pageProps} token={tokenRef.current} />
                </Layout>
            </SnackbarProvider>
        </Provider>
    );
}

export default MyApp;
