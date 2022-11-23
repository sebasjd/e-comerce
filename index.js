const articlesContainer = document.getElementById("articlesContainer");
const cartContainer = document.querySelector(".cartContainer")
let modal = document.querySelector(".modal");
let loader = document.getElementById("loader");
const crystal = document.querySelector(".crystal")


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

// Carousel

var images = ['./resources/samsung.jpg','./resources/tcl.jpg','./resources/alcatel.jpg','./resources/samsung2.jpg', './resources/galaxy.jpg','./resources/iphone.jpg', './resources/xiaomi.jpg']
let cont = 0;
const container = document.querySelector('#publicity') 
function carrousel(container){

if(cont < images.length){
    container.setAttribute("style",`background-image: url(${images[cont]})`) 
    cont++
} else { 
    container.setAttribute("style",`background-image: url(${images[0]})`);
    cont = 1;
}
}


document.addEventListener("DOMContentLoaded",()=>{
    setInterval(carrousel, 5000, container)
})

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

            //cart refresh number
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
                window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(`*This store is AWESOME!*  has a *${selectedProduct.maker}* at *$${moneyTransform(selectedProduct.price)}*         - https://e-commerce-sebasjd.vercel.app`));
            } else { window.open("https://web.whatsapp.com/send?text=" + encodeURIComponent(`*This store is AWESOME!*  has a *${selectedProduct.maker}* at *$${moneyTransform(selectedProduct.price)}*         - https://e-commerce-sebasjd.vercel.app`)); }
        }
        btnShare.addEventListener("click", nativeShare)
        articlesContainer.classList.add("homePage");

        // More information
        let card = articles.querySelector(".product");
        let centerCard = document.querySelector(".centerCard")
        const moreInfo = () =>{
            centerCard.innerHTML=`
            <i class="fa-solid fa-angle-right"></i>
            <img src="${selectedProduct.productImg}" alt="Foto de ${selectedProduct.maker} - ${selectedProduct.name}" class="imgCard">
            <p class="priceCard">$ ${moneyTransform(selectedProduct.price)}</p>
            <p class="titleCard">${selectedProduct.name}</p>
            <p class="descriptCard">"${selectedProduct.description}</p>
            `
            centerCard.classList.add("showCart");

            let closeCard = document.querySelector(".fa-angle-right");
            const closeCardFunct = () =>{
                centerCard.classList.contains("showCart")? centerCard.classList.remove("showCart") : null;
            }
            closeCard.addEventListener("click", closeCardFunct)
        }
        card.addEventListener("click",moreInfo)
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
const all = document.querySelector(".all");
//filter desktop
const samsungDesktop = document.querySelector(".samsungDesktop");
const motorolaDesktop = document.querySelector(".motorolaDesktop");
const appleDesktop = document.querySelector(".appleDesktop");
const alcatelDesktop = document.querySelector(".alcatelDesktop");
const tclDesktop = document.querySelector(".tclDesktop");
const noblexDesktop = document.querySelector(".noblexDesktop");
const nokiaDesktop = document.querySelector(".nokiaDesktop");
const xiaomiDesktop = document.querySelector(".xiaomiDesktop");
const allDesktop = document.querySelector(".allDesktop");


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
        var nativeShare = function() {
            if (window.innerWidth <= 768) {
                window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(`*This store is AWESOME!*  has a *${selectedProduct.maker}* at *$${moneyTransform(selectedProduct.price)}*         - https://e-commerce-sebasjd.vercel.app`));
            } else { window.open("https://web.whatsapp.com/send?text=" + encodeURIComponent(`*This store is AWESOME!*  has a *${selectedProduct.maker}* at *$${moneyTransform(selectedProduct.price)}*         - https://e-commerce-sebasjd.vercel.app`)); }
        }
        btnShare.addEventListener("click", nativeShare)


        // More information
        let card = articles.querySelector(".product");
        let centerCard = document.querySelector(".centerCard")
        const moreInfo = () =>{
            centerCard.innerHTML=`
            <i class="fa-solid fa-angle-right"></i>
            <img src="${selectedProduct.productImg}" alt="Foto de ${selectedProduct.maker} - ${selectedProduct.name}" class="imgCard">
            <p class="priceCard">$ ${moneyTransform(selectedProduct.price)}</p>
            <p class="titleCard">${selectedProduct.name}</p>
            <p class="descriptCard">"${selectedProduct.description}</p>
            `
            centerCard.classList.add("showCart");
            
            let closeCard = document.querySelector(".fa-angle-right");
            const closeCardFunct = () =>{
                centerCard.classList.contains("showCart")? centerCard.classList.remove("showCart") : null;
            }
            closeCard.addEventListener("click", closeCardFunct)
        }
        card.addEventListener("click",moreInfo)
    }
    selectedFilter(trademark).forEach(element => renderProduct(element));
    articlesContainer.classList.remove("homePage");
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
all.addEventListener("click", function() { renderHomePage() });
samsungDesktop.addEventListener("click", function() { renderFilteredProducts(samsung) });
motorolaDesktop.addEventListener("click", function() { renderFilteredProducts(motorola) });
appleDesktop.addEventListener("click", function() { renderFilteredProducts(apple) });
alcatelDesktop.addEventListener("click", function() { renderFilteredProducts(alcatel) });
tclDesktop.addEventListener("click", function() { renderFilteredProducts(tcl) });
noblexDesktop.addEventListener("click", function() { renderFilteredProducts(noblex) });
nokiaDesktop.addEventListener("click", function() { renderFilteredProducts(nokia) });
xiaomiDesktop.addEventListener("click", function() { renderFilteredProducts(xiaomi) });
allDesktop.addEventListener("click", function() { renderHomePage() });

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
        var nativeShare = function() {
            if (window.innerWidth <= 768) {
                window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(`*This store is AWESOME!*  has a *${selectedProduct.maker}* at *$${moneyTransform(selectedProduct.price)}*         - https://e-commerce-sebasjd.vercel.app`));
            } else { window.open("https://web.whatsapp.com/send?text=" + encodeURIComponent(`*This store is AWESOME!*  has a *${selectedProduct.maker}* at *$${moneyTransform(selectedProduct.price)}*         - https://e-commerce-sebasjd.vercel.app`)); }
        }
        btnShare.addEventListener("click", nativeShare)


        // More information
        let card = articles.querySelector(".product");
        let centerCard = document.querySelector(".centerCard")
        const moreInfo = () =>{
            centerCard.innerHTML=`
            <i class="fa-solid fa-angle-right"></i>
            <img src="${selectedProduct.productImg}" alt="Foto de ${selectedProduct.maker} - ${selectedProduct.name}" class="imgCard">
            <p class="priceCard">$ ${moneyTransform(selectedProduct.price)}</p>
            <p class="titleCard">${selectedProduct.name}</p>
            <p class="descriptCard">"${selectedProduct.description}</p>
            `
            centerCard.classList.add("showCart");
            
            let closeCard = document.querySelector(".fa-angle-right");
            const closeCardFunct = () =>{
                centerCard.classList.contains("showCart")? centerCard.classList.remove("showCart") : null;
            }
            closeCard.addEventListener("click", closeCardFunct)
        }
        card.addEventListener("click",moreInfo)
    }
    searchedFilter(trademark).forEach(element => renderProduct(element));
    articlesContainer.classList.remove("homePage")
    window.scroll({
        top: 350,
        behavior: 'smooth'
    });
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
    if (cart.classList.contains("hideCart")) { cart.classList.replace("hideCart", "showCart"); crystal.classList.add("show"); }
}
const hideCart = () => { if (cart.classList.contains("showCart")) { cart.classList.replace("showCart", "hideCart"); crystal.classList.remove("show"); confirm.classList.remove("showConfirm");} }
    // hide cart if click is outside cart window
