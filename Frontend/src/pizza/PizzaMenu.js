/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

var $all=$(".all-filter");
var $meat=$(".meat");
var $pineapple=$(".pineapple");
var $mushrooms=$(".mushrooms");
var $seafood=$(".seafood");
var $vegeterian=$(".vegeterian");

$all.click(function(){
    var $selected=$(".filters-selected");
    $selected.removeClass("filters-selected");
    $selected.addClass("filters-hovered");
    $all.addClass("filters-selected");
    $all.removeClass("filters-hovered");
    filterPizza("all", $all.text());
});
$meat.click(function(){
    var $selected=$(".filters-selected");
    $selected.removeClass("filters-selected");
    $selected.addClass("filters-hovered");
    $meat.addClass("filters-selected");
    $meat.removeClass("filters-hovered");
    filterPizza("meat", $meat.text());
});
$pineapple.click(function(){
    var $selected=$(".filters-selected");
    $selected.removeClass("filters-selected");
    $selected.addClass("filters-hovered");
    $pineapple.addClass("filters-selected");
    $pineapple.removeClass("filters-hovered");
    filterPizza("pineapple", $pineapple.text());
});
$mushrooms.click(function(){
    var $selected=$(".filters-selected");
    $selected.removeClass("filters-selected");
    $selected.addClass("filters-hovered");
    $mushrooms.addClass("filters-selected");
    $mushrooms.removeClass("filters-hovered");
    filterPizza("mushrooms", $mushrooms.text());
});
$seafood.click(function(){
    var $selected=$(".filters-selected");
    $selected.removeClass("filters-selected");
    $selected.addClass("filters-hovered");
    $seafood.addClass("filters-selected");
    $seafood.removeClass("filters-hovered");
    filterPizza("seafood", $seafood.text());
});
$vegeterian.click(function(){
    var $selected=$(".filters-selected");
    $selected.removeClass("filters-selected");
    $selected.addClass("filters-hovered");
    $vegeterian.addClass("filters-selected");
    $vegeterian.removeClass("filters-hovered");
    filterPizza("vegeterian", $vegeterian.text());
});
function filterPizza(filter,title) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    var $pizzaamount=$(".all-amount");
    var pizzacount=0;
    Pizza_List.forEach(function(pizza){
        if (filter == "all") {
            pizzacount++;
            pizza_shown.push(pizza); 
        } 
        else if (filter == "meat") {
            if (pizza.content.meat || pizza.content.chicken) { 
                pizzacount++;
                pizza_shown.push(pizza); 
            } 
        } 
        else if (filter=="pineapple"){
            if(pizza.content.pineapple){
                pizzacount++;
                pizza_shown.push(pizza);
            }
        }
        else if (filter=="mushrooms"){
            if(pizza.content.mushroom){
                 pizzacount++;
                pizza_shown.push(pizza);
            }
        }
        else if (filter=="seafood"){
            if(pizza.content.ocean){
                 pizzacount++;
                pizza_shown.push(pizza);
            }
        }
         else if (filter=="vegeterian"){
             if (!(pizza.content.meat || pizza.content.chicken || pizza.content.ocean) ){
                 pizzacount++;
                pizza_shown.push(pizza);
            }
        }
        $pizzaamount.text(pizzacount);
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
   
}


function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;