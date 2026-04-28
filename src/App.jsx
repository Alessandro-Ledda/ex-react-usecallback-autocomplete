import { useEffect, useState } from 'react';

function App() {

  // setto var di stato per gestione input
  const [query, setQuery] = useState("");

  // setto var di stato per gestione input prodotti
  const [products, setProducts] = useState([]);

  // controllo oggetto product
  console.log(products)

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }
    // chiata Api
    fetch(`http://localhost:3333/products?search=${query}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error))
      .finally()

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
