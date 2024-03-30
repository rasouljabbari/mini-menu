import { useMutation } from "@tanstack/react-query";
import {useEffect} from "react";
import { fetchTableApi } from "../api/user/profile/table/apiHandler";
import { useDispatch } from "react-redux";
import { changeTableInfo } from "../redux/features/tableSlice";

function useTableMutation() {
    const dispatch = useDispatch()
    const queryParameters = new URLSearchParams(window.location.search)
    const uuid = queryParameters.get("uuid") ? queryParameters.get("uuid") : sessionStorage.getItem('uuid')

    const mutation = useMutation({
        mutationFn: fetchTableApi,
        onSuccess: async (data) => {
            dispatch(changeTableInfo(data?.table))
        }
    })


    useEffect(() => {
        if (uuid) {
            mutation.mutate({ uuid })
        } else {
            dispatch(changeTableInfo({}))
        }
    }, [uuid]);
}

export default useTableMutation
