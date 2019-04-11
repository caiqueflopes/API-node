import mysql from 'promise-mysql';
import keys from './key';
import { connect } from 'net';

const pool = mysql.createPool(keys.database);
pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is connected')
    });

export default pool;