import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Updated Put DB
export const putDb = async (content) => {
  console.log('Updated DB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id, content });
  const result = await request;
  console.log('Data successfully saved to the database', result);
  
};
//Getting All Content 
export const getDb = async () => {
  console.log('Get all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
 const request = store.getAll();
 const result = await request;
  console.log('Data from database:', result);
}

initdb();
