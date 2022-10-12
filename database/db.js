import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'checklist.db'});

export const init = tableName => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // tx.executeSql('DROP TABLE IF EXISTS ' + tableName + '', []);
      tx.executeSql(
        'create table if not exists ' +
          tableName +
          '(id integer not null primary key, tablename text not null, content text not null, done int not null);',
        [],
        () => {
          resolve('Database created.');
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const addContent = (tableName, content, done) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'insert into ' +
          tableName +
          '(tablename, content, done) values(?,?,?);',
        [tableName, content, done],
        () => {
          resolve('Adding content.');
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
export const updateContent = (tableName, id, content, done) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'update ' + tableName + ' set content=?, done=? where id=?;',
        [content, done, id],
        () => {
          resolve("Updated.");
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
export const refreshDone = (tableName, done) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'update ' + tableName + ' set done=?;',
        [done],
        () => {
          resolve('Refresh succesful.');
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
export const checkItemDone = (tableName, done, id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'update ' + tableName + ' set done=? where id=?;',
        [done, id],
        () => {
          resolve('Item set done succesfully.');
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
export const deleteContent = (tableName, id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'delete from ' + tableName + ' where id=?;',
        [id],
        () => {
          resolve("Content deleted succesfully.");
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchAllContent = tableName => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from ' + tableName + ' where done=0',
        [],
        (tx, result) => {
          let items = [];
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
            console.log(result.rows.item(i));
          }
          resolve(items);
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchAllDoneContent = tableName => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from ' + tableName + ' where done=1',
        [],
        (tx, result) => {
          let items = [];

          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
            console.log(result.rows.item(i));
          }
          resolve(items);
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
