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

  // setto var di stato per gestione prodotto selezionato
  const [selectedproduct, setSelectedProduct] = useState(null);

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
      console.error(error);
    }
  }

  // salviamo in una varianbile la nostra funzione per poi debounsarla
  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500), [])

  useEffect(() => {
    debouncedFetchProducts(query);
  }, [query]);

  // creo funzione per chiamata api per i dettagli prodotto
  const fetchProductsDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:3333/products/${id}`);
      const data = await res.json();
      setSelectedProduct(data);
      // pulizia dopo la selezione prodotto del campo
      setQuery("");
      setProducts([]);

    } catch (error) {
      console.error(error);
    }

  }

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
            <p key={product.id}
              onClick={() => fetchProductsDetails(product.id)}
            >{product.name}</p>
          ))}
        </div>
      )}

      {/* se esiste il mio select procedo con il codice */}
      {selectedproduct && (
        <div className='card'>
          <h2>{selectedproduct.name}</h2>
          {/* <img src={selectedproduct.image} alt={selectedproduct.name} /> */}
          <p>{selectedproduct.description}</p>
          <p>{selectedproduct.price}€</p>
        </div>
      )}
    </>
  )
}

export default App
