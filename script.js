// my bookmarks code
let bookmarks = [];

let saved = localStorage.getItem('bookmarks');
if (saved) {
  bookmarks = JSON.parse(saved);
}

function saveBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// change between the 2 pages
function goToPage() {
  if (location.hash == '#add') {
    document.getElementById('all-page').style.display = 'none';
    document.getElementById('add-page').style.display = 'block';
    document.getElementById('all-link').className = '';
    document.getElementById('add-link').className = 'on';
  } else {
    document.getElementById('all-page').style.display = 'block';
    document.getElementById('add-page').style.display = 'none';
    document.getElementById('all-link').className = 'on';
    document.getElementById('add-link').className = '';
  }
}

function showList() {
  let list = document.getElementById('list');
  list.innerHTML = '';
  document.getElementById('total').textContent = 'Total: ' + bookmarks.length;

  if (bookmarks.length == 0) {
    list.innerHTML = '<div class="empty"><h3>No bookmarks yet</h3><p>Go to Add Bookmark to save a website.</p></div>';
  }

  for (let i = 0; i < bookmarks.length; i++) {
    let b = bookmarks[i];
    list.innerHTML += '<div class="bookmark">' +
      '<h3>' + b.title + '</h3>' +
      '<p>Category: ' + b.category + '</p>' +
      '<p><a href="' + b.url + '" target="_blank">' + b.url + '</a></p>' +
      '<button onclick="editItem(' + i + ')">Edit</button>' +
      '<button class="delete" onclick="deleteItem(' + i + ')">Delete</button>' +
      '</div>';
  }
}

function deleteItem(i) {
  bookmarks.splice(i, 1);
  saveBookmarks();
  showList();
}

function editItem(i) {
  let newTitle = prompt('New title:', bookmarks[i].title);
  if (newTitle != null && newTitle != '') {
    bookmarks[i].title = newTitle;
  }
  let newUrl = prompt('New URL:', bookmarks[i].url);
  if (newUrl != null && newUrl != '') {
    bookmarks[i].url = newUrl;
  }
  // I still need to figure out how to change the category
  showList();
}

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();
  let title = document.getElementById('title').value;
  let url = document.getElementById('url').value;
  let category = document.getElementById('category').value;

  let newBookmark = {title: title, url: url, category: category};
  bookmarks.push(newBookmark);
  saveBookmarks();
  showList();

  document.getElementById('form').reset();
  location.hash = '#all';
});

window.addEventListener('hashchange', goToPage);
showList();
goToPage();
