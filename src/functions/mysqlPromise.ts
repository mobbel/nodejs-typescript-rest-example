import mysql from 'mysql';

export interface IMysqlPromise {
  getData: (callObject: IGetDataCallObject) => any;
}

interface IGetDataCallObject {
  connection: mysql.Connection;
  queryString: string;
}

const mysqlPromise = (): IMysqlPromise => {
  const getData = (callObject: IGetDataCallObject) => {
    const dataPromise = new Promise((resolve, reject) => {
      callObject.connection.query(callObject.queryString, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });

    return dataPromise;
  };

  return {
    getData,
  };
};

export default mysqlPromise;
