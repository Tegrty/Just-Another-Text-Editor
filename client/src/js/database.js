import { openDB } from "idb";
import { NoEmitOnErrorsPlugin } from "webpack";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const id = await store.add(content);
  await tx.complete;
  return id;
};

export const getDb = async () => {
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const allContent = await store.getAll();
  await tx.complete;
  return allContent;
};

initdb();

// The putDb function creates a connection to the "jate" database, starts a read-write transaction on the "jate" object store, adds the content to the object store using the add method, waits for the transaction to complete using await tx.complete, and returns the id of the newly added object.

// The getDb function also creates a connection to the "jate" database, starts a read-only transaction on the "jate" object store, retrieves all the content using the getAll method, waits for the transaction to complete using await tx.complete, and returns all the content in the "jate" object store. 