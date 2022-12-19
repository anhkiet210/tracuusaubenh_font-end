import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

//func
import { getAllCrops } from '../../services/cropService';
import { detectPest, getAllPest } from '../../services/pestService';
import { setLoading } from '../../redux/slice/loadingSlice';
import { setAllPests, detectPestRedux } from '../../redux/slice/pestSlice';
import { setShowSelectLa, setShowSelectThan, setShowSelectRe } from '../../redux/slice/modalSlice';

//components
import Banner from '../../components/Banner';
import PreviewSymptom from '../../components/PreviewSymptom';
import Seperate from '../../components/Seperate';
import Spinner from '../../components/Spinner';
import TableData from '../../components/TableData';

const thead = [
    {
        id: 1,
        title: 'Tên thuốc',
    },
    {
        id: 2,
        title: 'Ảnh',
    },
    {
        id: 3,
        title: 'Trị bệnh',
    },
    {
        id: 4,
        title: 'Công dụng',
    },
];

function TraCuu() {
    const la = useSelector((state) => state.pest.la);
    const than = useSelector((state) => state.pest.than);
    const re = useSelector((state) => state.pest.re);
    const detectPestInfo = useSelector((state) => state.pest.detectPest);
    const loading = useSelector((state) => state.loading.loading);
    const showSelectLa = useSelector((state) => state.modal.showSelectLa);
    const showSelectThan = useSelector((state) => state.modal.showSelectThan);
    const showSelectRe = useSelector((state) => state.modal.showSelectRe);
    const [laValue, setLaValue] = useState('');
    const [thanValue, setThanValue] = useState('');
    const [reValue, setReValue] = useState('');
    const dispatch = useDispatch();
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const [crops, setCrops] = useState([]);

    const handleShowLa = () => {
        dispatch(setShowSelectLa(!showSelectLa));
        dispatch(setShowSelectThan(false));
        dispatch(setShowSelectRe(false));
    };

    const handleShowThan = () => {
        dispatch(setShowSelectThan(!showSelectThan));
        dispatch(setShowSelectLa(false));
        dispatch(setShowSelectRe(false));
    };

    const handleShowRe = () => {
        dispatch(setShowSelectLa(false));
        dispatch(setShowSelectThan(false));
        dispatch(setShowSelectRe(!showSelectRe));
    };

    const handleGetLaValue = (item) => {
        setLaValue(item);
        dispatch(setShowSelectLa(false));
    };

    const handleGetThanValue = (item) => {
        setThanValue(item);
        dispatch(setShowSelectThan(false));
    };

    const handleGetReValue = (item) => {
        setReValue(item);
        dispatch(setShowSelectRe(false));
    };

    const handleGetAllPests = async () => {
        try {
            const res = await getAllPest();
            if (!res.success) {
                enqueueSnackbar(res?.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
            }
            // console.log('pests', res);
            dispatch(setAllPests(res?.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllPests();
    }, []);

    const handleGetAllCrops = async () => {
        try {
            const res = await getAllCrops();
            if (!res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
            }
            // console.log('crops', res);
            setCrops(res?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllCrops();
    }, []);

    const handleSubmitForm = async (data) => {
        try {
            if (laValue === '' && thanValue === '' && reValue === '') {
                enqueueSnackbar('Hãy chọn ít nhất một triệu chứng!', {
                    variant: 'warning',
                    autoHideDuration: 2000,
                });
                return;
            }
            dispatch(setLoading(true));
            const info = {
                la: laValue,
                than: thanValue,
                re: reValue,
            };

            const res = await detectPest(info);
            // console.log('pest', res);

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
            if (res?.code === 'ERR_BAD_REQUEST') {
                enqueueSnackbar(res?.response?.data?.message, {
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
            dispatch(detectPestRedux(res?.data));
            dispatch(setLoading(false));
            reset({ laValue: '', thanValue: '', reValue: '' });
        } catch (error) {
            dispatch(setLoading(false));
            // console.log(error);
            enqueueSnackbar('Lỗi khi chuẩn đoán bệnh', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    };

    return (
        <>
            <Banner title="Tra cứu" />
            <div className="container p-5">
                <div className="border-[#ccc] border-[1px] rounded-md p-5 max-w-4xl mx-auto shadow-xl">
                    <h3 className="text-lg font-bold border-b-[1px] pb-4 border-b-[#ccc] uppercase">
                        Hãy chọn loài cây và triệu chứng
                    </h3>
                    <form action="" onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
                        <div className="md:grid md:grid-cols-2 md:gap-5 mt-3">
                            <div className="form-group">
                                <label className="block uppercase text-xs font-bold mb-2">Chọn loài cây trồng</label>
                                <select
                                    {...register('crops')}
                                    className="border px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow-2xl outline-none focus:border-primary1 w-full ease-linear transition-all duration-150"
                                    defaultValue="Cây lúa"
                                    disabled
                                >
                                    {/* <option value="" className="text-base">
                                        --.--
                                    </option> */}
                                    {crops &&
                                        crops.map((item) => (
                                            <option value={item.tenloai} className="text-base" key={item._id}>
                                                {item.tenloai}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="block uppercase text-xs font-bold mb-2">Chọn triệu chứng ở lá</label>
                                {/* <select
                                    {...register('leaf')}
                                    id="select-leaf"
                                    className="border px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow-2xl outline-none focus:border-primary1 w-full ease-linear transition-all duration-150"
                                >
                                    <option value="" className="text-base">
                                        --.--
                                    </option>
                                    {la &&
                                        la.length > 0 &&
                                        la.map((item) => (
                                            <option key={item} value={item} className="text-base max-w-sm">
                                                {item}
                                            </option>
                                        ))}
                                </select> */}
                                <div
                                    className="relative border px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow-2xl outline-none focus:border-primary1 w-full ease-linear transition-all duration-150 cursor-pointer pr-8"
                                    onClick={handleShowLa}
                                >
                                    <div className=" whitespace-nowrap overflow-hidden">
                                        {laValue ? laValue : '--.--'}
                                    </div>
                                    <div className="absolute inset-y-0 right-3 flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-3 h-3"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {showSelectLa && (
                                    <ul className="absolute bg-white shadow-2xl z-30 w-full mt-2 rounded-xl p-2 overflow-y-scroll max-h-56 animate-bloom-hand duration-500">
                                        <li
                                            className="p-2 text-slate-900 hover:bg-slate-400 rounded-lg border-b select-none"
                                            onClick={() => {
                                                handleGetLaValue('');
                                            }}
                                        >
                                            --.--
                                        </li>
                                        {la && la.length > 0 ? (
                                            la.map((item) => (
                                                <li
                                                    className="p-2 text-slate-900 hover:bg-slate-400 rounded-lg border-b select-none"
                                                    key={item}
                                                    onClick={() => {
                                                        handleGetLaValue(item);
                                                    }}
                                                >
                                                    {item}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-2 flex items-center justify-center rounded-lg border-b select-none">
                                                <Spinner />
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="block uppercase text-xs font-bold mb-2">
                                    Chọn triệu chứng ở thân cây
                                </label>
                                {/* <select
                                    {...register('stalks')}
                                    className="border px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow-2xl outline-none focus:border-primary1 w-full ease-linear transition-all duration-150"
                                >
                                    <option value="" className="text-base">
                                        --.--
                                    </option>
                                    {than &&
                                        than.length > 0 &&
                                        than.map((item) => (
                                            <option key={item} value={item} className="text-base max-w-sm">
                                                {item}
                                            </option>
                                        ))}
                                </select> */}
                                <div
                                    className="relative border px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow-2xl outline-none focus:border-primary1 w-full ease-linear transition-all duration-150 cursor-pointer pr-8"
                                    onClick={handleShowThan}
                                >
                                    <div className=" whitespace-nowrap overflow-hidden">
                                        {thanValue ? thanValue : '--.--'}
                                    </div>
                                    <div className="absolute inset-y-0 right-3 flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-3 h-3"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {showSelectThan && (
                                    <ul className="absolute bg-white shadow-2xl z-30 w-full mt-2 rounded-xl p-2 overflow-y-scroll max-h-56 animate-bloom-hand duration-500">
                                        <li
                                            className="p-2 text-slate-900 hover:bg-slate-400 rounded-lg border-b select-none"
                                            onClick={() => {
                                                handleGetThanValue('');
                                            }}
                                        >
                                            --.--
                                        </li>
                                        {than &&
                                            than.length > 0 &&
                                            than.map((item) => (
                                                <li
                                                    className="p-2 text-slate-900 hover:bg-slate-400 rounded-lg border-b select-none"
                                                    key={item}
                                                    onClick={() => {
                                                        handleGetThanValue(item);
                                                    }}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="select-crops" className="block uppercase text-xs font-bold mb-2">
                                    Chọn triệu chứng ở rễ cây
                                </label>
                                {/* <select
                                    {...register('roots')}
                                    id="select-roots"
                                    className="border px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow-2xl outline-none focus:border-primary1 w-full ease-linear transition-all duration-150"
                                >
                                    <option value="" className="text-base">
                                        --.--
                                    </option>
                                    {re &&
                                        re.length > 0 &&
                                        re.map((item) => (
                                            <option key={item} value={item} className="text-base max-w-sm">
                                                {item}
                                            </option>
                                        ))}
                                </select> */}
                                <div
                                    className="relative border px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow-2xl outline-none focus:border-primary1 w-full ease-linear transition-all duration-150 cursor-pointer pr-8"
                                    onClick={handleShowRe}
                                >
                                    <div className=" whitespace-nowrap overflow-hidden">
                                        {reValue ? reValue : '--.--'}
                                    </div>
                                    <div className="absolute inset-y-0 right-3 flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-3 h-3"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {showSelectRe && (
                                    <ul className="absolute bg-white shadow-2xl z-30 w-full mt-2 rounded-xl p-2 overflow-y-scroll max-h-56 animate-bloom-hand duration-500">
                                        <li
                                            className="p-2 text-slate-900 hover:bg-slate-400 rounded-lg border-b select-none"
                                            onClick={() => {
                                                handleGetReValue('');
                                            }}
                                        >
                                            --.--
                                        </li>
                                        {re &&
                                            re.length > 0 &&
                                            re.map((item) => (
                                                <li
                                                    className="p-2 text-slate-900 hover:bg-slate-400 rounded-lg border-b select-none"
                                                    key={item}
                                                    onClick={() => {
                                                        handleGetReValue(item);
                                                    }}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            <button type="submit" className="btn-submit btn-disabled" disabled={loading}>
                                {loading ? <Spinner /> : 'Chuẩn đoán'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Seperate />
            {/* {pest && (
                <div className="container p-5">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <TableData thead={thead} data={pest} />
                    </div>
                </div>
            )}
            <PreviewSymptom handleClosePreview={handleClosePreview} /> */}
            {JSON.stringify(detectPestInfo) !== '{}' && (
                <div className="container mb-3">
                    <div className="max-w-4xl mx-auto border p-3 rounded-lg shadow-2xl">
                        <div className="mb-3">
                            <h3>
                                <strong className="uppercase text-sm font-bold text-slate-700">Loại cây</strong> :{' '}
                                {detectPestInfo?.crop?.tenloai}
                            </h3>
                            <div className="flex gap-2 mt-3 justify-center">
                                <div className="w-40 h-40 rounded-md overflow-hidden">
                                    <img
                                        src={detectPestInfo?.crop?.anh}
                                        alt=""
                                        className="object-cover w-full h-full rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h3>
                                <strong className="uppercase text-sm font-bold text-slate-700">tên bệnh</strong>:{' '}
                                {detectPestInfo?.pest?.ten}
                            </h3>
                            <div className="flex gap-2 mt-3 justify-center">
                                <div className="h-48 rounded-md overflow-hidden">
                                    <img
                                        src={detectPestInfo?.pest?.anh}
                                        alt=""
                                        className="object-cover w-full h-full rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h3>
                                <strong className="uppercase text-sm font-bold text-slate-700">Triệu chứng:</strong>{' '}
                            </h3>
                            <p className="text-base font-light leading-relaxed mt-2 mb-2 text-slate-600">
                                {detectPestInfo?.pest?.trieuchungchitiet}
                            </p>
                        </div>
                        {detectPestInfo?.pesticide?.length > 0 && (
                            <div className="mb-3">
                                <h3>
                                    <strong className="uppercase text-sm font-bold text-slate-700">
                                        Các loại thuốc đặc trị
                                    </strong>
                                </h3>
                                {detectPestInfo?.pesticide?.map((item) => (
                                    <div className="p-4 rounded-lg shadow-xl" key={item._id}>
                                        <h4 className="uppercase text-sm font-bold text-slate-700">
                                            Tên thuốc: {item?.tenthuoc}
                                        </h4>
                                        <div className="flex gap-2 mt-3 justify-center">
                                            <div className="w-40 h-40 rounded-md overflow-hidden">
                                                <img
                                                    src={item?.anh}
                                                    alt=""
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="">
                                            <h4 className="uppercase text-sm font-bold text-slate-700">Công dụng: </h4>
                                            <p className="text-base font-light leading-relaxed mt-2 mb-2 text-slate-600">
                                                {item?.congdung}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default TraCuu;
