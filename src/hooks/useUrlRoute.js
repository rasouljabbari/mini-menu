import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { changeHaveTableStatus } from "../redux/features/tableSlice";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from 'aos'
import { changeShowTotalBox } from "../redux/features/orderSlice";

function useUrlRoute() {
    const [isLogin, setIsLogin] = useState(false);
    const [loader, setLoader] = useState(true);
    const [token, setToken] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    let currentUser = useSelector(state => state?.user?.info)
    let userToken = useSelector(state => state?.user?.token)

    
    const queryParameters = new URLSearchParams(window.location.search)
    const uuid = queryParameters.get("uuid") ? queryParameters.get("uuid") : sessionStorage.getItem('uuid')

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    useEffect(() => {
        setToken(userToken)
    }, [userToken]);

    const { state } = useLocation()
    useEffect(() => {
        if (state?.isFactor) {
            dispatch(changeShowTotalBox(false))
        } else {
            dispatch(changeShowTotalBox(true))
        }
    }, [state])

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1000)

        if (window.location?.pathname === '/admin' || window.location?.pathname?.includes('login') || window.location?.pathname?.includes('verify')) {
            setIsLogin(true)
            sessionStorage.removeItem('uuid')
        } else if (userToken && window.location?.pathname.includes('/admin')) {
            setIsLogin(false)
            sessionStorage.removeItem('uuid')
        } else if (uuid) { //check if user scan qr code
            dispatch(changeHaveTableStatus(true))
            sessionStorage.setItem('uuid', uuid)
            navigate('/restaurant-menu')
        } else {
            setIsLogin(false)
            dispatch(changeHaveTableStatus(false))
        }

    }, [currentUser?.is_admin])

    return {
        isLogin,
        loader,
        token,
        currentUser
    }
}

export default useUrlRoute
