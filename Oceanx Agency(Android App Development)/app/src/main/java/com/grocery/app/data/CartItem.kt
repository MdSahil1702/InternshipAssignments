package com.grocery.app.data

data class CartItem(
    val product: Product,
    val qty: Int =1
)