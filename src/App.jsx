// costruisco funzione debounce per risolvere il problema del rendering ad ogni digitazione
// const debounce = (callback, delay) => {
//   // clousure
//   let timer;
//   return (value) => {
//     // pulisco ogni volta che si digitalizza
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       callback(value);
//     }, delay);
//   }

// }

import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

function App() {

  // setto var di stato per gestione input
  const [query, setQuery] = useState("");

  // setto var di stato per gestione input prodotti
  const [products, setProducts] = useState([]);

  // controllo oggetto product
  console.log(products)

  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      // chiata Api
      fetch(`http://localhost:3333/products?search=${query}`)
        .then(res => res.json())
        .then(data => setProducts(data))
      // verifica delle chiamate ad ogni digitazione da tastiera di user
      console.log('richiesta api')
    } catch (error) {
      (error => console.error(error));
    }
  }

  // salviamo in una varianbile la nostra funzione per poi debounsarla
  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500), [])



  useEffect(() => {
    debouncedFetchProducts(query);
  }, [query]);



  return (
    <>
      <h1>useCallback</h1>
      <input
        type="text"
        placeholder='cerca'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {products.length > 0 && (
        <div>
          {products.map(product => (
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      )}
    </>
  )
}

export default App
