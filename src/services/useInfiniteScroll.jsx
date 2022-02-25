import { useEffect, useState, useContext } from 'react';
import { useFetch } from './useFetch';
import { Context } from './context';

export function useInfiniteScroll(scrolled, url, isPublic) {
  const { scrollParams, setScrollParams } = useContext(Context);
  const group = 'patient';
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  //Verifica se a rota é pública ou privada
  const route = !isPublic ? group + '/' + url : '/' + url;

  const initialData = useFetch(route + '?page=1'); //Carregamento de primeira listagem da rota API (É necessário para que seja possível realizar mutações ao adicionar ou editar campos quando a listagem vem da API de forma DESC)
  const allergiesData = useFetch(route + '?page=' + page); //Rota utilizada para inserir mais dados no array items
  const lastPage = allergiesData.data?.models?.last_page; //Captura última página da paginação para evitar chamada de mais requisições quando não mais existe

  //Pré-carregamento de informações iniciais e do parâmetro de última página
  useEffect(() => {
    if (allergiesData.data && items.length === 0) {
      setItems(allergiesData.data.models.data);
      setScrollParams({ ...scrollParams, lastPage: lastPage });
    }

    //Quando o mutate já foi executado por algum add ou update faz configuração para o padrão false
    if (scrollParams.mutate == true) {
      initialData.mutate();
      setItems(initialData.data.models.data);
      setScrollParams({ ...scrollParams, mutate: false });
    }
  }, [allergiesData.data, initialData.data]);

  //Diferença entre altura e listagem do scroll, para que assim seja possível identificar o inicio e andamento da listagem de forma precisa.
  const diferenceTop = scrolled.height - scrolled.top;

  useEffect(() => {
    //Verificar se o scroll está maior que 100 e se a diferença subtraída de uma margem de 100 seja menor ou igual ao offset do scroll, que traz o tamanho final exato do scroll
    if (scrolled.top > 100 && diferenceTop - 100 <= scrolled.offset) {
      if (page <= lastPage) {
        setPage(page == lastPage ? page : page + 1);
        setItems((oldItems) => [
          ...oldItems,
          ...allergiesData.data.models.data,
        ]);
      }
    }
  }, [scrolled]);

  //Filtra todo o array evitando duplicidades
  let infoData = items
    .map((e) => JSON.stringify(e))
    .reduce((acc, cur) => (acc.includes(cur) || acc.push(cur), acc), [])
    .map((e) => JSON.parse(e));

  //Retorna o array de resultado ou nulo caso não tenha informações
  return !infoData ? null : infoData;
}
