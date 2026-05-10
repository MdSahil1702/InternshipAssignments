package com.grocery.app.ui

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.grocery.app.adapter.CategoryAdapter
import com.grocery.app.adapter.ProductAdapter
import com.grocery.app.databinding.ActivityHomeBinding
import com.grocery.app.utils.Fake
import com.grocery.app.viewmodel.CartVM

class HomeActivity : AppCompatActivity() {
    lateinit var b: ActivityHomeBinding
    val vm: CartVM by viewModels()
    lateinit var pAdapter: ProductAdapter
    var selCat = "All"

    override fun onCreate(s: Bundle?) {
        super.onCreate(s)
        b = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(b.root)

        b.rvCat.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        b.rvCat.adapter = CategoryAdapter(Fake.cats) { cat ->
            selCat = cat
            filter(b.etSearch.text.toString())
        }

        pAdapter = ProductAdapter(Fake.products) { p -> vm.add(p) }
        b.rvProducts.layoutManager = GridLayoutManager(this, 2)
        b.rvProducts.adapter = pAdapter

        b.etSearch.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) = filter(s.toString())
            override fun beforeTextChanged(s: CharSequence?, a: Int, b: Int, c: Int) {}
            override fun onTextChanged(s: CharSequence?, a: Int, b: Int, c: Int) {}
        })

        b.fabCart.setOnClickListener {
            startActivity(Intent(this, CartActivity::class.java))
        }
    }

    fun filter(q: String) {
        val res = Fake.products.filter {
            (selCat == "All" || it.cat == selCat) &&
                    it.name.contains(q, ignoreCase = true)
        }
        pAdapter.update(res)
    }
}