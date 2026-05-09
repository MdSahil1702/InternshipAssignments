package com.grocery.app.repo

import com.grocery.app.data.CartItem
import com.grocery.app.data.Product

object CartRepo {
    private val items = mutableListOf<CartItem>()

    fun add(p: Product) {
        val ex = items.find { it.product.id == p.id }
        if (ex != null) ex.qty += 1 else items.add(CartItem(p))
    }

    fun inc(id: Int) {
        for (item in items) {
            if (item.product.id == id) {
                item.qty += 1
                break
            }
        }
    }

    fun dec(id: Int) {
        for (item in items) {
            if (item.product.id == id) {
                if (item.qty > 1) item.qty -= 1 else items.remove(item)
                break
            }
        }
    }

    fun remove(id: Int) {
        items.removeAll { it.product.id == id }
    }

    fun all() = items.toList()

    fun total() = items.sumOf { it.product.price * it.qty }

    fun count(id: Int): Int {
        for (item in items) {
            if (item.product.id == id) return item.qty
        }
        return 0
    }

    fun clear() {
        items.clear()
    }
}