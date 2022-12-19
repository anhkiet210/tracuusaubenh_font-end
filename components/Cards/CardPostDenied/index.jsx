import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//func
import { setLoadingLoadMore } from '../../../redux/slice/loadingSlice';
import { setMyPostDenied } from '../../../redux/slice/postSlice';
import { getMyPostDenied } from '../../../services/postService';
import { setShowNote } from '../../../redux/slice/modalSlice';

//components
import { useState } from 'react';
import Post from '../../../pages/cam-nang-trong-trot/components/Post';
import Pagination from '../../Pagination';
import Spinner from '../../Spinner';
import Modal from '../../Modal';

function CardPostDenied() {
    const showNote = useSelector((state) => state.modal.showNote);
    const notePost = useSelector((state) => state.post.notePost);
    const loadingLoadMore = useSelector((state) => state.loading.loadingLoadMore);
    const myPostDenied = useSelector((state) => state.post.myPostDenied);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const itemPerPage = 8;
    const totalPage = Math.ceil(myPostDenied?.length / itemPerPage);
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

    const handleClodeNote = () => {
        dispatch(setShowNote(false));
    };

    console.log('note: ', notePost);

    const handleGetMyPostDeied = async () => {
        try {
            dispatch(setLoadingLoadMore(true));
            const res = await getMyPostDenied();
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
            dispatch(setMyPostDenied(res?.data));
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
        handleGetMyPostDeied();
    }, []);
    return (
        <>
            {loadingLoadMore ? (
                <div className="w-full flex items-center justify-center">
                    <Spinner />
                </div>
            ) : myPostDenied && myPostDenied.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                    {myPostDenied?.slice(firstIndex, lastIndex).map((item) => (
                        <Post
                            key={item?._id}
                            img={item?.anh}
                            title={item?.tieude}
                            note={item?.ghichu}
                            id={item?._id}
                            deletePost={true}
                            type="denied"
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full text-center">Không có bài viết 😊</div>
            )}
            {myPostDenied && myPostDenied.length > 0 && (
                <Pagination
                    firstIndex={firstIndex}
                    lastIndex={lastIndex}
                    total={myPostDenied?.length}
                    handleNextPage={handleNextPage}
                    handlePrePage={handlePrePage}
                    totalPage={totalPage}
                    currentPage={currentPage}
                />
            )}

            {showNote && (
                <Modal title="Lý do bài viết bị từ chối" handleClose={handleClodeNote}>
                    <div className="w-full max-h-96 bg-white rounded-xl overflow-y-auto p-5 text-sm md:text-base lg:text-lg text-slate-800 font-light">
                        {notePost}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default CardPostDenied;