cartBtn.addEventListener("click", showCart);
close.addEventListener("click", hideCart);
const hideCartClick = (e) => { if (cart.classList.contains("showCart") && !cart.contains(e.target) && !cartBtn.contains(e.target) && !e.target.classList.contains("remove")) { hideCart() } }
document.addEventListener("click", hideCartClick);
window.addEventListener("scroll", hideCart);
RenderCart();


//login
const loginBox = document.querySelector(".login-box");
const login = document.querySelector(".login");
let showLogin=()=>{
    loginBox.classList.add("showLogin");
    crystal.classList.add("show");
    login.classList.contains("mostrar")? login.classList.remove("mostrar") : login.classList.add("mostrar");
    contact.classList.contains("mostrar")? contact.classList.remove("mostrar") : contact.classList.add("mostrar");
}
let hideLogin=()=>{
    loginBox.classList.remove("showLogin");
    crystal.classList.remove("show");

}
const hideLoginClick = (e) => { if (loginBox.classList.contains("showLogin") && !loginBox.contains(e.target) && e.target !==login && e.target !== register) {hideLogin()} }
document.addEventListener("click", hideLoginClick);
login.addEventListener("click", showLogin);

// Show register
let register = document.querySelector(".register");

const showForm=()=>{

    loginBox.innerHTML=`
    <h2>Create new account</h2>
    <form>
        <div class="user-box">
            <input type="email" name="" class="mail">
            <label for="">E-mail</label>
        </div>
        <div class="user-box">
            <input type="text" name="" class="user">
            <label for="">User</label>
        </div>
        <div class="user-box">
            <input type="number" name="" class="phone">
            <label for="">Phone number</label>
        </div>
        <div class="user-box">
            <input type="password" name="" class="pass">
            <label for="">Password</label>
        </div>
        <div class="button-form buttonForm">
            <a href="#" id="create" class="submit">Create</a>
            <a href="#" id="cancel" class="submit">Cancel</a>
        </div>
    </form>
`

// Cancel Register
const cancel = document.querySelector("#cancel")
    const cancelRegister = () =>{

    loginBox.innerHTML=`
        <h2>Login</h2>
        <form>
            <div class="user-box">
                <input type="text" name="" class="user">
                <label for="">User</label>
                <span class="userError"></span>
            </div>
            <div class="user-box">
                <input type="password" name="" class="pass">
                <label for="">Password</label>
                <span class="passError"></span>
                </div>
            <div class="button-form">
                <a href="#" id="submit">Submit</a>
                <div id="register">
                    Don't have an account?
                    <a href="#" class="register">Register</a>
                </div>
            </div>
        </form>
        <div id="cancel" style="display: none"></div>
        `;
    }
    cancel.addEventListener("click", cancelRegister)

//validate forms
let username = document.querySelector(".user")
let pass = document.querySelector(".pass")
let mail = document.querySelector(".mail")
let create = document.querySelector("#create");

let isEmpty = e => e.value == ""? true : false;
let isBetween = e => e.value.length > 5 ? true : false
let userVald = e => {
    const re = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
    return re.test(e.value)
}
let mailValid= e => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(e.value)
}
let passValid = e => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return re.test(e.value)
}

