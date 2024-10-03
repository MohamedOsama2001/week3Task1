//////////////////////////////////// products ///////////////////////////////////////////
let productsDiv = document.querySelector(".products .row");
let products = [
  {
    id: 1,
    quantity:0,
    imgSrc: "images/t-shirtadidas.png",
    name: "T-shirt adidas",
    price: "80",
    category: "fashion",
  },
  {
    id: 2,
    quantity:0,
    imgSrc: "images/earpodes.png",
    name: "earpods",
    price: "150",
    category:"Phone accessories",
  },
  {
    id: 3,
    quantity:0,
    imgSrc: "images/jacket.png",
    name: "Jacket",
    price: "120",
    category: "fashion",
  },
  {
    id: 4,
    quantity:0,
    imgSrc: "images/bottle.png",
    name: "Adidas bottle",
    price: "50",
    category: "Sport",
  },
  {
    id: 5,
    quantity:0,
    imgSrc: "images/glasses.png",
    name: "Glasses",
    price: "80",
    category: "Men accessories",
  },
  {
    id: 6,
    quantity:0,
    imgSrc: "images/cap.png",
    name: "Cap",
    price: "20",
    category: "Men accessories",
  },
  {
    id: 7,
    quantity:0,
    imgSrc: "images/bag.png",
    name: "Bag adidas",
    price: "110",
    category: "Bags",
  },
  {
    id: 8,
    quantity:0,
    imgSrc: "images/shose.png",
    name: "Shoses adidas",
    price: "80",
    category: "sport",
  },
  {
    id: 9,
    quantity:0,
    imgSrc: "images/bag1.png",
    name: "Bag",
    price: "100",
    category: "fashion",
  },
];
function draw(items) {
  let ele = items.map((product) => {
    return `
        <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="card mb-3">
                            <img class="cardImg img-thumbnail" src=${product.imgSrc} alt="Card image">
                            <div class="card-body">
                              <p class="card-text">Product: ${product.name}</p>
                              <p class="card-text">Price: ${product.price} $</p>
                              <p class="card-text">Category: ${product.category}</p>
                              <div class="card-btns">
                                <button class="btn btn-primary add" data-id="${product.id}" onClick="add(${product.id})">Add to cart</button>
                                <button class="btn btn-danger delete" data-id="${product.id}" style="display:none;" onClick="deleteFromCart(${product.id})">Delete from cart</button>
                              </div>
                            </div>
                          </div>
        </div>
        `;
  });
  productsDiv.innerHTML = ele.join('');
}
draw(products);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// number of products function 
function numberOfProducts(products){
  let totalProducts=0
  products.map((item)=>{
    totalProducts +=item.quantity
  })
  return totalProducts
}
// draw cart product in cart shopping 
function drawCartProducts(product) {
  return`
        <div class="product-item p-2 mt-2">
        <div class="item-name text-primary">${product.name}</div>
        <div class="plus-munis">
        <span class="quantity-number" data-id="${product.id}">${product.quantity}</span>
        <i class="fas fa-plus text-success" onClick="plus(${product.id})"></i>
        <i class="fas fa-minus text-danger" onClick="minus(${product.id})"></i>
        </div>
        </div>
        `;
}
/////////////////////////////////// add to cart  //////////////////////////////////////////////////////////////////     
let cartProduct = document.querySelector(".cartProduct");
let productsNumberSpan = document.querySelector(".product-number");
let addItem=localStorage.getItem("cartProducts")?JSON.parse(localStorage.getItem("cartProducts")):[]
if(addItem){
  addItem.map((item)=>{
    cartProduct.innerHTML+=drawCartProducts(item)
    let addBtn=document.querySelector(`.add[data-id="${item.id}"]`)
    addBtn.style.display="none"
    let removeBtn=document.querySelector(`.delete[data-id="${item.id}"]`)
    removeBtn.style.display="block"
  })
  productsNumberSpan.style.display = "block";
  productsNumberSpan.innerHTML = numberOfProducts(addItem);
}
function add(id) {
  if (localStorage.getItem("user")) {
    let choosenItem = products.find((item) => id === item.id);
    choosenItem.quantity=1  
    cartProduct.innerHTML+=drawCartProducts(choosenItem)
    addItem=[...addItem,choosenItem]
    localStorage.setItem("cartProducts",JSON.stringify(addItem))  
    productsNumberSpan.style.display = "block";
    productsNumberSpan.innerHTML = numberOfProducts(addItem)
    let addBtn=document.querySelector(`.add[data-id="${choosenItem.id}"]`)
    addBtn.style.display="none"
    let removeBtn=document.querySelector(`.delete[data-id="${choosenItem.id}"]`)
    removeBtn.style.display="block"

  }
  else{
    window.location="login.html"
  }
}
let cartIcon = document.querySelector(".shopCart .cart-icon");
let cartProductsDiv = document.querySelector(".cartProducts");
cartIcon.addEventListener("click", carticonshow);
function carticonshow() {
  if (cartProduct.innerHTML != "") {
    if (cartProductsDiv.style.display == "block") {
      cartProductsDiv.style.display = "none";
    } else {
      cartProductsDiv.style.display = "block";
    }
  }
}
///////////////////////         remove product when click on delete from cart           /////////////////////////////////////////// 
function deleteFromCart(id){
  addItem=addItem.filter((item)=>item.id != id)
  localStorage.setItem("cartProducts",JSON.stringify(addItem))
  let removeBtn=document.querySelector(`.delete[data-id="${id}"]`)
  removeBtn.style.display="none"
  let addBtn=document.querySelector(`.add[data-id="${id}"]`)
  addBtn.style.display="block"
  cartProduct.innerHTML=""
  addItem.map((item)=>{
    cartProduct.innerHTML+=drawCartProducts(item)
  })
  productsNumberSpan.innerHTML=numberOfProducts(addItem)
  let numerOfProducts=numberOfProducts(addItem)
  if(numerOfProducts===0){
    cartProductsDiv.style.display="none"
  }


}
///////////////// plus /////////////////////////////////
function plus(id){
  let choosenItem = addItem.findIndex(item=>item.id==id)
  addItem[choosenItem].quantity+=1
  localStorage.setItem("cartProducts",JSON.stringify(addItem))
  let quantityNumber=document.querySelector(`.quantity-number[data-id="${addItem[choosenItem].id}"]`)
  quantityNumber.innerHTML=addItem[choosenItem].quantity
  productsNumberSpan.innerHTML=numberOfProducts(addItem)
  

}
///////////////// minus ////////////////////////////////
function minus(id){
  let choosenItem=addItem.findIndex(item=>item.id==id)
  addItem[choosenItem].quantity-=1
  if(addItem[choosenItem].quantity===0){
    let removeBtn=document.querySelector(`.delete[data-id="${addItem[choosenItem].id}"]`)
    removeBtn.style.display="none"
    let addBtn=document.querySelector(`.add[data-id="${addItem[choosenItem].id}"]`)
    addBtn.style.display="block"
    addItem=addItem.filter((item)=>item.id!=id)
    localStorage.setItem("cartProducts",JSON.stringify(addItem))
    cartProduct.innerHTML=""
    addItem.map((item)=>{
      cartProduct.innerHTML+=drawCartProducts(item)
    })
    productsNumberSpan.innerHTML=numberOfProducts(addItem)
    let numerOfProducts=numberOfProducts(addItem)
    if(numerOfProducts===0){
      cartProductsDiv.style.display="none"
    }
    else{
      cartProductsDiv.style.display="block"
    }
  }
  else{
  localStorage.setItem("cartProducts",JSON.stringify(addItem))
  let quantityNumber=document.querySelector(`.quantity-number[data-id="${addItem[choosenItem].id}"]`)
  quantityNumber.innerHTML=addItem[choosenItem].quantity
  productsNumberSpan.innerHTML=numberOfProducts(addItem)
  }

}
