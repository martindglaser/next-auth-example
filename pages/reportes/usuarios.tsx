import Layout from "../../components/layout"
import { useEffect, useState } from 'react';






export default function ReporteUsuarios() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/data?type=query')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);


    return (
        <Layout>
            <div>
                <h1>Reporte</h1>

            </div>
            <div>
                <table>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.idPresupuesto}>
                                <td>{item.idPresupuesto}</td>
                                <td>{item.modelo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}