const dbPromise = idb.open("save_liga", 1, function(upgradeDb) {
    const ligasave = upgradeDb.createObjectStore("liga");
    ligasave.creteIndex("liga_skor","liga_skor",{
        unique: false
    })
});

function saveLigaSkor (skor){
    console.log(skor)
    dbPromise.then(
        function(db){
            const tx = db.transaction('liga','readwrite')
            const store = tx.objectStore('liga');

            console.log(store)
            return db.add(skor.standings)
        }
    )
}

// function saveLigaSkor(skor) {
//     dbPromised
//       .then(function(db) {
//         var tx = db.transaction("skors", "readwrite");
//         var store = tx.objectStore("skors");
//         console.log(skor);
//         store.add(skor.standings);
//         return tx.complete;
//       })
//       .then(function() {
//         console.log("Skor berhasil di simpan.");
//       });
//   }
  