import dynamic from 'next/dynamic';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

//func
import { setLoading } from '../../redux/slice/loadingSlice';
import { createPost } from '../../services/postService';
import { setShowFormCreatePost } from '../../redux/slice/modalSlice';

//component
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessage';
import Spinner from '../Spinner';
import { addPost } from '../../redux/slice/postSlice';

const Editor = dynamic(() => import('./components/Editor'), { ssr: false });

function FormCreatePost({ showModal }) {
    const [imgView, setImgView] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading.loading);
    const schema = yup.object().shape({
        title: yup.string().required('Hãy nhập tiêu đề cho bài viết!'),
        img: yup.mixed().test('required', 'Hãy chọn ảnh cho bài viết này!', (value) => value && value.length),
        content: yup.string().required('Hãy nhập nội dung cho bài viết!'),
    });
    const {
        register,
        watch,
        reset,
        setValue,
        trigger,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });
    const imgTest = watch('img');

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

    const handCloseModal = () => {
        dispatch(setShowFormCreatePost(false));
        reset({ tile: '', img: '', content: '' });
    };

    const handleChange = (e, editor) => {
        setValue('content', editor.getData());
        trigger('content');
    };

    const handleSubmitForm = async (data) => {
        try {
            dispatch(setLoading(true));
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('file', data.img[0]);
            formData.append('time', Date.now());
            const res = await createPost(formData);
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

            if (res?.response?.status === 401) {
                enqueueSnackbar(res?.response.data.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoading(false));
                return;
            }
            if (!res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoading(false));
                return;
            }
            enqueueSnackbar(res?.message, {
                variant: 'success',
                autoHideDuration: 2000,
            });
            // console.log('res: ', res);
            dispatch(setLoading(false));
            handCloseModal();
        } catch (error) {
            dispatch(setLoading(false));
            enqueueSnackbar('Thêm bài viết thất bại!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    return (
        <>
            <Modal title="Thêm bài viết" handleClose={handCloseModal}>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className="form-group">
                        <h3 className="form-label text-white">Tiêu đề</h3>
                        <input
                            type="text"
                            placeholder="Nhập tiêu đề bài viết..."
                            className="form-input"
                            {...register('title')}
                        />
                        {errors?.title && <ErrorMessage mess={errors?.title?.message} />}
                    </div>
                    <div className="form-group">
                        <label className="form-label text-white">Hãy chọn ảnh cho bài viết</label>
                        <div className="flex items-center justify-center flex-col w-full duration-200">
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
                                            accept=".jpg, .png, .jpeg"
                                        />
                                    </label>
                                    {errors?.img && <ErrorMessage mess={errors?.img?.message} />}
                                </>
                            ) : (
                                <div className="w-1/2 animate-toLeft-hand">
                                    <img src={imgView} alt="" className="w-full object-contain" />
                                    <button className="btn-submit w-full bg-white" onClick={handleSelectAgain}>
                                        Chọn lại
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <h3 className="form-label text-white">Nội dung</h3>
                        <Editor {...register('content')} onChange={handleChange} />
                        {errors?.content && <ErrorMessage mess={errors?.content?.message} />}
                    </div>
                    <button className="btn-submit bg-white btn-disabled" type="submit" disabled={loading}>
                        {loading ? <Spinner /> : 'Đăng bài'}
                    </button>
                </form>
            </Modal>
        </>
    );
}

export default FormCreatePost;
