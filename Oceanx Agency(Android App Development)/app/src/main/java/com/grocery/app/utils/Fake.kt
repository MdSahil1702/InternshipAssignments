package com.grocery.app.utils

import com.grocery.app.data.Product

object Fake {

    const val OTP = "1234"

    val products = listOf(
        Product(1,  "Apple",        40.0,  "https://img.icons8.com/color/96/apple.png",        "Fruits"),
        Product(2,  "Banana",       20.0,  "https://img.icons8.com/color/96/banana.png",       "Fruits"),
        Product(3,  "Mango",        60.0,  "https://img.icons8.com/color/96/mango.png",        "Fruits"),
        Product(4,  "Milk",         55.0,  "https://img.icons8.com/color/96/milk.png",         "Dairy"),
        Product(5,  "Butter",       45.0,  "https://img.icons8.com/color/96/butter.png",       "Dairy"),
        Product(6,  "Cheese",       90.0,  "https://img.icons8.com/color/96/cheese.png",       "Dairy"),
        Product(7,  "Tomato",       30.0,  "https://img.icons8.com/color/96/tomato.png",       "Veggies"),
        Product(8,  "Potato",       25.0,  "https://img.icons8.com/color/96/potato.png",       "Veggies"),
        Product(9,  "Onion",        18.0,  "https://img.icons8.com/color/96/onion.png",        "Veggies"),
        Product(10, "Bread",        35.0,  "https://img.icons8.com/color/96/bread.png",        "Bakery"),
        Product(11, "Eggs",         70.0,  "https://img.icons8.com/color/96/eggs.png",         "Bakery"),
        Product(12, "Orange Juice", 80.0,  "https://img.icons8.com/color/96/orange-juice.png", "Drinks")
    )

    val cats = listOf("All", "Fruits", "Dairy", "Veggies", "Bakery", "Drinks")
}