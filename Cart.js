// Depending on which radio button is selected depends on which forms the user needs to fill in and what type of discount they get
$("#deliver").click(function (event) {
    event.preventDefault();
    $(".deliveryInformation").show();
    $("#confirmPurchase").hide();
    var total = TAPS_shoppingCart.totalCart();
    total = total + 100;
    $("#totalCart").html(total);
    TAPS_shoppingCart.saveCart();
});

$("#collect").click(function (event) {
    event.preventDefault();
    $(".deliveryInformation").hide();
    $("#confirmPurchase").show();
});

$(".btn").click(function () {
    var total = TAPS_shoppingCart.totalCart();
    total = total - ((total * 10) / 100);
    $("#totalCart").html(total);
    TAPS_shoppingCart.saveCart();
    alert("You pay an extra R100 for Delivery");
});

$("#confirmPurchase").click(function () {
    var hex = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F");
    var i = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var j = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var k = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var refNumber = "#" + i + j + k;
    alert("Thank you for shopping with us! Your order has been confirmed and your Reference number is " + refNumber + "0050213" + j);
    TAPS_shoppingCart.clearCart();
    displayCart();

});
// Generating Coupon code
$(".buttonCoupon").click(function (event) {
    event.preventDefault();
    var hex = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F");
    var i = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var j = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var k = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var discountCode = "#" + i + j + k;
    $(".promo").html(discountCode);
    $(this).hide();
});

$(".buttonSubmit").click(function (event) {
    event.preventDefault();
    var total = TAPS_shoppingCart.totalCart();
    var codeEntered = $("#couponCodeEntered").val();
    var codeGenerated = $(".promo").text();
    if (codeEntered == codeGenerated) {
        total = total - ((total * 20) / 100);
        $("#totalCart").html(total);
        TAPS_shoppingCart.saveCart();
        alert("You received a 20% discount on your purchase!");
    } else {
        total = total;
        TAPS_shoppingCart.saveCart();
    }
});

// Image animation
setInterval(
    function () {
        $('.itemImage').animate({
                "width": "-=100px"
            }, 'slow').delay(1000)
            .animate({
                "width": "+=100px"
            }, 'slow');
    },
    2000
);

// Item accordion functionality
$("document").ready(function () {
    $(".panel").hide();
    $(".header").click(
        function () {
            $(this).next().slideToggle("fast");
        })
})

// -----------------------My Cart jQuery-------------------


// Adding new Item to cart or Incrementing the quantity if the item already is in the cart
$(".addToCart").click(function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
    TAPS_shoppingCart.addToCart(name, price, 1);
    displayCart();
});

// Removes all the items from the cart
$("#clearCart").click(function (event) {
    TAPS_shoppingCart.clearCart();
    displayCart();
});

// Displays the items of my cart in a list
function displayCart() {
    var cartArray = TAPS_shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<li>" +
            cartArray[i].name +
            " <input class='itemCount' type='text' data-name'" +
            cartArray[i].name + "' value='" +
            cartArray[i].count + "' ></input>" +
            " <button class='plus-item' data-name='" +
            cartArray[i].name + "'>+</button> " +
            " <button class='subtract-item' data-name='" +
            cartArray[i].name + "'>-</button> " +
            " <button class='delete-item' data-name='" +
            cartArray[i].name + "'>Remove Item</button> " +
            "</li></br>";
    }
    $("#showCart").html(output);
    $("#countCart").html(TAPS_shoppingCart.totalItemsInCart());
    $("#totalCart").html(TAPS_shoppingCart.totalCart());
}

// Deleting all the items from my cart
$("#showCart").on("click", ".delete-item", function (event) {
    var name = $(this).attr("data-name");
    TAPS_shoppingCart.removeAllOfItems(name);
    displayCart();
});

// Subtracting one item from the quantity
$("#showCart").on("click", ".subtract-item", function () {
    var name = $(this).attr("data-name");
    TAPS_shoppingCart.removeFromCart(name);
    displayCart();
});

// Adding one item to the quantity
$("#showCart").on("click", ".plus-item", function () {
    var name = $(this).attr("data-name");
    TAPS_shoppingCart.addToCart(name, 0, 1);
    displayCart();
});

$("#showCart").on("change", ".countCart", function (event) {
    var name = $(this).attr("data-name");
    var count = Number($(this).val());
    TAPS_shoppingCart.setItemCount(name, count);
    displayCart();
});

// -----------------------Cart Java Script Functionality--------------------

var TAPS_shoppingCart = {};
TAPS_shoppingCart.cart = [];

TAPS_shoppingCart.Item = function (name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
};

// add item to cart
TAPS_shoppingCart.addToCart = function (name, price, count) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count += count;
            var total = this.totalCart();
            this.saveCart();
            return;
        }
    }
    var item = new this.Item(name, price, count);
    this.cart.push(item);
    this.saveCart();
    alert("This item was added to your cart. Your Cart Total is R " + total);
}

// Increasing the quantity of an item using the "number" input
TAPS_shoppingCart.setItemCount = function (name, count) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count = count;
            break;
        }
    }
    this.saveCart();
}

// removes one item from the cart
TAPS_shoppingCart.removeFromCart = function (name) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count--;
            if (this.cart[i].count === 0) {
                this.cart.splice(i, 1);
            }
            break;
        }
    }
    this.saveCart();
}

// removes all of item by using its name
TAPS_shoppingCart.removeAllOfItems = function (name) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart.splice(i, 1);
            break;
        }
    }
    this.saveCart();
}

// empties the cart entirely
TAPS_shoppingCart.clearCart = function () {
    this.cart = [];
    this.saveCart();
}

// returns total amount of items within the count
TAPS_shoppingCart.totalItemsInCart = function () {
    var totalItems = 0;
    for (var i in this.cart) {
        totalItems += this.cart[i].count;
    }
    return totalItems;
}

// returns the cost of all the items within the cart
TAPS_shoppingCart.totalCart = function () {
    var total = 0;
    for (var i in this.cart) {
        total += this.cart[i].price * this.cart[i].count;
    }
    return total.toFixed(2);
}

// array of unique items in the cart
TAPS_shoppingCart.listCart = function () {
    var cartCopy = [];
    // looping through each item object within the cart
    for (var i in this.cart) {
        var item = this.cart[i];
        var itemCopy = {};
        // looping through each property of the item
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed();
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}

// saves the items in the cart to local storage and allows me retrieve information
TAPS_shoppingCart.saveCart = function () {
    localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
}

// retrieving information from local storage
TAPS_shoppingCart.loadCart = function () {
    this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

TAPS_shoppingCart.loadCart();
displayCart();
