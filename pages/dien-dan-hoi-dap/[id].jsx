import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as ta from 'time-ago';

//func
import { getQuestionById } from '../../services/questionService';
import { createAnswer, getAnswerByIdQuestion } from '../../services/answerService';
import { setQuestionDetail } from '../../redux/slice/questionSlice';
import { setLoadingLoadMore, setLoading, setLoadingDetail } from '../../redux/slice/loadingSlice';
import { addAnswer, setAllAnswers } from '../../redux/slice/answerSlice';

//components
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import Banner from '../../components/Banner';
import Seperate from '../../components/Seperate';
import Answer from './components/Answer';
import Pagination from '../../components/Pagination';
import formatDate from '../../utils/formatDate';
import { setShowFormLogin } from '../../redux/slice/modalSlice';

function DetailQuestion() {
    const token = useSelector((state) => state.token.accessToken);
    const loadingLoadMore = useSelector((state) => state.loading.loadingLoadMore);
    const loading = useSelector((state) => state.loading.loading);
    const loadingLoadDetail = useSelector((state) => state.loading.loadingLoadDetail);
    const questionDetail = useSelector((state) => state.question.questionDetail);
    const allAnsers = useSelector((state) => state.answer.allAnsers);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const tokenRef = useRef();
    const router = useRouter();
    const { id } = router?.query;
    const { enqueueSnackbar } = useSnackbar();
    const [currentPage, setCurrentPage] = useState(1);

    const itemPerPage = 10;
    const totalPage = Math.ceil(allAnsers?.length / itemPerPage);
    const lastIndex = currentPage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;

    console.log('all answers: ', tokenRef.current);

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

    const showModal = () => {
        dispatch(setShowFormLogin(true));
    };

    useEffect(() => {
        if (typeof window !== undefined) {
            tokenRef.current = localStorage.getItem('accessToken');
        } else {
            tokenRef.current = null;
        }
    }, [token]);

    const handleGetQuestionById = async () => {
        if (id !== undefined) {
            try {
                dispatch(setLoadingDetail(true));
                const res = await getQuestionById(id);
                if (!res.success) {
                    enqueueSnackbar(res.message, {
                        variant: 'error',
                        autoHideDuration: 2000,
                    });
                    dispatch(setLoadingDetail(false));
                    return;
                }
                // setQuestion(res.data);
                dispatch(setQuestionDetail(res?.data));
                dispatch(setLoadingDetail(false));
            } catch (error) {
                // console.log(error);
                dispatch(setLoadingDetail(false));
                enqueueSnackbar('Tải câu hỏi thất bại!', {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
            }
        }
    };

    useEffect(() => {
        handleGetQuestionById();
    }, [id]);

    useEffect(() => {
        const handleGetAnswerByIdQuestion = async () => {
            if (id) {
                try {
                    dispatch(setLoadingLoadMore(true));
                    const res = await getAnswerByIdQuestion(id);
                    if (res?.code === 'ERR_NETWORK') {
                        enqueueSnackbar('Lỗi kết nối server!', {
                            variant: 'error',
                            autoHideDuration: 2000,
                        });
                        dispatch(setLoadingLoadMore(false));
                        return;
                    }

                    if (res?.code === 'ERR_BAD_RESPONSE') {
                        // enqueueSnackbar(res?.response?.data?.message, {
                        //     variant: 'error',
                        //     autoHideDuration: 2000,
                        // });
                        dispatch(setLoadingLoadMore(false));
                        return;
                    }

                    if (res?.response?.status === 401) {
                        enqueueSnackbar(res?.response.data.message, {
                            variant: 'error',
                            autoHideDuration: 2000,
                        });
                        dispatch(setLoadingLoadMore(false));
                        return;
                    }

                    if (!res.success) {
                        enqueueSnackbar(res.message, {
                            variant: 'error',
                            autoHideDuration: 2000,
                        });
                        dispatch(setLoadingLoadMore(false));
                        return;
                    }
                    dispatch(setAllAnswers(res?.data));
                    dispatch(setLoadingLoadMore(false));
                } catch (error) {
                    dispatch(setLoadingLoadMore(false));
                    // console.log(error);
                    enqueueSnackbar('Tải danh sách câu trả lời thất bại!', {
                        variant: 'error',
                        autoHideDuration: 2000,
                    });
                }
            }
        };
        handleGetAnswerByIdQuestion();
    }, [id]);

    const handleSubmitForm = async (data) => {
        if (id) {
            try {
                dispatch(setLoading(true));
                const answer = {
                    content: data.content,
                    idQuestion: id,
                    time: Date.now(),
                };
                const res = await createAnswer(answer);
                if (!res.success) {
                    enqueueSnackbar(res?.message, {
                        variant: 'error',
                        autoHideDuration: 2000,
                    });
                    dispatch(setLoading(false));
                    return;
                }
                // setAnswers((prev) => [res?.data, ...prev]);
                dispatch(addAnswer(res?.data));
                enqueueSnackbar(res?.message, {
                    variant: 'success',
                    autoHideDuration: 2000,
                });
                reset({ content: '' });
                dispatch(setLoading(false));
            } catch (error) {
                dispatch(setLoading(false));
                enqueueSnackbar('Thêm câu trả lời thất bại!', {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
            }
        }
    };

    return (
        <>
            <Banner title="Diễn đàn" />
            <div className="container">
                {questionDetail && !loadingLoadDetail ? (
                    <div className="max-w-4xl p-5 mx-auto">
                        <div className="border border-[#ccc] shadow-md rounded-lg p-2">
                            <div className="flex gap-2 items-center mb-2 border-b border-[#ccc] pb-2">
                                <img
                                    src={questionDetail?.user?.anhdaidien}
                                    alt=""
                                    className="w-10 h-10 object-cover rounded-full"
                                />
                                <div className="">
                                    <h5 className="text-base font-medium text-primary1">
                                        {questionDetail?.user?.hoten}
                                    </h5>
                                    <p className="text-xs font-light italic">
                                        {formatDate(questionDetail?.question?.thoigian)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-base font-bold mb-3">{questionDetail?.question?.tieude}</h2>
                                <p>{questionDetail?.question?.noidung}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <Spinner />
                    </div>
                )}
            </div>
            <Seperate />
            <div className="container">
                <div className="max-w-4xl p-5 mx-auto">
                    {allAnsers &&
                        allAnsers.length > 0 &&
                        allAnsers
                            ?.slice(firstIndex, lastIndex)
                            .map((item) => (
                                <Answer
                                    key={item?.answer?._id}
                                    avatar={item?.user?.anhdaidien}
                                    time={item?.answer?.thoigian}
                                    name={item?.user?.hoten}
                                    content={item?.answer?.noidung}
                                />
                            ))}
                </div>
                {allAnsers && allAnsers.length > 0 && (
                    <Pagination
                        firstIndex={firstIndex}
                        lastIndex={lastIndex}
                        total={allAnsers?.length}
                        handleNextPage={handleNextPage}
                        handlePrePage={handlePrePage}
                        totalPage={totalPage}
                        currentPage={currentPage}
                    />
                )}
                {loadingLoadMore && (
                    <div className="w-full flex justify-center">
                        <Spinner />
                    </div>
                )}
            </div>
            <div className="container">
                <div className="max-w-4xl p-5 mx-auto">
                    <h1 className="text-xl font-medium p-5 bg-[#ccc]/20 rounded-lg mb-5 text-primary1">
                        Hãy để lại câu trả lời của bạn để góp phần chia sẻ kinh nghiệm đến với mọi người{' '}
                    </h1>
                    {token || tokenRef.current ? (
                        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
                            <textarea
                                placeholder="Nhập câu trả lời..."
                                className="form-input"
                                rows={4}
                                {...register('content', { required: 'Hãy nhập câu trả lời của bạn!' })}
                            />
                            {errors?.content && <ErrorMessage mess={errors?.content?.message} />}
                            <button
                                className="py-2 px-4 text-primary1 border border-primary1 rounded-lg text-base font-semibold mt-5 btn-disabled"
                                disabled={loading}
                            >
                                {loading ? <Spinner /> : 'Gửi'}
                            </button>
                        </form>
                    ) : (
                        <h3 className="p-5 text-base font-light bg-[#ccc]/20 ">
                            Hãy{' '}
                            <button onClick={showModal}>
                                <span className="font-medium text-primary1 cursor-pointer">đăng nhập</span>
                            </button>{' '}
                            để trả lời
                        </h3>
                    )}
                </div>
            </div>
        </>
    );
}

export default DetailQuestion;
