import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//func
import { getMyPosts } from '../../../services/postService';
import { setMyPosts } from '../../../redux/slice/postSlice';
import { setLoadingLoadMore } from '../../../redux/slice/loadingSlice';

//components
import Post from '../../../pages/cam-nang-trong-trot/components/Post';
import Spinner from '../../Spinner';
import Pagination from '../../Pagination';
import { useState } from 'react';

function CardMyPosts() {
    const loadingLoadMore = useSelector((state) => state.loading.loadingLoadMore);
    const myPosts = useSelector((state) => state.post.myPosts);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const itemPerPage = 8;
    const totalPage = Math.ceil(myPosts?.length / itemPerPage);
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

    const handleGetMyPosts = async () => {
        try {
            dispatch(setLoadingLoadMore(true));
            const res = await getMyPosts();
            // console.log('my posts: ', res?.data);
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
            dispatch(setMyPosts(res?.data));
            dispatch(setLoadingLoadMore(false));
        } catch (error) {
            dispatch(setLoadingLoadMore(false));
            enqueueSnackbar('Lỗi tải bài viết!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    // const handleGetPostPending = async () => {
    //     try {
    //     } catch (error) {
    //         dispatch(setLoadingLoadMore(false));
    //         enqueueSnackbar('Lỗi tải bài viết!', {
    //             variant: 'error',
    //             autoHideDuration: 2000,
    //         });
    //     }
    // };

    useEffect(() => {
        handleGetMyPosts();
    }, []);
    return (
        <>
            {loadingLoadMore ? (
                <div className="w-full flex items-center justify-center">
                    <Spinner />
                </div>
            ) : myPosts && myPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                    {myPosts?.slice(firstIndex, lastIndex).map((item) => (
                        <Post
                            key={item?._id}
                            img={item?.anh}
                            title={item?.tieude}
                            note={item?.ghichu}
                            id={item?._id}
                            deletePost={true}
                            type="accepted"
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full text-center">Không có bài viết 😊</div>
            )}
            {myPosts && myPosts.length > 0 && (
                <Pagination
                    firstIndex={firstIndex}
                    lastIndex={lastIndex}
                    total={myPosts?.length}
                    handleNextPage={handleNextPage}
                    handlePrePage={handlePrePage}
                    totalPage={totalPage}
                    currentPage={currentPage}
                />
            )}
        </>
    );
}

export default CardMyPosts;