const validateForm = () => {
let correo = false;
let usuario = false;
let contraseña = false;


    if (isEmpty(username)){
    username.setAttribute("placeholder","You have to fill this field");
    username.value = ""} else if (!userVald(username)){
    username.setAttribute("placeholder","invalid format username");
    username.value = ""} else if (!isBetween(username)) {username.setAttribute("placeholder","You have to use more characters") ; username.value = ""} else {
    usuario = true;}
    
    if (isEmpty(pass)){
    pass.setAttribute("placeholder","You have to fill this field");
    pass.value = ""} else if (!passValid(pass)){
    pass.setAttribute("placeholder","Invalid format password");
    pass.value = ""} else if (!isBetween(pass)) {pass.setAttribute("placeholder","You have to use more characters") ; pass.value = ""} else {
    contraseña = true;}
    
    if (isEmpty(mail)){
    mail.setAttribute("placeholder","You have to fill this field");
    mail.value = ""} else if (!mailValid(mail)){
    mail.setAttribute("placeholder","Invalid format e-mail");
    mail.value = ""} else if (!isBetween(mail)) {mail.setAttribute("placeholder","You have to use more characters") ; mail.value = ""} else {
    correo = true;}
    
    if (correo && contraseña && usuario) {
        hideLogin();
        alert("Your new account has been successfully created!!")
    }
}
create.addEventListener("click", validateForm)
}
register.addEventListener("click", showForm)

let submit = document.querySelector("#submit");
let validSubmit = () => {
let message = document.querySelector("h2")
message.innerText="Invalid User"
}
submit.addEventListener("click",validSubmit)

// Burger menu
const burger = document.querySelector(".fa-bars");
const contact = document.querySelector(".contact");
const showBurger = () => {
    crystal.classList.contains("show")? crystal.classList.remove("show") : crystal.classList.add("show");
    login.classList.contains("mostrar")? login.classList.remove("mostrar") : login.classList.add("mostrar");
    contact.classList.contains("mostrar")? contact.classList.remove("mostrar") : contact.classList.add("mostrar");
}
burger.addEventListener("click",showBurger);

// confirm purchase
let confirmBtn = document.querySelector(".purchase");
const confirm = document.querySelector(".confirm");

const confirmPressed = (e) =>{
    e.preventDefault();
    if (cartObjects != ""){
    confirm.innerHTML=`
        <p> Do you want to confirm purchase?</p>
        <div class="btns">
            <buttonc class="yes">Yes</buttonc>
            <button class="no">No</button>
        </div>
    `
    let yesBtn = document.querySelector(".yes");
    let noBtn = document.querySelector(".no");
    const noFunct= () =>{
        confirm.classList.remove("showConfirm");
        confirm.innerHTML=""
    }

    const yesFunct = () => {
        confirm.innerHTML=""
        cartObjects = [];
        saveLocalStorage(cartObjects);
        hideCart();
        refreshNumber();
        confirm.classList.remove("showConfirm");
//Show Modal
        function hideModal() { modal.classList.replace("showModal", "hideModal"); }
        const showModal = () => {
            modal.classList.replace("hideModal", "showModal");
            modal.innerText = "Successful purchase!!"
            setTimeout(hideModal, 3000);
            }
        showModal()
    }
    noBtn.addEventListener("click", noFunct)
    yesBtn.addEventListener("click", yesFunct)
    confirm.classList.add("showConfirm");
}
};
confirmBtn.addEventListener("click", confirmPressed)