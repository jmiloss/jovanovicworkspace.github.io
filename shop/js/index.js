document.getElementById("myCart").innerHTML = getCookie("cart_items");

let xhttp = new XMLHttpRequest();
let api_url = "https://6463c754127ad0b8f8912511.mockapi.io/products";

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        let obj = JSON.parse(this.responseText);

        let productEl = document.getElementById("products");
        let html = '';

        for(let i = 0; i< obj.length; i++) {
            html += "<div class='col-md-4 card-items'>" +
                    "<div class='card'>" + 
                    "<img src ='"+obj[i].product_image +"' alt=''>" +
                    "<div class='card-body'>" +
                        "<h5 class='card-title'>" + obj[i].product_name + "</h5>" +
                        "<p class='card-text'>$" + obj[i].product_price + "</p>" +
                        "<button onclick='add_to_cart(this)' class='btn btn-primary add-btn' data-product_id='"+obj[i].id +"' >Add to Cart</button>" +
                        "<button onclick='see_more(this)' class='btn btn-info' data-product_id='"+obj[i].id +"' data-toggle='modal' data-target='#seeMoreModal'> See More</button>" +
                        "</div>" +                    
                        "</div>" +
                        "</div>"
        }

        productEl.innerHTML = html;
    }
};

xhttp.open('GET', api_url, true); 
xhttp.send();

let totalPrice = 0;
let itemAlreadyAdded = false;
function add_to_cart(el) {
    let id = el.getAttribute("data-product_id");

    if(!itemAlreadyAdded) {
    document.getElementById('myCart').innerHTML = "<div class='row'>" + 
                                                    "<div class='col-md-9'><h3>Your cart items:</h3></div>" +
                                                    "<div class='col-md-3'><b>Total:</b> $<span id='totalPrice'></span></div>" +     
                                                    "</div>";

        itemAlreadyAdded = true;
    }
   
    let xhttp = new XMLHttpRequest();
    let api_url = "https://6463c754127ad0b8f8912511.mockapi.io/products/" + id;

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        let obj = JSON.parse(this.responseText);

        document.getElementById('myCart').innerHTML += "<div class='row cart-items' id='cart-item-"+obj.id+"'>" +
                                                        "<div class='col-md-4'>" + obj.product_name + "</div>" +

                                                        "<div class='col-md-3'><b>Material: </b>" + obj.product_material + "</div>" +

                                                        "<div class='col-md-2'><b>Price: </b>$" + obj.product_price + "</div>" +

                                                        "<div class='col-md-2'><button onclick='remove_from_cart(this)'data-product_id ='"+obj.id +"' data-product_price = '"+obj.product_price+"' type='button' class='btn btn-danger'>Remove from cart</button></div>" + 
                                                        "</div>";


        totalPrice += parseFloat(obj.product_price);
        document.getElementById('totalPrice').innerText = totalPrice;

        document.getElementById('seeMoreLabel').innerHTML ="<p>" +  obj.product_name + "</p>" 

        setCookie("cart_items", document.getElementById('myCart').innerHTML, 5);
        
    }
};

xhttp.open('GET', api_url, true); 
xhttp.send();
}




function see_more(el) {
    let id = el.getAttribute("data-product_id");
  

    let xhttp = new XMLHttpRequest();
    let api_url = "https://6463c754127ad0b8f8912511.mockapi.io/products/" + id;

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        let obj = JSON.parse(this.responseText);

        document.getElementById('productDetails').innerHTML = "<p>" +  obj.product_description + "</p>" +
                                                                "<p><b>Material :</b>" + obj.product_material +"</p>" +
                                                                "<p><b>Price : </b>$" + obj.product_price +"</p>"



        document.getElementById('seeMoreLabel').innerHTML ="<p>" +  obj.product_name + "</p>" 
        
    }
};

xhttp.open('GET', api_url, true); 
xhttp.send();
}

function remove_from_cart(el) {
    let id = el.getAttribute("data-product_id");

    document.getElementById("cart-item-" + id).remove();

    let total = parseInt(document.getElementById("totalPrice").innerText);
    total = total - parseInt(el.getAttribute("data-product_price"));
    document.getElementById("totalPrice").innerText = total;

    setCookie("cart_items", document.getElementById("myCart").innerHTML, 5)
}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }