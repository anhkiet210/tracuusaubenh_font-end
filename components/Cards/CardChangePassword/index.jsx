import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

//func
import { setLoadingDetail } from '../../../redux/slice/loadingSlice';
import { changePassword } from '../../../services/userService';

// components
import Spinner from '../../Spinner';
import ErrorMessage from '../../ErrorMessage';

export default function CardChangePassword() {
    const user = useSelector((state) => state.user.currentUser);
    const loadingDetail = useSelector((state) => state.loading.loadingDetail);
    // console.log("user: ", user);
    const [imgView, setImgView] = useState('');

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        password: yup
            .string()
            .required('Hãy nhập mật khẩu')
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
            .max(20, 'Mật khẩu không được vượt quá 20 ký tự'),
        newPassword: yup
            .string()
            .nullable(true)
            // .transform((o, c) => (o === '' ? o : c))
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
            .max(20, 'Mật khẩu không được vượt quá 20 ký tự'),
        comfirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Mật khẩu xác nhận không đúng'),
    });

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleChangePassword = async (data) => {
        try {
            dispatch(setLoadingDetail(true));
            console.log('data: ', data);
            const info = {
                currentPassword: data.password,
                newPassword: data.newPassword,
            };
            const res = await changePassword(info);
            //   console.log("change pass: ", res);
            if (res?.code === 'ERR_NETWORK') {
                enqueueSnackbar('Lỗi kết nối server!', {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingDetail(false));
                return;
            }

            if (res?.code === 'ERR_BAD_RESPONSE') {
                enqueueSnackbar(res?.response?.data?.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingDetail(false));
                return;
            }

            if (res?.response?.status === 401) {
                enqueueSnackbar(res?.response.data.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingDetail(false));
                return;
            }
            dispatch(setLoadingDetail(false));
            enqueueSnackbar(res?.message, {
                variant: 'success',
                autoHideDuration: 2000,
            });
            reset({ password: '', newPassword: '', comfirmPassword: '' });
        } catch (error) {
            dispatch(setLoadingDetail(false));
            enqueueSnackbar('Lỗi đổi mật khẩu!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    return (
        <>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(handleChangePassword)}>
                    <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">Đổi mật khẩu</h6>
                    <div className="w-full lg:w-6/12 md:px-4 mt-3">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                                Mật khẩu hiện tại
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                            {errors?.password && <ErrorMessage mess={errors?.password?.message} />}
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 md:px-4 mt-3">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                                Mật khẩu mới
                            </label>
                            <input
                                {...register('newPassword')}
                                type="password"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                            {errors?.newPassword && <ErrorMessage mess={errors?.newPassword?.message} />}
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 md:px-4 mt-3">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                                Xác nhận mật khẩu mới
                            </label>
                            <input
                                {...register('comfirmPassword')}
                                type="password"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                            {errors?.comfirmPassword && <ErrorMessage mess={errors?.comfirmPassword?.message} />}
                        </div>
                    </div>
                    <button className="btn-submit mt-3 btn-disabled" disabled={loadingDetail}>
                        {loadingDetail ? <Spinner /> : 'Lưu'}
                    </button>
                </form>
            </div>
        </>
    );
}
