package com.grocery.app.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.grocery.app.data.CartItem
import com.grocery.app.data.Product
import com.grocery.app.repo.CartRepo

class CartVM : ViewModel() {
    val cart  = MutableLiveData<List<CartItem>>()
    val total = MutableLiveData<Double>()

    private fun refresh() {
        cart.value  = CartRepo.all()
        total.value = CartRepo.total()
    }

    fun add(p: Product) { CartRepo.add(p);    refresh() }
    fun inc(id: Int)    { CartRepo.inc(id);   refresh() }
    fun dec(id: Int)    { CartRepo.dec(id);   refresh() }
    fun remove(id: Int) { CartRepo.remove(id);refresh() }
    fun count(id: Int)  = CartRepo.count(id)
    fun clear()         { CartRepo.clear();   refresh() }
    fun load()          { refresh() }
}