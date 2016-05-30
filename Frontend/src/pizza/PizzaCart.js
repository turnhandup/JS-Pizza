/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../Storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var isTherePizza=-1;
    for( var i=0; i<Cart.length; i++){
        if(Cart[i].pizza.title==pizza.title&&Cart[i].size==size){
            var isTherePizza=i;
            break;
        }
    }
    if(isTherePizza>-1){
        Cart[isTherePizza].quantity++;
    }
    else{
    //Приклад реалізації, можна робити будь-яким іншим способом
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });
    }
    //Оновити вміст кошика на сторінці
    updateCart();
}
var $clearAll=$(".clean-order");
    $clearAll.click(function(){
        Cart=[];
        updateCart();
});
function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    var saved_orders=Storage.get('cart');
    if(saved_orders)	{
        Cart=saved_orders;
    }
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}
var $price=$(".order-price");
var $orderAmount=$(".order-amount");
function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
     Storage.set("cart",Cart);
    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function(){
            if(cart_item.quantity>1){
                cart_item.quantity-=1;
                updateCart();
            }
        });
         $node.find(".delete-button").click(function(){
               for(var i=0;i<Cart.length;i++){
                if(Cart[i].pizza.title==cart_item.pizza.title&&Cart[i].size==cart_item.size){
                    Cart.splice(i,i+1);
                    updateCart();
                    break;
                }
            }
         });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $orderAmount.text(Cart.length);
    $price.text(orderPrice()+" грн");

}
function orderPrice(){
    var price=0;
    
    for(var i=0;i<Cart.length;i++){
        if(Cart[i].size=="big_size"){
            price+=Cart[i].pizza.big_size.price*Cart[i].quantity;
        }
          if(Cart[i].size=="small_size"){
            price+=Cart[i].pizza.small_size.price*Cart[i].quantity;
        }
    }
    return price;
}
exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;