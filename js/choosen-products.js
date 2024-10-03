let cartProductsDiv = document.querySelector(".cart-products .row");
let totalPriceDiv=document.querySelector(".products-total-price span")
let cartProducts = localStorage.getItem("cartProducts")?JSON.parse(localStorage.getItem("cartProducts")):[]
////////////////// draw products function /////////////////////////////
function draw(products) {
  let ele = products.map((item) => {
    return `
        <div class="col-lg-6 col-md-12 col-sm-12">
                        <div class="product-card">
                            <div class="product-img">
                                <img src="${item.imgSrc}" alt="">
                            </div>
                            <div class="product-content">
                                <div class="product-descrp">
                                    <p class="product-name">Product: ${item.name}</p>
                                    <p class="product-caregory">Category: ${item.category}</p>
                                    <p class="product-price">Price: ${item.price} $</p>
                                </div>
                                <div class="product-btns">
                                    <div class="plus-minus-btn">
                                        <span>${item.quantity}</span>
                                        <i class="fas fa-plus me-3 ms-3 text-success" onClick="plus(${item.id})"></i>
                                        <i class="fas fa-minus text-danger" onClick="minus(${item.id})"></i>
    
                                    </div>
                                    <div class="remove-btn">
                                        <button class="btn btn-danger me-5" onClick="remove(${item.id})">Remove</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
        `;
  });
  cartProductsDiv.innerHTML = ele.join("");
}
////////////// calculate total price function ///////////////////////////////////////////////////
function calculateTotalPrice(productsPrice){
    let totalPrice=0
    productsPrice.map((item)=>{
        totalPrice+=(item.quantity*item.price)
        
    })
    return totalPrice;

} 
////////////////////////////// remove product item //////////////////////////////////////////////
function remove(id){
    cartProducts = cartProducts.filter((item)=>item.id != id )
    localStorage.setItem("cartProducts",JSON.stringify(cartProducts))
    draw(cartProducts)
    totalPriceDiv.innerHTML=calculateTotalPrice(cartProducts)+" $"
}
//////////////////////////////////////// list cart product item and total price ////////////////////////////////////////////////////////////////
if (cartProducts) {
  draw(cartProducts)
  totalPriceDiv.innerHTML=calculateTotalPrice(cartProducts)+" $"
  function plus(id){
    let choosenItem=cartProducts.findIndex((item)=>item.id === id)
    cartProducts[choosenItem].quantity+=1
    localStorage.setItem("cartProducts",JSON.stringify(cartProducts))
    draw(cartProducts)
    totalPriceDiv.innerHTML=calculateTotalPrice(cartProducts)+" $"


  }
  function minus(id){
    let choosenItem=cartProducts.findIndex((item)=> item.id === id )
    cartProducts[choosenItem].quantity-=1
    if(cartProducts[choosenItem].quantity === 0) remove(id)
    else{
        localStorage.setItem("cartProducts",JSON.stringify(cartProducts))
        draw(cartProducts)
        totalPriceDiv.innerHTML=calculateTotalPrice(cartProducts)+" $"
    }
  }
}