import Layout from "../components/layout"
import { useEffect, useState } from 'react';







export default function IndexPage() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const limit = 100;


  useEffect(() => {
    getData();
  }, [page]);


  async function getData() {
    await getCount();
    runQuery();
  }

  function getCount() {
    return new Promise((resolve, reject) => {
      fetch('/api/getUsers?type=count')
        .then((response) => response.json())
        .then((data) => {
          const count = data[0].cuenta;
          const totalPages = Math.ceil(count / limit);

          setTotalPages(totalPages)

          resolve()
        }
        );
    })
  }

  function runQuery() {

    fetch(`/api/getUsers?type=query&limit=${limit}&page=${page}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }


  return (
    <Layout>
      <div>
        <table>
          <tbody>

            {data.map((item) => (

              <tr key={item.idPresupuesto}>
                <td>{item.modeloId}</td>
                <td>{item.modelo}</td>
              </tr>
            ))}

          </tbody>
        </table>
        <div>

          {
            page > 1 &&
            <button onClick={() => {
              setPage(page - 1)
            }}>
              Anterior
            </button>}

          Page: {page}
          {
            page < totalPages &&
            <button onClick={() => {
              setPage(page + 1)
            }}>
              Siguiente
            </button>
          }
        </div>
      </div>

    </Layout>
  )
}
