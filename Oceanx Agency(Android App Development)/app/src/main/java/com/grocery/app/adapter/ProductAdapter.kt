package com.grocery.app.adapter

import android.graphics.BitmapFactory
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

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        val b = ItemProductBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return VH(b)
    }

    override fun getItemCount() = list.size

    override fun onBindViewHolder(h: VH, i: Int) {
        val item = list[i]
        h.b.tvName.text = item.name
        h.b.tvPrice.text = "₹${item.price}"

        //scaling down large images to avoid canvas crash
        val opts = BitmapFactory.Options().apply{
            inSampleSize=4
        }
        
        h.b.imgProduct.setImageResource(item.img)
        h.b.btnAdd.setOnClickListener { onAdd(item) }
    }

    fun update(data: List<Product>) {
        list = data
        notifyDataSetChanged()
    }
}