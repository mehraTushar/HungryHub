import Swal from 'sweetalert2';

export const useSwalToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
      toast.addEventListener('click', () => {
        Swal.close();
      });
    },
  });
  Toast.fire({
    icon,
    title,
  });
};
