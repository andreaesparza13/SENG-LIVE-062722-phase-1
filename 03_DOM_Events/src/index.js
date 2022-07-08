document.addEventListener("DOMContentLoaded", () => {
    renderHeader()
    renderFooter()
    bookStore.inventory.forEach(renderBookCard)
    document.querySelector('#book-form').addEventListener('submit', handleForm)


    // Renders Header
    function renderHeader(){
        document.querySelector('h1').textContent = bookStore.name
    }
    // Renders Footer
    function renderFooter(){
        const footerDivs = document.querySelectorAll('footer div')
        footerDivs[0].textContent = bookStore.name
        footerDivs[1].textContent = bookStore.address
        footerDivs[2].textContent = bookStore.hours
    }

    function renderBookCard(cardData) {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const pAuthor = document.createElement('p')
        const pPrice = document.createElement('p')
        const img = document.createElement('img')
        const btn = document.createElement('button')

        h3.textContent = cardData.title
        pAuthor.textContent = cardData.author
        pPrice.textContent = `$${cardData.price}`
        btn.textContent = 'Delete'
        btn.addEventListener('click', () => li.remove()) // ORRRR e.target.parentElement.remove()
            

        img.src = cardData.imageUrl
        li.className = 'list-li'

        li.append(h3,pAuthor,pPrice,img,btn)
        document.querySelector('#book-list').append(li)
    }

    function handleForm(e) {
        e.preventDefault()

        //Build book object
        const bookObj = {
            id: bookStore.inventory.length + 1,
            title: e.target.title.value,
            author: e.target.author.value,
            price: e.target.price.value,
            reviews: [],
            inventory: e.target.inventory.value,
            imageUrl: e.target.imageUrl.value
        }
        bookStore.inventory.push(bookObj)
        renderBookCard(bookObj)
        
    }
})