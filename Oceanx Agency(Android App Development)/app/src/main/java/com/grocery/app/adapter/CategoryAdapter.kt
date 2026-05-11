package com.grocery.app.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.grocery.app.databinding.ItemCategoryBinding

class CategoryAdapter(
    private val cats: List<String>,
    private val onClick: (String) -> Unit
) : RecyclerView.Adapter<CategoryAdapter.VH>() {

    private var sel = "All"

    inner class VH(val b: ItemCategoryBinding) : RecyclerView.ViewHolder(b.root)

    override fun onCreateViewHolder(p: ViewGroup, t: Int) =
        VH(ItemCategoryBinding.inflate(LayoutInflater.from(p.context), p, false))

    override fun getItemCount() = cats.size

    override fun onBindViewHolder(h: VH, i: Int) {
        val cat = cats[i]
        h.b.tvCat.text = cat
        h.b.tvCat.isSelected = cat == sel
        h.b.root.setOnClickListener {
            sel = cat
            notifyDataSetChanged()
            onClick(cat)
        }
    }
}