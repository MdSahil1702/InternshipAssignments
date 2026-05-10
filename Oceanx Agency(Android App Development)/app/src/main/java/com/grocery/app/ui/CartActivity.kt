package com.grocery.app.ui

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.grocery.app.adapter.CartAdapter
import com.grocery.app.databinding.ActivityCartBinding
import com.grocery.app.viewmodel.CartVM

class CartActivity : AppCompatActivity() {
    lateinit var b: ActivityCartBinding
    val vm: CartVM by viewModels()
    lateinit var adapter: CartAdapter

    override fun onCreate(s: Bundle?) {
        super.onCreate(s)
        b = ActivityCartBinding.inflate(layoutInflater)
        setContentView(b.root)

        adapter = CartAdapter(emptyList(),
            onInc = { vm.inc(it) },
            onDec = { vm.dec(it) },
            onRem = { vm.remove(it) }
        )
        b.rv.layoutManager = LinearLayoutManager(this)
        b.rv.adapter = adapter

        vm.cart.observe(this) { list ->
            adapter.update(list)
            b.empty.visibility = if (list.isEmpty()) View.VISIBLE else View.GONE
        }

        vm.total.observe(this) { t ->
            b.tvTotal.text = "Total: ₹$t"
        }

        vm.load()

        b.btnCheckout.setOnClickListener {
            if ((vm.cart.value?.size ?: 0) == 0) return@setOnClickListener
            startActivity(Intent(this, CheckoutActivity::class.java))
        }
    }
}