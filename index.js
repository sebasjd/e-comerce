const articulesContainer = document.getElementById("articulesContainer");
let loader = document.getElementById("loader");


// Render product on the home page
let renderHomePage = () => {
    for (let i = 0; i <= 3; i++) {
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
}
document.addEventListener("DOMContentLoaded", renderHomePage())
    // Render product on the home page


//Infinite scroll on home page

// Show loader
window.addEventListener("scroll", () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
        loader.classList.remove("removeLoader")
        console.log("Final de la página");
        return
    }
})

// show new page and remove loader
window.addEventListener("scroll", () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        let loadNewPage = () => {
            if (scrollTop + clientHeight >= scrollHeight) {
                renderHomePage();
                loader.classList.add("removeLoader")

                console.log("Cargada la nueva página");
            }
        }
        setTimeout(loadNewPage, 2000)
    })
    // Infinite scroll on home page