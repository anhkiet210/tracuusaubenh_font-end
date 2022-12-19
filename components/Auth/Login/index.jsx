import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//func
import { setLoading } from '../../../redux/slice/loadingSlice';
import { setTokenRedux } from '../../../redux/slice/tokenSlice';
import { setShowPass } from '../../../redux/slice/modalSlice';
import { handleLogin } from '../../../services/authService';

//components
import { setToken } from '../../../utils/jwt';
import { setItem } from '../../../utils/localStorage';
import ErrorMessage from '../../ErrorMessage';
import Spinner from '../../Spinner';
import { setShowFormLogin } from '../../../redux/slice/modalSlice';
import { useState } from 'react';

function Login({ handleChangeForm }) {
    const showPass = useSelector((state) => state.modal.showPass);
    const loading = useSelector((state) => state.loading.loading);
    const infoLogin = useSelector((state) => state.user.infoLogin);
    const dispatch = useDispatch();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    // const validEmail = '/^[w-.]+@([w-]+.)+[w-]{2,4}$/';
    const schema = yup.object().shape({
        email: yup.string().required('Hãy nhập email!'),
        password: yup
            .string()
            .required('Hãy nhập mật khẩu')
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
            .max(20, 'Mật khẩu không được vượt quá 20 ký tự'),
    });
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { email: infoLogin?.email, password: infoLogin?.password },
    });

    useEffect(() => {
        if (typeof window !== undefined) {
            if (localStorage.getItem('accessToken')) {
                router.replace('/');
            }
        }
    }, []);

    const onSubmitLogin = async (data) => {
        try {
            dispatch(setLoading(true));
            const info = {
                email: data.email,
                password: data.password,
            };
            const res = await handleLogin(info);
            // console.log('đăng nhập: ', res);
            if (res?.code === 'ERR_NETWORK') {
                enqueueSnackbar('Lỗi kết nối server!', {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoading(false));
                return;
            }
            if (res?.code === 'ERR_BAD_RESPONSE') {
                enqueueSnackbar(res?.response?.data?.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoading(false));
                return;
            }
            if (res?.code === 'ERR_BAD_REQUEST') {
                enqueueSnackbar(res?.response?.data?.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoading(false));
                return;
            }
            if (res?.success) {
                setToken(res?.accessToken);
                setItem('accessToken', res?.accessToken);
                dispatch(setTokenRedux(res?.accessToken));
                enqueueSnackbar(res.message, {
                    variant: 'success',
                    autoHideDuration: 2000,
                });
                dispatch(setLoading(false));
                dispatch(setShowFormLogin(false));
                reset({ email: '', password: '' });
                return;
            }
        } catch (error) {
            // console.log(error);
            dispatch(setLoading(false));
            enqueueSnackbar('Đăng nhập thất bại!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    const handleCommingSoon = () => {
        enqueueSnackbar('Chức năng đăng được cập nhật!', {
            variant: 'warning',
            autoHideDuration: 2000,
        });
    };

    return (
        <>
            <div className="animate-toLeft-hand">
                <form
                    className="mb-4 w-full "
                    onSubmit={handleSubmit((data) => onSubmitLogin(data))}
                    autoComplete="off"
                >
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register('email')}
                            id="email"
                            className="form-input"
                            placeholder="Ví dụ: abc@gmail.com"
                        />
                        {errors.email && <ErrorMessage mess={errors.email?.message} />}
                    </div>
                    <div className="mb-4 ">
                        <label className="form-label text-white">Mật khẩu</label>
                        <div className="relative">
                            <input
                                type={showPass ? 'text' : 'password'}
                                {...register('password')}
                                id="password"
                                className="form-input "
                                placeholder="*****"
                            />

                            <div
                                className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-sm leading-5"
                                onClick={() => {
                                    dispatch(setShowPass(!showPass));
                                }}
                            >
                                {showPass ? (
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
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                ) : (
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
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                        {errors.password && <ErrorMessage mess={errors.password?.message} />}
                    </div>
                    <button type="submit" className="btn-submit bg-white btn-disabled" disabled={loading}>
                        {loading ? <Spinner /> : 'Đăng nhập'}
                    </button>
                </form>
                <p className="mt-4 text-xs font-light text-white italic">
                    *Nếu bạn chưa có tài khoản hãy chọn{' '}
                    <button
                        className="py-2 px-4 font-medium border-[1px] text-white not-italic rounded-lg hover:bg-primary1 hover:text-white hover:border-primary1 transition duration-500"
                        onClick={handleChangeForm}
                    >
                        Đăng ký
                    </button>
                </p>
                <div className="h-[1px] bg-gray-100 my-5"></div>
                <div className="mt-3">
                    <button className="btn-submit text-center w-full bg-white border-white" onClick={handleCommingSoon}>
                        Đăng nhập bằng Google
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login;
