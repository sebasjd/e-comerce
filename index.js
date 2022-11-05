const articulesContainer = document.getElementById("articulesContainer");
let loader = document.getElementById("loader");

//saveing cart objects
var cartObjects = [];
const saveLocalStorage = () => localStorage.setItem("cartObjectsLS", JSON.stringify(cartObjectsLS))
    //take cart objects frop LS
let cartObjectsLS = JSON.parse(localStorage.getItem('cartObjectsLS'))
    // function that converts number to currency
const moneyTransform = (amount) => { return Intl.NumberFormat("ar-AR").format(amount); }

// Render product on home page
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
            const id = producto.id;
            const productCard =
                `
        <div class="product">
            <img src="${productImg}" alt="Foto de ${maker} - ${name}" class="product_img">
            <div class="info">
            <h3 class="product_maker">${maker}</h3>
                <h3 class="product_name">${name}</h3>
                <p class="product_price">$ ${moneyTransform(price)}</p>
                <div class="btns">
                <button class="bn53">Share</button>
                <button class="bn632-hover bn20" data-id="${id}">To Cart</button>
            </div>
            </div>
        </div>
`
            articules.innerHTML = productCard;
        }
        renderProduct(aleatoryProduct())

        //  To Cart & Share buttons operation
        const datasetBtn = articules.children[0].children[1].children[3].children[1].dataset.id
        const selectedProduct = arrayProducts.find(e => e.id == datasetBtn)
        const btnToCart = articules.querySelector(".bn20");

        //function to find the selected item & push on LS
        const addProduct = () => {
            console.log("object");

        }
        btnToCart.addEventListener("click", addProduct)

        //function to sharing feature
        const btnShare = articules.querySelector(".bn53");
        btnShare.addEventListener("click", function() { console.log("Tocaste Share") })
    }


}
document.addEventListener("DOMContentLoaded", renderHomePage())


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
            return
        }
    }
    setTimeout(loadNewPage, 1000)
})


//button +

const more = document.querySelector(".more")
const moreBtns = document.querySelectorAll(".hidenBtns")
let showMoreBtns = () => {
    for (let e of moreBtns) {
        e.classList.contains("showButton") ? e.classList.toggle("showButton") : e.classList.toggle("showButton");
    }
    more.textContent === "+" ? more.textContent = "-" : more.textContent = "+";
}
more.addEventListener("click", showMoreBtns);

// Filter

const samsung = document.querySelector(".samsung");
const motorola = document.querySelector(".motorola");
const apple = document.querySelector(".apple");
const alcatel = document.querySelector(".alcatel");
const tcl = document.querySelector(".tcl");
const noblex = document.querySelector(".noblex");
const nokia = document.querySelector(".nokia");
const xiaomi = document.querySelector(".xiaomi");


let selectedFilter = (trademark) => {
    const filteredProducts = arrayProducts.filter(e => e.maker.toLowerCase() == trademark.classList[0]);
    return filteredProducts
}

let renderFilteredProducts = (trademark) => {
    articulesContainer.innerHTML = ""
    const renderProduct = (producto) => {
        const articules = document.createElement('section');
        articulesContainer.append(articules);
        articules.classList.add('articules');

        const productImg = producto.productImg;
        const name = producto.name;
        const price = producto.price;
        const maker = producto.maker;
        const id = producto.id;
        const productCard =
            `
    <div class="product">
        <img src="${productImg}" alt="Foto de ${maker} - ${name}" class="product_img">
        <div class="info">
        <h3 class="product_maker">${maker}</h3>
            <h3 class="product_name">${name}</h3>
            <p class="product_price">$ ${moneyTransform(price)}</p>
            <div class="btns">
            <button class="bn53">Share</button>
            <button class="bn632-hover bn20" data-id="${id}">To Cart</button>
        </div>
        </div>
    </div>
`
        articules.innerHTML = productCard;


        //  To Cart & Share buttons operation
        const datasetBtn = articules.children[0].children[1].children[3].children[1].dataset.id
        const selectedProduct = arrayProducts.find(e => e.id == datasetBtn)
        const btnToCart = articules.querySelector(".bn20");

        //function to find the selected item & push on LS
        const addProduct = () => {
            console.log(datasetBtn);

        }
        btnToCart.addEventListener("click", addProduct)

        //function to sharing feature
        const btnShare = articules.querySelector(".bn53");
        btnShare.addEventListener("click", function() { console.log("Tocaste Share") })





    }
    selectedFilter(trademark).forEach(element => {
        renderProduct(element);
        console.log(element);
    });
}

samsung.addEventListener("click", function() { renderFilteredProducts(samsung) });
motorola.addEventListener("click", function() { renderFilteredProducts(motorola) });
apple.addEventListener("click", function() { renderFilteredProducts(apple) });
alcatel.addEventListener("click", function() { renderFilteredProducts(alcatel) });
tcl.addEventListener("click", function() { renderFilteredProducts(tcl) });
noblex.addEventListener("click", function() { renderFilteredProducts(noblex) });
nokia.addEventListener("click", function() { renderFilteredProducts(nokia) });
xiaomi.addEventListener("click", function() { renderFilteredProducts(xiaomi) });

// searcher

const searcher = document.querySelector("#searcher");

let searchedFilter = (trademark) => {
    const filteredProducts = arrayProducts.filter(e => e.maker.toLowerCase().includes(trademark.value) || e.name.toLowerCase().includes(trademark.value));
    return filteredProducts
}
let renderSearch = (trademark) => {
    articulesContainer.innerHTML = ""
    const renderProduct = (producto) => {
        const articules = document.createElement('section');
        articulesContainer.append(articules);
        articules.classList.add('articules');

        const productImg = producto.productImg;
        const name = producto.name;
        const price = producto.price;
        const maker = producto.maker;
        const id = producto.id;
        const productCard =
            `
    <div class="product">
        <img src="${productImg}" alt="Foto de ${maker} - ${name}" class="product_img">
        <div class="info">
        <h3 class="product_maker">${maker}</h3>
            <h3 class="product_name">${name}</h3>
            <p class="product_price">$ ${moneyTransform(price)}</p>
            <div class="btns">
            <button class="bn53">Share</button>
            <button class="bn632-hover bn20" data-id="${id}">To Cart</button>
        </div>
        </div>
    </div>
`
        articules.innerHTML = productCard;
        //  To Cart & Share buttons operation
        const datasetBtn = articules.children[0].children[1].children[3].children[1].dataset.id
        const selectedProduct = arrayProducts.find(e => e.id == datasetBtn)
        const btnToCart = articules.querySelector(".bn20");

        //function to find the selected item & push on LS
        const addProduct = () => {
            console.log(selectedProduct);

        }
        btnToCart.addEventListener("click", addProduct)

        //function to sharing feature
        const btnShare = articules.querySelector(".bn53");
        btnShare.addEventListener("click", function() { console.log("Tocaste Share") })

    }
    searchedFilter(trademark).forEach(element => {
        renderProduct(element);
        console.log(element);





    });
}
searcher.addEventListener("input", function() { renderSearch(searcher) });


const init = () => {
    cartObjects = cartObjectsLS

}