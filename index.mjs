import msql from "mysql2";
import inquirer from "inquirer";

const pool = mysql.creatPool(
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
        const [rows, fields] = await promisePool.query("SELECT * from department");

        console.log(rows)