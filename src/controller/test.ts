import mysql from 'mysql';

import {
  ICallbackProperties, IResponse,
} from '../rest/rest';
import mysqlConfig from '../config/mysqlConfig';
import mysqlPromise from '../functions/mysqlPromise';

const mySQLPromise = mysqlPromise();

const test = () => {
  const testData = async (): Promise<IResponse> => {
    const connection = mysql.createConnection(mysqlConfig);

    const queryPromise = await mySQLPromise.getData({
      connection,
      queryString: 'SELECT id FROM idTable',
    });

    const mapedData = queryPromise.then((results) => {
      const data: [] = results.map((row) => {
        return (row.id);
      });

      return data;
    }).catch((error) => {
      console.log(error);
    });

    console.log(mapedData);

    return ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ test: 'data' }),
    });
  };

  const testPostData = (properties: ICallbackProperties): IResponse => {
    return ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ postData: properties.requestBody }),
    });
  };

  const testSlugData = (properties: ICallbackProperties): IResponse => {
    return ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ slugData: properties.slugVariables }),
    });
  };

  return {
    testData,
    testPostData,
    testSlugData,
  };
};

export default test;
