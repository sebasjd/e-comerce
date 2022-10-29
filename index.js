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
            const maker = producto.maker;
            const productCard =
                `<section class="articles">
        <div class="product">
            <img src="${productImg}" alt="Foto de ${maker} - ${name}" class="product_img">
            <div class="info">
            <h3 class="product_maker">${maker}</h3>
                <h3 class="product_name">${name}</h3>
                <p class="product_price">$ ${price}</p>
                <div class="btns">
                <a href="/"><button class="bn53">share</button></a>
                <button>Add to cart</button>
            </div>
            </div>
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

let limit = true;
window.addEventListener("scroll", () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 70 && limit) {
        limit = false;
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
            if (scrollTop + clientHeight >= scrollHeight - 70 && !limit) {
                limit = true;

                renderHomePage();
                loader.classList.add("removeLoader")
                console.log("Cargada la nueva página");
                return
            }
        }
        setTimeout(loadNewPage, 1000)
    })
    // Infinite scroll on home page