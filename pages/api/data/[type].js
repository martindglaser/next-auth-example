import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cars_shop'
});

connection.connect();


export default function handler(req, res) {
    const { type } = req.query;

    let sql = '';
    if (type === 'count') {
        sql = `SELECT COUNT(idPresupuesto) AS cuenta FROM presupuesto INNER JOIN maestro_modelos ON idMaestroModelos = modeloId`;
    } else if (type === 'query') {
        sql = `SELECT * FROM presupuesto INNER JOIN maestro_modelos ON idMaestroModelos = modeloId`;
    }

    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.status(200).json(results);
    });



}
