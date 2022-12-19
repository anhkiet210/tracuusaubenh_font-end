import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

//func
import { setShowFormCreatePost } from '../../redux/slice/modalSlice';
import { setLoadingLoadMore } from '../../redux/slice/loadingSlice';
import { getAllPosts } from '../../services/postService';
import { setAllPosts } from '../../redux/slice/postSlice';

//components
import Banner from '../../components/Banner';
import FormCreatePost from '../../components/FormCreatePost';
import Post from './components/Post';
import Seperate from '../../components/Seperate';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import { useState } from 'react';
import Skeleton from '../../components/Skeleton';

function CultivationManual() {
    const loadingMore = useSelector((state) => state.loading.loadingMore);
    const showModal = useSelector((state) => state.modal.showFormCreatePost);
    const allPosts = useSelector((state) => state.post.allPosts);
    const token = useSelector((state) => state.token.accessToken);
    const tokenRef = useRef('');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const itemPerPage = 8;
    const totalPage = Math.ceil(allPosts?.length / itemPerPage);
    const lastIndex = currentPage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;

    const handleShowModal = () => {
        dispatch(setShowFormCreatePost(true));
    };

    // console.log('all posts: ', allPosts);

    const handleShowNote = () => {
        enqueueSnackbar('Hãy đăng nhập để thêm bài viết', {
            variant: 'warning',
            autoHideDuration: 2000,
        });
        return;
    };

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

    const handleGetAllPosts = async () => {
        try {
            dispatch(setLoadingLoadMore(true));
            const res = await getAllPosts();
            // console.log('res all post: ', res);
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
            dispatch(setAllPosts(res?.data));
            dispatch(setLoadingLoadMore(false));
        } catch (error) {
            console.log('all post error: ', error);
            dispatch(setLoadingLoadMore(false));
            enqueueSnackbar('Tải bài viết thất bại!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    useEffect(() => {
        if (typeof window !== undefined) {
            tokenRef.current = localStorage.getItem('accessToken');
        }
    });

    useEffect(() => {
        handleGetAllPosts();
    }, []);

    return (
        <>
            <Banner title="Cẩm nang" />
            <div className="container p-5">
                {showModal && <FormCreatePost />}
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between">
                        <h2 className="p-5 text-xl font-bold text-primary1 uppercase ">Bài viết</h2>
                        {token || tokenRef.current ? (
                            <button
                                onClick={handleShowModal}
                                className="flex items-center justify-center gap-1 uppercase py-2 px-4 text-sm font-bold border border-primary1 rounded-lg text-primary1 transition duration-500 hover:bg-primary1 hover:text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 font-bold"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Thêm bài viết
                            </button>
                        ) : (
                            <button
                                onClick={handleShowNote}
                                className="flex items-center justify-center gap-1 uppercase py-2 px-4 text-sm font-bold border border-slate-700 rounded-lg text-slate-700 transition duration-500 hover:bg-slate-500 hover:text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 font-bold"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Thêm bài viết
                            </button>
                        )}
                    </div>
                    <Seperate />
                    {loadingMore ? (
                        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </div>
                    ) : (
                        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                            {allPosts?.length > 0 ? (
                                allPosts
                                    ?.slice(firstIndex, lastIndex)
                                    .map((item) => (
                                        <Post key={item?._id} img={item?.anh} title={item?.tieude} id={item?._id} />
                                    ))
                            ) : (
                                <p>Không tìm thấy bài viết nào.😢</p>
                            )}
                        </div>
                    )}
                </div>
                <Pagination
                    firstIndex={firstIndex}
                    lastIndex={lastIndex}
                    total={allPosts?.length}
                    handleNextPage={handleNextPage}
                    handlePrePage={handlePrePage}
                    totalPage={totalPage}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
}

export default CultivationManual;
