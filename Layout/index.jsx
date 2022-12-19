import Header from './components/Header';
import Footer from './components/Footer';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

//func
import { getUserInfo } from '../services/userService';
import { setCurrentUser } from '../redux/slice/userSlice';

//components
import Auth from '../components/Auth';
import ButtonScrollToTop from '../components/ButtonScrollToTop';
import { setTokenRedux } from '../redux/slice/tokenSlice';
import FormChangeAvatar from '../components/ModalChangeAvatar';

function Layout({ children }) {
    const dispatch = useDispatch();
    const tokenRedux = useSelector((state) => state.token.accessToken);
    const showFormChangeAvatar = useSelector((state) => state.modal.showFormChangeAvatar);
    const { enqueueSnackbar } = useSnackbar();
    const [token, setToken] = useState(null);
    const showModal = useSelector((state) => state.modal.showFormLogin);
    const isToken = tokenRedux || token;
    // console.log('token layout: ', showModal);
    const handleGetUserInfo = async () => {
        try {
            const res = await getUserInfo();
            // console.log('res: ', res);
            if (res?.code === 'ERR_NETWORK') {
                enqueueSnackbar('Lỗi kết nối server!', {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                return;
            }
            if (res?.code === 'ERR_BAD_RESPONSE') {
                // enqueueSnackbar(res?.response?.data?.message, {
                //     variant: 'error',
                //     autoHideDuration: 2000,
                // });
                localStorage.removeItem('accessToken');
                dispatch(setTokenRedux(null));
                return;
            }
            if (res?.code === 'ERR_BAD_REQUEST') {
                // enqueueSnackbar(res?.response?.data?.message, {
                //     variant: 'error',
                //     autoHideDuration: 2000,
                // });
                localStorage.removeItem('accessToken');
                dispatch(setTokenRedux(null));
                return;
            }
            // console.log('layout', res);
            dispatch(setCurrentUser(res?.user));
        } catch (error) {
            localStorage.removeItem('accessToken');
            dispatch(setTokenRedux(null));
            enqueueSnackbar('Lỗi khi tải thông tin người dùng!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    useEffect(() => {
        if (typeof window !== undefined) {
            if (localStorage.getItem('accessToken')) {
                setToken(JSON.stringify(localStorage.getItem('accessToken')));
            } else {
                setToken(false);
            }
        }
    }, []);

    useEffect(() => {
        if (isToken) {
            handleGetUserInfo();
        }
    }, [isToken]);

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="description" content="Build demo website Tracuusaubenh" />
                <meta name="keywords" content="Tra cứu sâu bệnh" />
                <meta name="author" content="ak" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>tracuusaubenh</title>
                <link
                    rel="icon"
                    href="https://res.cloudinary.com/ak210/image/upload/v1667751701/ak-tracuusaubenh/Screenshot_2022-09-02_152018-removebg-preview_1_meicoh.png"
                />
            </Head>
            <Header />
            {children}
            {showModal && <Auth />}
            <Footer />
            <ButtonScrollToTop />
            {showFormChangeAvatar && <FormChangeAvatar />}
        </>
    );
}

export default Layout;
