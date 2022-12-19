import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

//func
import { setLoading } from '../../../redux/slice/loadingSlice';
import { setShowPass } from '../../../redux/slice/modalSlice';
import { handleRegister } from '../../../services/authService';
import { setInfoLogin } from '../../../redux/slice/userSlice';

//components
import ErrorMessage from '../../ErrorMessage';
import Spinner from '../../Spinner';

function Register({ handleChangeForm }) {
    const dispatch = useDispatch();
    const showPass = useSelector((state) => state.modal.showPass);
    const loading = useSelector((state) => state.loading.loading);
    const { enqueueSnackbar } = useSnackbar();
    const phoneRegex = '/^(+?d{0,4})?s?-?s?((?d{3})?)s?-?s?((?d{3})?)s?-?s?((?d{4})?)?$/';

    const schema = yup.object().shape({
        name: yup.string().required('Hãy nhập họ tên!').min(4, 'Tên quá ngắn!'),
        email: yup.string().required('Hãy nhập email!'),
        phone: yup
            .string()
            .required('Hãy nhập số điện thoại')
            .matches('[0-9]{3}[0-9]', 'Hãy nhập đúng định dạng số điện thoại!')
            .length(10, 'Số điện thoại phải đủ 10 số!'),
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
    } = useForm({ resolver: yupResolver(schema) });

    const handleSubmitForm = async (data) => {
        try {
            dispatch(setLoading(true));
            const info = {
                email: data.email,
                password: data.password,
                phone: data.phone,
                name: data.name,
            };
            const res = await handleRegister(info);
            // console.log('đăng ký: ', res);
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
                enqueueSnackbar(res.message, {
                    variant: 'success',
                    autoHideDuration: 2000,
                });
                dispatch(setInfoLogin({ email: data.email, password: data.password }));
                dispatch(setLoading(false));
                handleChangeForm();
                reset({ email: '', password: '', name: '', phone: '' });
                return;
            }
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            enqueueSnackbar('Đăng ký tài khoản thất bại!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };
    return (
        <>
            <div className="w-full md:p-5 animate-toLeft-hand">
                <form onSubmit={handleSubmit(handleSubmitForm)} autoComplete="off">
                    <div className="form-group">
                        <label className="form-label text-white">Họ tên</label>
                        <input type="text" className="form-input" placeholder="Nhập họ tên..." {...register('name')} />
                        {errors?.name && <ErrorMessage mess={errors?.name?.message} />}
                    </div>
                    <div className="form-group">
                        <label className="form-label text-white">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Ví dụ: abc@gmail.com"
                            {...register('email')}
                        />
                        {errors?.email && <ErrorMessage mess={errors?.email?.message} />}
                    </div>
                    <div className="form-group">
                        <label className="form-label text-white">Số điện thoại</label>
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Nhập số điện thoại..."
                            {...register('phone')}
                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        />
                        {errors?.phone && <ErrorMessage mess={errors?.phone?.message} />}
                    </div>
                    <div className="mb-4">
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
                    <div className="form-group flex h-auto item-center justify-between">
                        <button className="btn-submit bg-white btn-disabled" disabled={loading}>
                            {loading ? <Spinner /> : 'Đăng ký'}
                        </button>
                        <button
                            type="button"
                            className="py-2 px-4 text-sm uppercase border border-white rounded-lg mt-5 font-medium text-white transition duration-500 hover:bg-white hover:text-primary1"
                            onClick={handleChangeForm}
                        >
                            Quay lại
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;
