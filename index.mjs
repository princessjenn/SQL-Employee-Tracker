import mysql from "mysql2";
import inquirer from "inquirer";

const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employees_db',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, //max idle connections, the default val is the same as 'connectionLimit'
        idleTimeout: 60000, //idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0

      });

      const promisePool = pool.promise();
        const [rows, fields] = await promisePool.query('SELECT * FROM department WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

        console.log(rows)