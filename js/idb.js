import idb from 'idb';
await idb.open();

const dbPromise = idb.open("mydatabase",1,function(upgradeDB){
    if(!upgradeDB.objectStoreNames.contains("events")){
        upgradeDB.createObjectStore("events")
    }
})