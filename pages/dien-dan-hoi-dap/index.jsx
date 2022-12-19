import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

//func
import { setShowFormLogin } from '../../redux/slice/modalSlice';
import { setLoadingLoadMore, setLoading } from '../../redux/slice/loadingSlice';
import { CreateQueston, getAllQuestion } from '../../services/questionService';
import { addQuestion, setAllQuestions } from '../../redux/slice/questionSlice';

//components
import Question from './components/Question';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import Seperate from '../../components/Seperate';
import Banner from '../../components/Banner';
import Pagination from '../../components/Pagination';

function AskAnswer() {
    const loading = useSelector((state) => state.loading.loading);
    const loadingLoadMore = useSelector((state) => state.loading.loadingLoadMore);
    const token = useSelector((state) => state.token.accessToken);
    const listQuestion = useSelector((state) => state.question.allQuestions);
    const { enqueueSnackbar } = useSnackbar();
    // const [listQuestion, setListQuestion] = useState([]);
    const tokenRef = useRef('');
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const itemPerPage = 10;
    const totalPage = Math.ceil(listQuestion?.length / itemPerPage);
    const lastIndex = currentPage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (typeof window !== undefined) {
            tokenRef.current = localStorage.getItem('accessToken');
        } else {
            tokenRef.current = null;
        }
    });

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrePage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        const handleGetAllQuestion = async () => {
            try {
                dispatch(setLoadingLoadMore(true));
                const res = await getAllQuestion();
                if (!res.success) {
                    enqueueSnackbar(res.message, {
                        variant: 'error',
                        autoHideDuration: 2000,
                    });
                    dispatch(setLoadingLoadMore(false));
                    return;
                }
                dispatch(setAllQuestions(res?.data));
                dispatch(setLoadingLoadMore(false));
            } catch (error) {
                dispatch(setLoadingLoadMore(false));
                enqueueSnackbar('Tải danh sách câu hỏi thất bại!', {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
            }
        };
        handleGetAllQuestion();
    }, []);

    const handleSubmitForm = async (data) => {
        try {
            dispatch(setLoading(true));
            const question = {
                title: data.title,
                content: data.content,
                time: Date.now(),
            };
            const res = await CreateQueston(question);
            if (!res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoading(false));
                return;
            }

            dispatch(addQuestion(res?.data));
            enqueueSnackbar(res.message, {
                variant: 'success',
                autoHideDuration: 2000,
            });
            reset({ title: '', content: '' });
            dispatch(setLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            enqueueSnackbar('Thêm câu hỏi thất bại!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };
    return (
        <>
            <Banner title={'Diễn đàn'} />
            <div className="container mt-5">
                {token || tokenRef.current ? (
                    <div className="max-w-4xl p-5 mx-auto border border-[#ccc] shadow-lg rounded-lg">
                        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
                            <div className="">
                                <h3 className="form-label">Tiêu đề</h3>
                                <input
                                    type="text"
                                    placeholder="Nhập tiêu đề....."
                                    className="form-input"
                                    {...register('title')}
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="form-label">Nội dung</h3>
                                <textarea
                                    type="text"
                                    placeholder="Nhập nội dung câu hỏi....."
                                    className="form-input"
                                    rows={4}
                                    {...register('content', {
                                        required: 'Hãy nhập nội dung!',
                                    })}
                                />
                                {errors.content && <ErrorMessage mess={errors.content?.message} />}
                            </div>
                            <button type="submit" className="btn-submit btn-disabled" disabled={loading}>
                                {loading ? <Spinner /> : 'Gửi'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="max-w-4xl p-5 mx-auto">
                        <h3 className="p-5 text-base font-light bg-[#ccc]/20 rounded-lg shadow-md">
                            Hãy{' '}
                            <button
                                className="font-medium text-primary1 focus:outline-none"
                                onClick={() => dispatch(setShowFormLogin(true))}
                            >
                                đăng nhập
                            </button>{' '}
                            để đặt câu hỏi
                        </h3>
                    </div>
                )}
            </div>
            <Seperate />
            <div className="container mb-5">
                <div className="max-w-4xl p-5 mx-auto">
                    {listQuestion &&
                        listQuestion
                            ?.slice(firstIndex, lastIndex)
                            .map((item) => (
                                <Question
                                    key={item?.question?._id}
                                    title={item?.question?.tieude}
                                    avatar={item?.user?.anhdaidien}
                                    name={item?.user?.hoten}
                                    idQuestion={item?.question?._id}
                                />
                            ))}
                    {loadingLoadMore && (
                        <div className="w-full flex justify-center">
                            <Spinner />
                        </div>
                    )}
                </div>
                {listQuestion && listQuestion.length > 0 && (
                    <Pagination
                        firstIndex={firstIndex}
                        lastIndex={lastIndex}
                        total={listQuestion?.length}
                        handleNextPage={handleNextPage}
                        handlePrePage={handlePrePage}
                        totalPage={totalPage}
                        currentPage={currentPage}
                    />
                )}
            </div>
        </>
    );
}

export default AskAnswer;
