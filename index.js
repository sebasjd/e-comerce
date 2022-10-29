const articles = document.getElementById("articles");



//renderizar productos de forma aleatoria
let renderHomePage = () => {
    const aleatoryArray = arrayProducts[Math.floor(Math.random() * arrayProducts.length)];
    aleatoryArray.map(articles.innerHTML = `('<div id="articles">
    <div class="product">
        <img src="./resources/Samsung A23.jpg" alt="">
        <div class="info">
            <h3>product description</h3>
            <p>$00,00</p>
        </div>
    </div>
    <div class="btns">
        <button>share</button>
        <button>Add to cart</button>
    </div>
</div>'))`)
}

// renderHomePage()

console.log(arrayProducts);