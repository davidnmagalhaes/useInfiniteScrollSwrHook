import useSWR from 'swr';
import api from './api';
import Swal from 'sweetalert2';

export function useFetch(url, refresh) {
  const { data, error, mutate } = useSWR(
    url,
    async (url) => {
      const response = await api.get(url);
      return response.data;
    },
    {
      refreshInterval: refresh,
      onError: (err, key) => {
        if (!err.response) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Estamos em manutenção, tente novamente mais tarde ou entre em contato conosco!',
            confirmButtonText: 'Fechar',
          });
        } else {
          if (err.response.status === 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Você não tem as permissões adequadas!',
              confirmButtonText: 'Fechar',
            })
          }
          if (err.response.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Houve um problema em seu acesso! Tente novamente ou entre em contato conosco.',
              confirmButtonText: 'Fechar',
            })
          }
        }
      },
      errorRetryInterval: 30000,
    },
  );

  return { data, error, mutate};
}
