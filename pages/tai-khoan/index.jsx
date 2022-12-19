import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

//func
import { setCurrentUser } from '../../redux/slice/userSlice';

//components
import Banner from '../../components/Banner';
import CardAccount from '../../components/Cards/CardAccount';
import CardMyPosts from '../../components/Cards/CardMyPosts';
import CardPostPending from '../../components/Cards/CardPostPending';
import CardPostDenied from '../../components/Cards/CardPostDenied';

const listItem = [
    {
        id: 1,
        name: 'Thông tin cá nhân',
    },
    {
        id: 2,
        name: 'Bài viết của tôi',
    },
    {
        id: 3,
        name: 'Bài viết chờ duyệt',
    },
    {
        id: 4,
        name: 'Bài viết bị từ chối',
    },
];

function MyAccount() {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    // console.log('account: ', user);
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm();
    const [active, setActive] = useState(1);

    const handleChangeTab = (id) => {
        setActive(id);
        typeof window !== undefined && localStorage.setItem('active', id);
    };

    useEffect(() => {
        if (typeof window !== undefined) {
            const tokenLocal = localStorage.getItem('accessToken');
            if (!user && !tokenLocal) {
                Router.push('/');
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== undefined) {
            const temp = Number(localStorage.getItem('active'));
            if (!temp) {
                setActive(1);
            } else {
                setActive(temp);
            }
        } else {
            setActive(1);
        }
    }, [active]);

    // console.log('active: ', active);

    return (
        <>
            <Banner title="Tài khoản" />
            <div className="container p-5 grid grid-cols-12 gap-5 md:gap-0">
                <div className="md:p-5 col-span-full lg:col-span-2 ">
                    <ul className="flex flex-row gap-2 flex-wrap rounded-xl overflow-hidden font-semibold md:justify-around lg:w-full lg:gap-0">
                        {listItem.map((item) => (
                            <li
                                key={item.id}
                                className={`w-full text-center text-base p-2 hover:bg-slate-500 rounded-lg hover:text-white  duration-[400] md:w-auto lg:w-full lg:text-xl cursor-pointer lg:text-left  ${
                                    item.id === active ? 'bg-slate-800 text-white' : 'text-slate-800'
                                }`}
                                onClick={() => {
                                    handleChangeTab(item.id);
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="md:p-5 col-span-full w-full lg:col-span-10">
                    {active === 1 && <CardAccount />}
                    {active === 2 && <CardMyPosts />}
                    {active === 3 && <CardPostPending />}
                    {active === 4 && <CardPostDenied />}
                </div>
            </div>
        </>
    );
}

export default MyAccount;
