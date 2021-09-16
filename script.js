function displaySearch(books) {
    for ( var i = 0; i < books.length; i++) {
        const searchResult_div = document.createElement('div'),
              picContainer_div = document.createElement('div'),
              book_img = document.createElement('img'),
              title_p = document.createElement('p'),
              bookInfoCont_div = document.createElement('div'),
              author_p = document.createElement('p'),
              genre_p = document.createElement('p'),
              synopsis_p = document.createElement('p');
        
        searchResult_div.id = 'search-result';
        picContainer_div.id = 'pic-container';
        book_img.id = 'pic';
        bookInfoCont_div.id = 'book-info';

        book_img.src = books[i].volumeInfo.imageLinks.thumbnail;
        title_p.innerHTML = books[i].volumeInfo.title;
        author_p.innerHTML = `<b>Author(s):</b> ${books[i].volumeInfo.authors}`;
        genre_p.innerHTML = `<b>Genre(s):</b> ${books[i].volumeInfo.categories}`;
        synopsis_p.innerHTML = `<b>Synopsis:</b> ${books[i].volumeInfo.description}`;

        if(books[i].volumeInfo.authors === undefined) {
            author_p.innerHTML = `<b>Author(s):</b> Author(s) not found`;
        }
        if(books[i].volumeInfo.categories === undefined) {
            genre_p.innerHTML = `<b>Genre(s):</b> Genres(s) not found`;
        }
        if(books[i].volumeInfo.description === undefined) {
            synopsis_p.innerHTML = `<b>Synopsis:</b> Synopsis not found`;
        }


        picContainer_div.appendChild(book_img);
        picContainer_div.appendChild(title_p)

        bookInfoCont_div.appendChild(author_p);
        bookInfoCont_div.appendChild(genre_p);
        bookInfoCont_div.appendChild(synopsis_p);

        searchResult_div.appendChild(picContainer_div);
        searchResult_div.appendChild(bookInfoCont_div);

        document.getElementById('book-container').appendChild(searchResult_div);
    }
} 

function search() {
    //Input your own Google API Key
    const googleBooks_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchField.value}&key=`
    fetch(googleBooks_URL)
    .then( (response) =>  response.json() )
    .then( (data) => {
        const books = data.items;
        displaySearch(books);
    }) 
    .catch(error => console.log('Request failed:', error))
}

function clearSearch() {
    const bookContainer_div = document.getElementById('book-container');
    bookContainer_div.innerHTML = '';
}

var searchField = document.getElementById('input-field');
var searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', function( event ) {
    clearSearch();
    search();
});

searchField.addEventListener('keydown', function( event ) {
    if (event.key === 'Enter'){
        searchBtn.click();
    }
})


