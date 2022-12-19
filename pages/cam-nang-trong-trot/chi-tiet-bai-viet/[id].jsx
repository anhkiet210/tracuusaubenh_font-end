import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

//func
import { setPostDetail, setPostManyViews } from '../../../redux/slice/postSlice';
import { getPostDetail, getPostManyViews } from '../../../services/postService';
import { setLoadingLoadMore, setLoadingDetail } from '../../../redux/slice/loadingSlice';
import formatDate from '../../../utils/formatDate';

//components
import Banner from '../../../components/Banner';
import Spinner from '../../../components/Spinner';
import Seperate from '../../../components/Seperate';
import Post from '../components/Post';
import Skeleton from '../../../components/Skeleton';

function PostDetail() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = router.query;
    const postDetail = useSelector((state) => state.post.postDetail);
    const postManyViews = useSelector((state) => state.post.postManyViews);
    const loadingLoadMore = useSelector((state) => state.loading.loadingLoadMore);
    const loadingLoadDetail = useSelector((state) => state.loading.loadingDetail);

    const handleGetPostDetail = async () => {
        try {
            dispatch(setLoadingDetail(true));
            const res = await getPostDetail(id);
            // console.log('post detail: ', res);
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
            if (res?.code === 'ERR_BAD_REQUEST') {
                enqueueSnackbar(res?.response?.data?.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingDetail(false));
                return;
            }
            dispatch(setPostDetail(res?.data));
            dispatch(setLoadingDetail(false));
        } catch (error) {
            dispatch(setLoadingDetail(false));
            console.log('post detail error: ', error);
            enqueueSnackbar('Lỗi tải bài viết!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    const handleGetPostManyViews = async () => {
        try {
            dispatch(setLoadingLoadMore(true));
            const res = await getPostManyViews();
            if (res?.code === 'ERR_NETWORK') {
                enqueueSnackbar('Lỗi kết nối server!', {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingLoadMore(false));
                return;
            }
            if (res?.code === 'ERR_BAD_RESPONSE') {
                enqueueSnackbar(res?.response?.data?.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingLoadMore(false));
                return;
            }
            if (res?.code === 'ERR_BAD_REQUEST') {
                enqueueSnackbar(res?.response?.data?.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                dispatch(setLoadingLoadMore(false));
                return;
            }
            dispatch(setPostManyViews(res?.data));
            dispatch(setLoadingLoadMore(false));
        } catch (error) {
            dispatch(setLoadingLoadMore(false));
            enqueueSnackbar('Lỗi!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    useEffect(() => {
        handleGetPostManyViews();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            handleGetPostDetail();
        }
    }, [id]);
    console.log('load detail: ', loadingLoadDetail);

    return (
        <>
            <Banner title="Bài viết" />
            <div className="container p-5">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12">
                    <div className="md:col-span-7 lg:col-span-8 md:p-5 border-b">
                        {loadingLoadDetail ? (
                            <div className="flex items-center justify-center col-span-9 p-5">
                                <Spinner />
                            </div>
                        ) : postDetail ? (
                            <>
                                <h2 className="text-2xl md:text-4xl font-bold mb-4 italic">
                                    {postDetail?.post?.tieude}
                                </h2>
                                <div className="flex flex-col gap-2 md:flex-row justify-between">
                                    <p className="italic text-xs md:text-base text-slate-900">
                                        Bài viết được đăng lúc: <time>{formatDate(postDetail?.post?.thoigian)}</time>
                                    </p>
                                    <p className="flex gap-1 italic items-center text-xs md:text-base text-slate-900">
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
                                        <span>{postDetail?.post?.luotxem}</span>
                                    </p>
                                </div>
                                <Seperate />
                                <div
                                    className="my-4 text-sm md:text-lg text-slate-800"
                                    dangerouslySetInnerHTML={{ __html: postDetail?.post?.noidung }}
                                ></div>
                                <h3 className="text-base font-medium text-end italic mt-5">
                                    {postDetail?.user?.hoten}
                                </h3>
                            </>
                        ) : (
                            <div className="col-span-9 p-5 text-center">Không tìm thấy bài viết.😢</div>
                        )}
                    </div>

                    <div className="md:col-span-5 lg:col-span-4 mt-10 md:mt-0 md:p-5">
                        <h3 className="text-2xl font-bold mb-4">Nhiều lượt xem</h3>

                        {!loadingLoadMore ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                                {postManyViews &&
                                    postManyViews.map((item) => (
                                        <Post key={item?._id} img={item?.anh} title={item?.tieude} id={item?._id} />
                                    ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostDetail;
