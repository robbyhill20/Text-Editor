import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectstoredNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectstored('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const txt = jateDb.transaction('jate', 'readwrite');
  const stored = txt.objectstored('jate');
  const request = stored.put({ id: 1, value: content });
  const result = await request;
  console.log(' to the database', result.value)
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const txt = jateDb.transaction('jate', 'readonly');
  const stored = txt.objectstored('jate');
  const request = stored.get(1);
  const jateDb = await openDB('jate', 1);
  
  const result = await request;
  result
   ? console.log('got data', result.value)
  : console.log('nothing found');
 
  return result?.value;
}
initdb();
