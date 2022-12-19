import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../img/logo.png';

//func
import { setShowFormChangeAvatar, setShowFormLogin } from '../../../redux/slice/modalSlice';
import { setCurrentUser } from '../../../redux/slice/userSlice';
import { setTokenRedux } from '../../../redux/slice/tokenSlice';

const listMenu = [
    {
        name: 'Trang chủ',
        link: '/',
    },
    {
        name: 'Tra cứu sâu bệnh',
        link: '/tra-cuu-sau-benh',
    },
    {
        name: 'Diễn đàn hỏi đáp',
        link: '/dien-dan-hoi-dap',
    },
    {
        name: 'Cẩm nang trồng trọt',
        link: '/cam-nang-trong-trot',
    },
];

const listActionAcc = [
    {
        id: 1,
        name: 'Thông tin tài khoản',
        link: '/tai-khoan',
    },
    // {
    //     id: 2,
    //     name: 'Bài viết của tôi',
    //     link: '/bai-viet-cua-toi',
    // },
];

function Header() {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const router = useRouter();
    const menuRef = useRef();
    const menuIconRef = useRef();
    const closeIconRef = useRef();
    const wrapMenuRef = useRef();
    const [action, setAction] = useState(false);

    // console.log('header token', props?.token);
    // console.log('header user', user);

    const handleShowMenu = () => {
        menuRef.current.classList.toggle('hide');
        menuIconRef.current.classList.toggle('opacity-0');
        closeIconRef.current.classList.toggle('opacity-0');
        setAction(false);
    };

    const handleShowAction = () => {
        menuRef.current.classList.add('hide');
        menuIconRef.current.classList.remove('opacity-0');
        closeIconRef.current.classList.add('opacity-0');
        setAction(!action);
    };

    const handleScroll = () => {
        if (window) {
            if (window.scrollY > 0) {
                wrapMenuRef.current.classList.remove('no-scroll');
                wrapMenuRef.current.classList.add('md:bg-[#31342b]');
            } else {
                wrapMenuRef.current.classList.remove('md:bg-[#31342b]');
                wrapMenuRef.current.classList.add('no-scroll');
            }
        }
    };

    const showModal = () => {
        dispatch(setShowFormLogin(true));
    };

    const handleCloseAction = () => {
        setAction(false);
    };

    const logout = () => {
        try {
            if (typeof window !== undefined) {
                localStorage.clear();
                dispatch(setCurrentUser(null));
                dispatch(setTokenRedux(null));
                handleCloseAction();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowFormChangeAvatar = () => {
        dispatch(setShowFormChangeAvatar(true));
        setAction(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div
                className="w-full bg-[#31342b] px-8 md:fixed md:z-[999] no-scroll transition duration-500"
                ref={wrapMenuRef}
                id="wrapMenuRef"
            >
                <div className="container">
                    <nav className="flex items-center justify-between lg:justify-around">
                        <div className="w-32 md:w-52 z-50">
                            <Link href={'/'}>
                                <Image src={logo} alt="Logo" className="w-full" />
                            </Link>
                        </div>
                        <ul
                            className="fixed top-0 left-0 flex-col items-center justify-center z-10 w-full h-screen bg-[#000] bg-opacity-90 gap-6 transition duration-500 flex lg:bg-opacity-0 lg:h-auto lg:static lg:flex-row hide lg:justify-center lg:gap-16 lg:opacity-100 lg:flex-1 lg:transform-none opacity-100 "
                            ref={menuRef}
                        >
                            {listMenu.map((item, index) => (
                                <li
                                    className={`text-white uppercase hover:text-primary transition duration-500 font-medium text-sm ${
                                        router.pathname.indexOf(item.link) !== -1 && 'text-primary'
                                    }`}
                                    key={index}
                                    onClick={handleShowMenu}
                                >
                                    <Link href={item.link}>
                                        <a>{item.name}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-3 lg:gap-0 items-center relative">
                            <div className="w-10 md:w-auto">
                                {user ? (
                                    <div className="">
                                        <div
                                            className="md:flex md:items-center md:gap-2 cursor-pointer select-none z-[99] hover:bg-white transition duration-500 rounded-full lg:rounded-xl hover:bg-opacity-20 lg:py-1 lg:px-2 relative"
                                            onClick={handleShowAction}
                                        >
                                            <img
                                                src={user?.anhdaidien}
                                                // alt="Ảnh đại diện"
                                                className="w-10 h-10 object-cover rounded-full"
                                            />
                                            <span className="hidden lg:inline-block text-base font-semibold text-white lg:max-w-[150px] lg:overflow-hidden lg:text-ellipsis lg:whitespace-nowrap">
                                                {user?.hoten}
                                            </span>
                                        </div>
                                        {action && (
                                            <ul className="fixed top-0 left-0 flex-col items-center justify-center z-20 w-full h-screen bg-[#000] bg-opacity-80 gap-6 transition duration-500 flex lg:bg-white  lg:bg-opacity-80 lg:h-auto lg:flex-col lg:absolute lg:gap-2 lg:w-max lg:-translate-x-16 lg:mt-1 lg:p-3 lg:rounded-lg lg:top-[102%] lg:right-[102%] lg:shadow-2xl animate-toLeft-hand lg:animate-fadeIn-hand">
                                                {listActionAcc.map((item) => (
                                                    <li
                                                        className="text-white p-2 rounded-lg  transition duration-500 font-medium text-base hover:bg-black/50 lg:w-full lg:text-slate-900"
                                                        key={item.id}
                                                        onClick={handleCloseAction}
                                                    >
                                                        <Link href={item.link}>{item.name}</Link>
                                                    </li>
                                                ))}
                                                <li
                                                    className="text-white p-2 rounded-lg  transition duration-500 font-medium text-base hover:bg-black/50 lg:w-full lg:text-slate-900 text-center cursor-pointer"
                                                    onClick={handleShowFormChangeAvatar}
                                                >
                                                    Đổi ảnh đại diện
                                                </li>
                                                <li
                                                    className="flex gap-1 items-center justify-center text-white p-2 rounded-lg  transition duration-500 font-medium text-base hover:bg-black/50 lg:w-full cursor-pointer lg:text-slate-900"
                                                    onClick={logout}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                                        />
                                                    </svg>
                                                    <span>Đăng xuất</span>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={showModal}
                                        className="flex items-center gap-1 text-white"
                                        title="Đăng nhập"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                            />
                                        </svg>
                                        <span className="hidden lg:inline-block text-base font-semibold text-white">
                                            Đăng nhập
                                        </span>
                                    </button>
                                )}
                            </div>
                            <div
                                className="text-white z-50 lg:opacity-0 lg:hidden cursor-pointer relative"
                                onClick={handleShowMenu}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8 transition duration-500 absolute"
                                    ref={menuIconRef}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8 opacity-0 transition duration-500"
                                    ref={closeIconRef}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Header;
