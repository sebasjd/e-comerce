const articlesContainer = document.getElementById("articlesContainer");
const cartContainer = document.querySelector(".cartContainer")
let modal = document.querySelector(".modal");
let loader = document.getElementById("loader");



//saveing cart objects
const saveLocalStorage = (cartObjects) => localStorage.setItem("cartObjectsLS", JSON.stringify(cartObjects));
//take cart objects frop LS
let cartObjectsLS = JSON.parse(localStorage.getItem('cartObjectsLS')) || [];
// Show cart number
const cartNumber = document.querySelector(".cartNumber");
const refreshNumber = () => {
    if (cartObjectsLS.length == 0) { cartNumber.setAttribute("style", ("color: rgb(255,255,255)")) } else {
        cartNumber.setAttribute("style", "#16003b")
    }
    cartNumber.innerText = ""
    var quantityCart = 0
    cartObjectsLS.forEach(e => {
        quantityCart += e.quantity
    })
    cartNumber.innerText = quantityCart
}
refreshNumber()

// function that converts number to currency
const moneyTransform = (amount) => { return Intl.NumberFormat("ar-AR").format(amount); }
    // Render product on home page
let renderHomePage = () => {
    for (let i = 0; i <= 7; i++) {
        const articles = document.createElement('section');
        articlesContainer.append(articles);
        articles.classList.add('articles');
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
            articles.innerHTML = productCard;
        }
        renderProduct(aleatoryProduct())

        //  To Cart & Share buttons operation
        const datasetBtn = articles.children[0].children[1].children[3].children[1].dataset.id
        const selectedProduct = arrayProducts.find(e => e.id == datasetBtn)
        const btnToCart = articles.querySelector(".bn20");

        //function to find the selected item & push on LS
        const addProduct = () => {
            if (cartObjects.includes(selectedProduct)) {
                selectedProduct.quantity++;
            } else { cartObjects.push(selectedProduct) }
            saveLocalStorage(cartObjects)

            //Show Modal
            function hideModal() { modal.classList.replace("showModal", "hideModal"); }
            const showModal = () => {
                modal.classList.replace("hideModal", "showModal");
                modal.innerText = "Added to cart"
                setTimeout(hideModal, 1000);
            }
            showModal()

            //cart number
            const cartNumber = document.querySelector(".cartNumber");
            const refreshNumber = () => {
                if (cartObjects.length == 0) { cartNumber.setAttribute("style", ("color: rgb(255,255,255)")) } else {
                    cartNumber.setAttribute("style", "#16003b")
                }
                cartNumber.innerText = ""
                var quantityCart = 0
                cartObjects.forEach(e => {
                    quantityCart += e.quantity
                })
                cartNumber.innerText = quantityCart
            }
            refreshNumber()
        }
        btnToCart.addEventListener("click", addProduct)

        //function to sharing feature
        const btnShare = articles.querySelector(".bn53");
        var nativeShare = function() {
            if (window.innerWidth <= 768) {
                window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(`*Check out this article in this store. It's AWESOME!* https://e-commerce-sebasjd.vercel.app/${selectedProduct.id}.html`));
            } else { window.open("https://web.whatsapp.com/send?text=" + encodeURIComponent(`*Check out this article in this store. It's AWESOME!* https://e-commerce-sebasjd.vercel.app/${selectedProduct.id}.html`)); }
        }
        btnShare.addEventListener("click", nativeShare)

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
    if (articlesContainer.classList.contains("homePage")) {
        if (scrollTop + clientHeight >= scrollHeight - 70 && limit) {
            limit = false;
            loader.classList.remove("removeLoader")
        }
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
        if (articlesContainer.classList.contains("homePage")) {
            if (scrollTop + clientHeight >= scrollHeight - 70 && !limit) {
                limit = true;
                renderHomePage();
                loader.classList.add("removeLoader")
                return
            }
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
    tcl.classList.contains("showButton") ? more.innerHTML = `<i class="fa-solid fa-minus"></i>` : more.innerHTML = `<i class="fa-solid fa-plus"></i>`;
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
//filter desktop
const samsungDesktop = document.querySelector(".samsungDesktop");
const motorolaDesktop = document.querySelector(".motorolaDesktop");
const appleDesktop = document.querySelector(".appleDesktop");
const alcatelDesktop = document.querySelector(".alcatelDesktop");
const tclDesktop = document.querySelector(".tclDesktop");
const noblexDesktop = document.querySelector(".noblexDesktop");
const nokiaDesktop = document.querySelector(".nokiaDesktop");
const xiaomiDesktop = document.querySelector(".xiaomiDesktop");


let selectedFilter = (trademark) => {
    const filteredProducts = arrayProducts.filter(e => e.maker.toLowerCase() == trademark.classList[0]);
    return filteredProducts
}

let renderFilteredProducts = (trademark) => {
    articlesContainer.innerHTML = ""
    const renderProduct = (producto) => {
        const articles = document.createElement('section');
        articlesContainer.append(articles);
        articles.classList.add('articles');

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
        articles.innerHTML = productCard;

        //  To Cart & Share buttons operation
        const datasetBtn = articles.children[0].children[1].children[3].children[1].dataset.id
        const selectedProduct = arrayProducts.find(e => e.id == datasetBtn)
        const btnToCart = articles.querySelector(".bn20");

        //function to find the selected item & push on LS
        const addProduct = () => {
            if (cartObjects.includes(selectedProduct)) {
                selectedProduct.quantity++;
            } else { cartObjects.push(selectedProduct) }
            saveLocalStorage(cartObjects);
            //Show Modal
            function hideModal() { modal.classList.replace("showModal", "hideModal"); }
            const showModal = () => {
                modal.classList.replace("hideModal", "showModal");
                modal.innerText = "Added to cart"
                setTimeout(hideModal, 1000);
            }
            showModal()
                //cart number
            const cartNumber = document.querySelector(".cartNumber");
            const refreshNumber = () => {
                if (cartObjects.length == 0) { cartNumber.setAttribute("style", ("color: rgb(255,255,255)")) } else {
                    cartNumber.setAttribute("style", "#16003b")
                }
                cartNumber.innerText = ""
                var quantityCart = 0
                cartObjects.forEach(e => {
                    quantityCart += e.quantity
                })
                cartNumber.innerText = quantityCart
            }
            refreshNumber()
        }
        btnToCart.addEventListener("click", addProduct)

        //function to sharing feature
        const btnShare = articles.querySelector(".bn53");
        btnShare.addEventListener("click", function() { console.log("Tocaste Share") })
    }
    selectedFilter(trademark).forEach(element => renderProduct(element));
    articlesContainer.classList.remove("homePage")
    window.scroll({
        top: 350,
        behavior: 'smooth'
    });
    // close menu
    const quickAccessDesktop = document.querySelector(".quickAccessDesktop");
    const closeMenu = () => {
        quickAccessDesktop.classList.add("more");
        let removeClass = () => quickAccessDesktop.classList.remove("more");
        setTimeout(removeClass, 100)
    }
    closeMenu()

}

samsung.addEventListener("click", function() { renderFilteredProducts(samsung) });
motorola.addEventListener("click", function() { renderFilteredProducts(motorola) });
apple.addEventListener("click", function() { renderFilteredProducts(apple) });
alcatel.addEventListener("click", function() { renderFilteredProducts(alcatel) });
tcl.addEventListener("click", function() { renderFilteredProducts(tcl) });
noblex.addEventListener("click", function() { renderFilteredProducts(noblex) });
nokia.addEventListener("click", function() { renderFilteredProducts(nokia) });
xiaomi.addEventListener("click", function() { renderFilteredProducts(xiaomi) });
samsungDesktop.addEventListener("click", function() { renderFilteredProducts(samsung) });
motorolaDesktop.addEventListener("click", function() { renderFilteredProducts(motorola) });
appleDesktop.addEventListener("click", function() { renderFilteredProducts(apple) });
alcatelDesktop.addEventListener("click", function() { renderFilteredProducts(alcatel) });
tclDesktop.addEventListener("click", function() { renderFilteredProducts(tcl) });
noblexDesktop.addEventListener("click", function() { renderFilteredProducts(noblex) });
nokiaDesktop.addEventListener("click", function() { renderFilteredProducts(nokia) });
xiaomiDesktop.addEventListener("click", function() { renderFilteredProducts(xiaomi) });

// searcher

const searcher = document.querySelector("#searcher");

let searchedFilter = (trademark) => {
    const filteredProducts = arrayProducts.filter(e => e.maker.toLowerCase().includes(trademark.value.toLowerCase()) || e.name.toLowerCase().includes(trademark.value));
    return filteredProducts
}
let renderSearch = (trademark) => {
    articlesContainer.innerHTML = ""
    const renderProduct = (producto) => {
        const articles = document.createElement('section');
        articlesContainer.append(articles);
        articles.classList.add('articles');

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
        articles.innerHTML = productCard;
        //  To Cart & Share buttons operation
        const datasetBtn = articles.children[0].children[1].children[3].children[1].dataset.id
        const selectedProduct = arrayProducts.find(e => e.id == datasetBtn)
        const btnToCart = articles.querySelector(".bn20");

        //function to find the selected item & push on LS
        const addProduct = () => {
            if (cartObjects.includes(selectedProduct)) {
                selectedProduct.quantity++;
            } else { cartObjects.push(selectedProduct) }
            saveLocalStorage(cartObjects)

            //Show Modal
            function hideModal() { modal.classList.replace("showModal", "hideModal"); }
            const showModal = () => {
                modal.classList.replace("hideModal", "showModal");
                modal.innerText = "Added to cart"
                setTimeout(hideModal, 1000);
            }
            showModal()
                //cart number
            const cartNumber = document.querySelector(".cartNumber");
            const refreshNumber = () => {
                if (cartObjects.length == 0) { cartNumber.setAttribute("style", ("color: rgb(255,255,255)")) } else {
                    cartNumber.setAttribute("style", "#16003b")
                }
                cartNumber.innerText = ""
                var quantityCart = 0
                cartObjects.forEach(e => {
                    quantityCart += e.quantity
                })
                cartNumber.innerText = quantityCart
            }
            refreshNumber()

        }
        btnToCart.addEventListener("click", addProduct)

        //function to sharing feature
        const btnShare = articles.querySelector(".bn53");
        btnShare.addEventListener("click", function() { console.log("Tocaste Share") })
    }
    searchedFilter(trademark).forEach(element => renderProduct(element));
    articlesContainer.classList.remove("homePage")
}
searcher.addEventListener("input", function() { renderSearch(searcher) });

// render cart

const RenderCart = () => {
    cartObjects = JSON.parse(localStorage.getItem('cartObjectsLS')) || []
    let money = document.querySelector(".money");
    const renderAmount = () => {
        var amount = 0;
        cartObjects.forEach(e => {
            amount += e.price * e.quantity;
        });
        money.innerHTML = `<p>$ ${moneyTransform(amount)}</p>`
    }
    const renderCartItems = (producto) => {
        const cartarticles = document.createElement('section');
        cartContainer.append(cartarticles);
        cartarticles.classList.add('cartarticles');

        const productImg = producto.productImg;
        const name = producto.name;
        const price = producto.price;
        const maker = producto.maker;
        const id = producto.id;
        const quantity = producto.quantity

        const productCard =
            `
<div class="product">
<img src="${productImg}" alt="Foto de ${maker} - ${name}" class="product_img">
<div class="info">
<h3 class="product_maker">${maker}</h3>
    <h3 class="product_name">${name}</h3>
    <p class="product_price">$ ${moneyTransform(price)}</p>
    <div class="cartBtns">
    <button class="down" data-id="${id}"><i class="fa-regular fa-square-caret-down"></i></button>
    <input type="number" value=${quantity} class="quantity" min="1" readonly>
    <button class="up" data-id="${id}"><i class="fa-regular fa-square-caret-up"></i></i></button>
    <button class="bn632-hover bn20 remove" data-id="${id}">Remove</button>
</div>
</div>
</div>
`
        cartarticles.innerHTML = productCard;

        const datasetBtn = cartarticles.children[0].children[1].children[3].children[2].dataset.id
        const selectedProduct = cartObjects.find(e => e.id == datasetBtn)
        const btnRemove = cartarticles.querySelector(".remove");
        // delete item function
        function removeObject() {
            cartObjects = cartObjects.filter(e => e.id != datasetBtn)
            saveLocalStorage(cartObjects)
            cartContainer.innerHTML = ""
            renderAmount()
            RenderCart()
                //cart number
            const cartNumber = document.querySelector(".cartNumber");
            const refreshNumber = () => {
                if (cartObjects.length == 0) { cartNumber.setAttribute("style", ("color: rgb(255,255,255)")) } else {
                    cartNumber.setAttribute("style", "#16003b")
                }
                cartNumber.innerText = ""
                var quantityCart = 0
                cartObjects.forEach(e => {
                    quantityCart += e.quantity
                })
                cartNumber.innerText = quantityCart
            }
            refreshNumber()


        }
        btnRemove.addEventListener("click", removeObject);

        // increase & decrease cuantity
        const up = cartarticles.querySelector(".up");
        const down = cartarticles.querySelector(".down");
        const handleQuantity = cartarticles.querySelector(".quantity");
        const downArrow = cartarticles.querySelector(".fa-square-caret-down");

        if (handleQuantity.value > 1) {
            downArrow.classList.remove("blockDown")
        } else { downArrow.classList.add("blockDown") }

        function increase() {
            selectedProduct.quantity++;
            handleQuantity.value++;
            downArrow.classList.remove("blockDown")
            renderAmount()
            saveLocalStorage(cartObjects);
            //cart number
            const cartNumber = document.querySelector(".cartNumber");
            const refreshNumber = () => {
                if (cartObjects.length == 0) { cartNumber.setAttribute("style", ("color: rgb(255,255,255)")) } else {
                    cartNumber.setAttribute("style", "#16003b")
                }
                cartNumber.innerText = ""
                var quantityCart = 0
                cartObjects.forEach(e => {
                    quantityCart += e.quantity
                })
                cartNumber.innerText = quantityCart
            }
            refreshNumber()

        }

        function decrease() {
            if (handleQuantity.value > 1) {
                selectedProduct.quantity--;
                handleQuantity.value--;
                renderAmount()
                saveLocalStorage(cartObjects);
            };
            if (handleQuantity.value == 1) { downArrow.classList.add("blockDown") }
            //cart number
            const cartNumber = document.querySelector(".cartNumber");
            const refreshNumber = () => {
                if (cartObjects.length == 0) { cartNumber.setAttribute("style", ("color: rgb(255,255,255)")) } else {
                    cartNumber.setAttribute("style", "#16003b")
                }
                cartNumber.innerText = ""
                var quantityCart = 0
                cartObjects.forEach(e => {
                    quantityCart += e.quantity
                })
                cartNumber.innerText = quantityCart
            }
            refreshNumber()

        }
        up.addEventListener("click", increase)
        down.addEventListener("click", decrease)
    }
    cartObjects.forEach(e => renderCartItems(e));
    renderAmount()

}

//show & hide cart
const cartBtn = document.getElementById("cart");
const cart = document.querySelector(".cart");
const close = document.querySelector(".close");

const showCart = () => {
    cartContainer.innerHTML = ""
    RenderCart();
    if (cart.classList.contains("hideCart")) { cart.classList.replace("hideCart", "showCart") }
}
const hideCart = () => { if (cart.classList.contains("showCart")) { cart.classList.replace("showCart", "hideCart") } }
    // hide cart if click is outside cart window
cartBtn.addEventListener("click", showCart);
close.addEventListener("click", hideCart);
const hideCartClick = (e) => { if (cart.classList.contains("showCart") && !cart.contains(e.target) && !cartBtn.contains(e.target) && !e.target.classList.contains("remove")) { hideCart() } }
document.addEventListener("click", hideCartClick);
window.addEventListener("scroll", hideCart);
RenderCart();