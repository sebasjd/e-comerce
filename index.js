const articulesContainer = document.getElementById("articulesContainer");


//renderizar productos de forma aleatoria

let renderHomePage = () => {
    const articules = document.createElement('section');
    articulesContainer.append(articules);
    articules.classList.add('articules');
    const aleatoryProduct = () => {
        for (let i = 0; i <= arrayProducts.length; i++) {
            const aleatoryProduct = arrayProducts[Math.floor(Math.random() * arrayProducts.length)];
            return aleatoryProduct
        }
    }

    const renderProduct = (producto) => {
        const productImg = producto.productImg;
        const name = producto.name;
        const price = producto.price;
        const productCard =
            `<section class="articles">
        <div class="product">
            <img src="${productImg}" alt="">
            <div class="info">
                <h3>${name}</h3>
                <p>$${price}</p>
            </div>
        </div>
        <div class="btns">
            <button>share</button>
            <button>Add to cart</button>
        </div>
    </section>`
        articules.innerHTML = productCard;
    }
    renderProduct(aleatoryProduct())
}
renderHomePage()


// console.log(aleatoryArray);