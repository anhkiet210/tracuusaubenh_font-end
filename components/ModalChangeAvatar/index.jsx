import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

//func
import { changeAvatar } from '../../services/userService';
import { setCurrentUser } from '../../redux/slice/userSlice';
import { setLoadingAvatar } from '../../redux/slice/loadingSlice';
import { setShowFormChangeAvatar } from '../../redux/slice/modalSlice';

//components
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessage';
import Spinner from '../Spinner';

function FormChangeAvatar() {
    const loadingAvatar = useSelector((state) => state.loading.loadingAvatar);
    const dispatch = useDispatch();
    const [imgView, setImgView] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const schema = yup.object().shape({
        img: yup.mixed().test('required', 'Hãy chọn ảnh đại diện!', (value) => value && value.length),
    });
    const {
        register,
        watch,
        reset,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const imgTest = watch('img');
    const name = watch('name');
    const phone = watch('phone');
    const handleConvertBase64 = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImgView(reader.result.toString());
        };
        reader.readAsDataURL(file);
    };

    const handleSelectAgain = () => {
        reset({ img: '' });
    };
    useEffect(() => {
        if (imgTest && imgTest.length > 0) {
            handleConvertBase64(imgTest[0]);
        }
    }, [watch('img')]);

    const handleCloseForm = () => {
        dispatch(setShowFormChangeAvatar(false));
    };

    const handleSubmitForm = async (data) => {
        try {
            dispatch(setLoadingAvatar(true));
            const formData = new FormData();
            formData.append('file', data.img[0]);
            const res = await changeAvatar(formData);
            // console.log("res: ", res);
            if (res?.code === 'ERR_NETWORK') {
                enqueueSnackbar('Lỗi kết nối server!', {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingAvatar(false));
                return;
            }

            if (res?.code === 'ERR_BAD_RESPONSE') {
                enqueueSnackbar(res?.response?.data?.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingAvatar(false));
                return;
            }

            if (res?.response?.status === 401) {
                enqueueSnackbar(res?.response.data.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingAvatar(false));
                return;
            }

            dispatch(setCurrentUser(res?.data));
            enqueueSnackbar(res?.message, {
                variant: 'success',
                autoHideDuration: 2000,
            });

            dispatch(setLoadingAvatar(false));
            dispatch(setShowFormChangeAvatar(false));
            reset({ img: '' });
        } catch (error) {
            console.log(error);
            dispatch(setLoadingAvatar(false));
            enqueueSnackbar('Đổi ảnh đại diện thất bại!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    return (
        <>
            <Modal title="Đổi ảnh đại diện" handleClose={handleCloseForm}>
                <form autoComplete="off" onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className="form-group">
                        <label className="form-label">Hãy chọn ảnh đại diện</label>
                        <div className="flex items-center flex-col justify-center w-full gap-4 duration-200">
                            {!watch('img') || watch('img').length === 0 ? (
                                <>
                                    <label className="flex flex-col w-1/2 h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 animate-toLeft-hand">
                                        <div className="flex flex-col items-center justify-center pt-7">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 text-center">
                                                Click vào đây để thêm ảnh
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="opacity-0 hidden"
                                            {...register('img')}
                                            // onChange={(event) => handleImgChange(event)}
                                            accept=".jpg, .png, .jpeg"
                                        />
                                    </label>
                                    {errors?.img && <ErrorMessage mess={errors?.img?.message} />}
                                </>
                            ) : (
                                <div className="w-1/2 animate-toLeft-hand">
                                    <img src={imgView} alt="" className="w-full object-contain" />
                                    <button className="btn-submit w-full mt-3 bg-white" onClick={handleSelectAgain}>
                                        Chọn lại
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <button
                            type="submit"
                            className="btn-submit bg-white mt-3 btn-disabled"
                            disabled={loadingAvatar}
                        >
                            {loadingAvatar ? <Spinner /> : 'Lưu'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default FormChangeAvatar;
