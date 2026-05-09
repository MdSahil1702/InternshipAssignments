package com.grocery.app.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.grocery.app.data.Product
import com.grocery.app.databinding.ItemProductBinding

class ProductAdapter(
    private var list: List<Product>,
    private val onAdd: (Product) -> Unit
) : RecyclerView.Adapter<ProductAdapter.VH>() {

    inner class VH(val b: ItemProductBinding) : RecyclerView.ViewHolder(b.root)

    override fun onCreateViewHolder(p: ViewGroup, t: Int) =
        VH(ItemProductBinding.inflate(LayoutInflater.from(p.context), p, false))

    override fun getItemCount() = list.size

    override fun onBindViewHolder(h: VH, i: Int) {
        val p = list[i]
        h.b.tvName.text  = p.name
        h.b.tvPrice.text = "₹${p.price}"
        Glide.with(h.b.root).load(p.img).into(h.b.imgProduct)
        h.b.btnAdd.setOnClickListener { onAdd(p) }
    }

    fun update(data: List<Product>) { list = data; notifyDataSetChanged() }
}