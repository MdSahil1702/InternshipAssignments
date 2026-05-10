package com.grocery.app.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.grocery.app.data.CartItem
import com.grocery.app.databinding.ItemCartBinding

class CartAdapter(
    private var list: List<CartItem>,
    private val onInc: (Int) -> Unit,
    private val onDec: (Int) -> Unit,
    private val onRem: (Int) -> Unit
) : RecyclerView.Adapter<CartAdapter.VH>() {

    inner class VH(val b: ItemCartBinding) : RecyclerView.ViewHolder(b.root)

    override fun onCreateViewHolder(p: ViewGroup, t: Int) =
        VH(ItemCartBinding.inflate(LayoutInflater.from(p.context), p, false))

    override fun getItemCount() = list.size

    override fun onBindViewHolder(h: VH, i: Int) {
        val c = list[i]
        h.b.tvName.text  = c.product.name
        h.b.tvPrice.text = "₹${c.product.price * c.qty}"
        h.b.tvQty.text   = "${c.qty}"
        Glide.with(h.b.root).load(c.product.img).into(h.b.img)
        h.b.btnInc.setOnClickListener { onInc(c.product.id) }
        h.b.btnDec.setOnClickListener { onDec(c.product.id) }
        h.b.btnRem.setOnClickListener { onRem(c.product.id) }
    }

    fun update(data: List<CartItem>) { list = data; notifyDataSetChanged() }
}