import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//func
import { setShowFormLogin } from '../../redux/slice/modalSlice';

//components
import Login from './Login';
import Modal from '../Modal';
import Register from './Register';

function Auth() {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const title = isLogin ? 'Đăng nhập' : 'Đăng ký';

    const handleChangeForm = () => {
        setIsLogin(!isLogin);
    };

    const handleCloseModal = () => {
        dispatch(setShowFormLogin(false));
    };

    return (
        <>
            <Modal title={title} handleClose={handleCloseModal}>
                {isLogin ? (
                    <Login handleChangeForm={handleChangeForm} />
                ) : (
                    <Register handleChangeForm={handleChangeForm} />
                )}
            </Modal>
        </>
    );
}

export default Auth;
