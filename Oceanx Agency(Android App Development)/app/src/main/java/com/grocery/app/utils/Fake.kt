package com.grocery.app.utils

import com.grocery.app.data.Product
import com.grocery.app.R

object Fake {

    const val OTP = "1234"

    val products = listOf(
        Product(1,  "Apple",        40.0,  R.drawable.apples,        "Fruits"),
        Product(2,  "Banana",       20.0,  R.drawable.bananas,       "Fruits"),
        Product(3,  "Mango",        60.0,  R.drawable.mangos,        "Fruits"),
        Product(4,  "Milk",         55.0,  R.drawable.milk,          "Dairy"),
        Product(5,  "Butter",       45.0,  R.drawable.butter,        "Dairy"),
        Product(6,  "Cheese",       90.0,  R.drawable.cheese,        "Dairy"),
        Product(7,  "Tomato",       30.0,  R.drawable.tomatoes,      "Veggies"),
        Product(8,  "Potato",       25.0,  R.drawable.potatoes,      "Veggies"),
        Product(9,  "Onion",        18.0,  R.drawable.onion,         "Veggies"),
        Product(10, "Bread",        35.0,  R.drawable.bread,         "Bakery"),
        Product(11, "Eggs",         70.0,  R.drawable.eggs,          "Bakery"),
        Product(12, "Orange Juice", 80.0,  R.drawable.orange_juice,  "Drinks")
    )

    val cats = listOf("All", "Fruits", "Dairy", "Veggies", "Bakery", "Drinks")
}