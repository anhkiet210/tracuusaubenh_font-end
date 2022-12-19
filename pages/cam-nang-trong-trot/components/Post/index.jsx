import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner';
import { setLoading } from '../../../../redux/slice/loadingSlice';
import { setShowNote } from '../../../../redux/slice/modalSlice';

//func
import { deleteMyPost, deleteMyPostDenied, deleteMyPostPending, setNotePost } from '../../../../redux/slice/postSlice';
import { increaseViews, deletePostMethod } from '../../../../services/postService';

function Post({ img, title, id, note, deletePost, info, type }) {
    // console.log('id post: ', id);
    const loading = useSelector((state) => state.loading.loading);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleDeletePost = async () => {
        if (typeof window !== undefined) {
            const result = window.confirm('Bạn có muốn xóa bài viết này không?');
            if (result) {
                try {
                    dispatch(setLoading(true));
                    const res = await deletePostMethod(id);
                    console.log('res: ', res);
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
                        enqueueSnackbar(res?.response?.data?.message, {
                            variant: 'error',
                            autoHideDuration: 2000,
                        });
                        dispatch(setLoading(false));
                        return;
                    }
                    if (res?.response?.status === 404) {
                        enqueueSnackbar(res?.response?.data?.message, {
                            variant: 'error',
                            autoHideDuration: 2000,
                        });
                        dispatch(setLoading(false));
                        return;
                    }

                    type === 'accepted' && dispatch(deleteMyPost(id));
                    type === 'pending' && dispatch(deleteMyPostPending(id));
                    type === 'denied' && dispatch(deleteMyPostDenied(id));

                    enqueueSnackbar(res?.message, {
                        variant: 'success',
                        autoHideDuration: 2000,
                    });
                } catch (error) {
                    dispatch(setLoading(false));
                    enqueueSnackbar('Lỗi xóa bài viết!', {
                        variant: 'error',
                        autoHideDuration: 2000,
                    });
                }
            }
            dispatch(setLoading(false));
            return;
        }
    };

    const handleShowNote = () => {
        dispatch(setShowNote(true));
        dispatch(setNotePost(note));
    };

    const handleIncreaseViews = async () => {
        try {
            const res = await increaseViews(id);
            if (!res?.success) {
                enqueueSnackbar(res?.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
                return;
            }
            // console.log('increaseViews: ', res);
        } catch (error) {
            // console.log('increaseViews error: ', error);
            enqueueSnackbar('Lỗi!', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };
    return (
        <>
            <div className="p-3 border cursor-pointer border-[#ccc] rounded-lg overflow-hidden transition duration-500 hover:shadow-2xl flex flex-col justify-between">
                <Link href={`/cam-nang-trong-trot/chi-tiet-bai-viet/${id}`}>
                    <div className="" onClick={() => handleIncreaseViews(id)}>
                        <div className="w-full h-[229px] overflow-hidden mb-2 rounded-lg">
                            <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover rounded-lg hover:scale-105 duration-500"
                            />
                        </div>
                        <h2 className="text-base font-semibold text-slate-900 line-clamp-3 transition duration-500 hover:text-primary1">
                            {title}
                        </h2>
                    </div>
                </Link>
                {deletePost || info ? (
                    <div className="w-full flex justify-between text-end mt-2 ">
                        {info && (
                            <button
                                className="py-2 px-3 border border-sky-400 rounded-lg duration-300 text-sky-400 relative hover:text-white hover:bg-sky-400"
                                onClick={handleShowNote}
                            >
                                {loading ? <Spinner /> : 'Lý do bài viết bị từ chối'}
                            </button>
                        )}
                        {deletePost && (
                            <button
                                className="py-2 px-3 border border-error rounded-lg duration-300 text-error relative hover:text-white hover:bg-error btn-disabled"
                                onClick={handleDeletePost}
                                disabled={loading}
                            >
                                {loading ? <Spinner /> : 'Xóa'}
                            </button>
                        )}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}

export default Post;
