import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { loginApi } from "../../api/loginApi"
import InputError from "../utils-components/input/InputError"
import { apiErrorHandler } from "../../utils/errorHandling"
import Loading from "../utils-components/Loading"

export default function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    const [errorInfo, setErrorInfo] = useState(null)

    const mutation = useMutation({
        mutationFn: loginApi,
        onSuccess: async ({ data }) => {
            console.log(data);
            localStorage.setItem("Token", data?.token)
            localStorage.setItem("user", data?.user)
            window.location.href = "/"
            setErrorInfo(null)
        },
        onError: (error) => {
            const errorResponse = apiErrorHandler(error);
            console.log(errorResponse);
            if (errorResponse?.status === 422) {
                setErrorInfo(errorResponse?.error);
            }
        },
    })

    const submitHandler = (e) => {
        e.preventDefault()
        mutation.mutate({ ...inputs })
    }
    
    return (
        <div className="w-full h-screen flex-center p-8 bg-white">
            <form
                className="shadow-lg p-8 md:px-14 md:py-12 rounded-3xl flex-center flex-col gap-6 bg-light-yellow"
                onSubmit={submitHandler}>
                <h1 className="text-center text-4xl">خوش امدید</h1>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="username"
                        className="text-lg font-semibold">نام کاربری</label>

                    <input
                        className="w-full p-2 rounded-lg"
                        type="text"
                        id="username"
                        placeholder="نام کاربری"
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password"
                        className="text-lg font-semibold">رمز عبور</label>
                    <input
                        className="w-full p-2 rounded-lg"
                        type="password"
                        id="password"
                        placeholder="رمز عبور"
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        required />
                </div>
                {
                    errorInfo &&
                    <InputError errorItem={errorInfo} />
                }
                <button
                    type="submit"
                    className="py-2 px-8 text-white text-lg bg-primary-600 rounded-md flex-center"
                >{mutation?.isLoading ? <Loading text={"در حال بررسی"} /> : "ورود"}</button>

            </form>
        </div>
    )
}