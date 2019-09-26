
if ('serviceWorker' in navigator) {
  // console.log("hi");
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js')
      .then(function (registration) {
        console.log('Registration successful, scope is:', registration.scope);
      })
      .catch(function (error) {
        console.log('Service worker registration failed, error:', error);
      });
  })
}

document.addEventListener('DOMContentLoaded', function () {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
});

// var db;
function addRecipe() {
  if (!('indexedDB' in window)) {
    console.log('This browser does not support IndexedDB');
  } else {
    console.log('In function');
    var openRequest = indexedDB.open('test_db', 1);
    openRequest.onupgradeneeded = function (e) {
      console.log('In Open Request');
      var db = e.target.result;
      console.log('running onupgradeneeded');
      if (!db.objectStoreNames.contains('recipe')) {
        var storeOS = db.createObjectStore('recipe',
          { autoIncrement: true });
      }
    };
    openRequest.onsuccess = function (e) {
      console.log('running onsuccess');
      db = e.target.result;
      console.log("------>", db)
      addItem();

    };
    openRequest.onerror = function (e) {
      console.log('onerror!');
      console.dir(e);
    };
    function addItem() {
      var transaction = db.transaction(['recipe'], 'readwrite');
      var recipe = transaction.objectStore('recipe');
      var item = {
        title: document.getElementById("title").value,
        ingredients: document.getElementById("ingredients").value,
        created: new Date().getTime()
      };

      var request = recipe.add(item);

      request.onerror = function (e) {
        console.log('Error', e.target.error.name);
      };
      request.onsuccess = function (e) {
        console.log('Woot! Did it');
        document.getElementById("title").value = '';
        document.getElementById("ingredients").value = '';
        console.log("he he-----");

      };

    }

  }

}
