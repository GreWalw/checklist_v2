import React from 'react';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'checklist.db' });

//method returns a Promise - in the calling side .then(...).then(...)....catch(...) can be used
export const init=(tableName)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('DROP TABLE IF EXISTS '+tableName+'', []); //uncomment this if needed - sometimes it is good to empty the table
            //By default, primary key is auto_incremented - we do not add anything to that column
            tx.executeSql('create table if not exists '+tableName+'(id integer not null primary key, tablename text not null, content text not null, done int not null);',
            [],//second parameters of execution:empty square brackets - this parameter is not needed when creating table
            //If the transaction succeeds, this is called
            ()=>{
                resolve("Database created.");//There is no need to return anything
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
                console.log("db 22");
            }
            );
        });
    });
    return promise;
};

export const addContent=(tableName, content, done)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            console.log("db 32");
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('insert into '+tableName+'(tablename, content, done) values(?,?,?);',
            //And the values come here
            [tableName, content, done],
            //If the transaction succeeds, this is called
            ()=>{
                    resolve("Adding content.");
                    console.log("db 39");
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
                console.log("db 44");
            }
            );
        });
    });
    return promise;
};
export const updateContent=(tableName, id, content, done)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('update '+tableName+' set content=?, done=? where id=?;',
            //And the values come here
            [content, done, id],
            //If the transaction succeeds, this is called
            ()=>{
                    resolve();
                    console.log("db resolve");
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
                console.log("db erroria");
            }
            );
        });
    });
    return promise;
};
export const refreshDone=(tableName, done)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('update '+tableName+' set done=?;',
            //And the values come here
            [done],
            //If the transaction succeeds, this is called
            ()=>{
                    resolve("Success.");
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
                console.log("Error db 87");
            }
            );
        });
    });
    return promise;
};
export const deleteContent=(tableName, id)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('delete from '+tableName+' where id=?;',
            //And the values come here
            [id],
            //If the transaction succeeds, this is called
            ()=>{
                    resolve();
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const fetchAllContent=(tableName)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('select * from '+tableName+' where done=0', [],
                (tx, result)=>{
                    let items=[];//Create a new empty Javascript array
                    //And add all the items of the result (database rows/records) into that table
                    for (let i = 0; i < result.rows.length; i++){
                        items.push(result.rows.item(i));//The form of an item is {"breed": "Pike", "id": 1, "weight": 5000}
                        console.log(result.rows.item(i));//For debugging purposes to see the data in console window
                    }
                    console.log(items);//For debugging purposes to see the data in console window
                    resolve(items);//The data the Promise will have when returned
                },
                (tx,err)=>{
                    console.log("Err");
                    console.log(err);
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchAllDoneContent=(tableName)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('select * from '+tableName+' where done=1', [],
                (tx, result)=>{
                    let items=[];//Create a new empty Javascript array
                    
                    for (let i = 0; i < result.rows.length; i++){
                        items.push(result.rows.item(i));
                        console.log(result.rows.item(i));
                    }
                    console.log(items);
                    resolve(items);
                },
                (tx,err)=>{
                    console.log("Err");
                    console.log(err);
                    reject(err);
                }
            );
        });
    });
    return promise;
};
