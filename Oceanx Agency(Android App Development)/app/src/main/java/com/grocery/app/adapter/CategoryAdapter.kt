package com.grocery.app.adapter

import android.graphics.BitmapFactory
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.grocery.app.data.CartItem
import com.grocery.app.databinding.ItemCartBinding

class CartAdapter(
    private var list: List<CartItem>,
    private val onInc: (Int) -> Unit,
    private val onDec: (Int) -> Unit,
    private val onRem: (Int) -> Unit
) : RecyclerView.Adapter<CartAdapter.VH>() {

    inner class VH(val b: ItemCartBinding) : RecyclerView.ViewHolder(b.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        val b = ItemCartBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return VH(b)
    }

    override fun getItemCount() = list.size

    override fun onBindViewHolder(h: VH, i: Int) {
        val c = list[i]
        h.b.tvName.text = c.product.name
        h.b.tvPrice.text = "₹${c.product.price * c.qty}"
        h.b.tvQty.text = "${c.qty}"

        // scale down large images to avoid canvas crash
        val opts = BitmapFactory.Options().apply {
            inSampleSize = 4
        }
        val bmp = BitmapFactory.decodeResource(h.b.root.context.resources, c.product.img, opts)
        h.b.img.setImageBitmap(bmp)

        h.b.btnInc.setOnClickListener { onInc(c.product.id) }
        h.b.btnDec.setOnClickListener { onDec(c.product.id) }
        h.b.btnRem.setOnClickListener { onRem(c.product.id) }
    }

    fun update(data: List<CartItem>) {
        list = data
        notifyDataSetChanged()
    }
}