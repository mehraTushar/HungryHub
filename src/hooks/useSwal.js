import Swal from 'sweetalert2';

export const useSwal = (title, text, icon) => {
  Swal.fire({ title, text, icon, timer: 3000, showConfirmButton: false });
};
//confirmButtonText: 'Cool'
