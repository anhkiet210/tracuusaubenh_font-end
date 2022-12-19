import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//func
import { getMyPostPending } from '../../../services/postService';
import { setMyPostPending } from '../../../redux/slice/postSlice';
import { setLoadingLoadMore } from '../../../redux/slice/loadingSlice';

//components
import Post from '../../../pages/cam-nang-trong-trot/components/Post';
import Spinner from '../../Spinner';
import Pagination from '../../Pagination';
import { useState } from 'react';

function CardPostPending() {
    const loadingLoadMore = useSelector((state) => state.loading.loadingLoadMore);
    const myPostPending = useSelector((state) => state.post.myPostPending);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const itemPerPage = 8;
    const totalPage = Math.ceil(myPostPending?.length / itemPerPage);
    const lastIndex = currentPage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;

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

    const handleGetMyPostPending = async () => {
        try {
            dispatch(setLoadingLoadMore(true));
            const res = await getMyPostPending();
            console.log('my posts: ', res?.data);
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
            dispatch(setMyPostPending(res?.data));
            dispatch(setLoadingLoadMore(false));
        } catch (error) {
            dispatch(setLoadingLoadMore(false));
            enqueueSnackbar('Lỗi tải bài viết!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    useEffect(() => {
        handleGetMyPostPending();
    }, []);

    return (
        <>
            {loadingLoadMore ? (
                <div className="w-full flex items-center justify-center">
                    <Spinner />
                </div>
            ) : myPostPending && myPostPending.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                    {myPostPending?.slice(firstIndex, lastIndex).map((item) => (
                        <Post
                            key={item?._id}
                            img={item?.anh}
                            title={item?.tieude}
                            note={item?.ghichu}
                            id={item?._id}
                            deletePost={true}
                            type="pending"
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full text-center">Không có bài viết 😊</div>
            )}
            {myPostPending && myPostPending.length > 0 && (
                <Pagination
                    firstIndex={firstIndex}
                    lastIndex={lastIndex}
                    total={myPostPending?.length}
                    handleNextPage={handleNextPage}
                    handlePrePage={handlePrePage}
                    totalPage={totalPage}
                    currentPage={currentPage}
                />
            )}
        </>
    );
}

export default CardPostPending;
