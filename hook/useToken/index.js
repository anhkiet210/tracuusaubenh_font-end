import { useSelector } from 'react-redux';

function useToken() {
    const token = useSelector((state) => state.token.accessToken);
    return token;
}

export default useToken;
