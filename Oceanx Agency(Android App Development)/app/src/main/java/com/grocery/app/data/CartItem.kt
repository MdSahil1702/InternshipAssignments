package com.grocery.app.data

data class CartItem(
    val product: Product,
    var qty: Int = 1
)