import { memo } from "react";
import Loading from "../Loading";

function SubmitButton({
    handler,
    isLoading = false
}) {
    return (
        <div className="grid grid-cols-2 gap-3">
            <button
                type='button'
                onClick={handler}
                className='w-full text-center bg-white text-gray-700 border border-gray-300 hover:text-rose-700 hover:bg-rose-100 hover:border-rose-100 shadow-new-button py-2.5 px-4 rounded-lg'>
                لغو
            </button>
            <button
                type='submit'
                className={'bg-jungle-500 border-jungle-600 hover:bg-jungle-700 w-full text-center text-white border shadow-new-button py-2.5 px-4 rounded-lg'}>
                {isLoading ? <Loading text={"در حال ثبت"} /> : "ثبت"}
            </button>
        </div>
    );
}

export default memo(SubmitButton);