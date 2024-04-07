import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const customSwalData = {
  allowOutsideClick: false,
  confirmButtonColor: '#337166',
  confirmButtonText: '<a href="/" class="text-white">مراجعه به صفحه اصلی</a>',
  width: 350,
}

export const apiErrorHandler = (e) => {
  console.log(e.response);
  if (e.message === 'Network Error') {
    Swal.fire({
      icon: 'error',
      title: 'اتصال اینترنت را بررسی فرمایید',
      ...customSwalData,
      confirmButtonText: 'بستن',
    })
  } else if (e.response?.['status'] === 422) {
    toast.error('.لطفا خطاهای به وجود آمده را رفع کنید')
    if (e.response?.data['errors']) {
      return { status: 422, error: e.response?.data['errors'] }
    } else {
      return { status: 422, error: e.response?.data['message'] }
    }
  } else if (e.response?.['status'] === 403) {
    if (e.response?.data['errors']?.['verify_code']) {
      return { status: 403, error: e.response?.data['errors'] }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'خطای دسترسی',
        text: 'شما به این بخش دسترسی ندارید',
        ...customSwalData,
        width: 300,
      })
    }
  } else if (e.response?.['status'] === 404) {
    window.location.replace('/404')
  } else if (e.response?.['status'] === 500 || e.response?.['status'] === 503) {
    Swal.fire({
      icon: 'error',
      title: 'خطای سرور',
      text: 'خطای ناخواسته ای پیش آمده است',
      ...customSwalData
    })
    return { status: 500, error: 'خطای ناخواسته ای پیش آمده است' }
  } else if (e.response?.['status'] === 401) {
    Swal.fire({
      icon: 'error',
      title: 'عدم دسترسی',
      text: 'احراز هویت نامعتبر',
      ...customSwalData,
      width: 300
    })
    localStorage.removeItem('Token')
    window.location.replace('/login')
  }
}
