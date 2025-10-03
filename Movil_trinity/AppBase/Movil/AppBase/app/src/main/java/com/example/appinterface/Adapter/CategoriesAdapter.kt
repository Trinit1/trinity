package com.example.appinterface.Adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.appinterface.Categories  // ← Importar el modelo Categories

// CAMBIO 1: En lugar de List<String> usamos List<Categories>
class CategoriesAdapter(private val categories: List<Categories>) :
    RecyclerView.Adapter<CategoriesAdapter.CategoriesViewHolder>() {

    // CAMBIO 2: onCreateViewHolder igual que PersonaAdapter
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CategoriesViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(android.R.layout.simple_list_item_1, parent, false)
        return CategoriesViewHolder(view)
    }

    // CAMBIO 3: onBindViewHolder usa Categories en lugar de String
    override fun onBindViewHolder(holder: CategoriesViewHolder, position: Int) {
        holder.bind(categories[position])  // ← Pasa un objeto Categories, no un String
    }

    // Igual que PersonaAdapter
    override fun getItemCount(): Int = categories.size

    // CAMBIO 4: CategoriesViewHolder en lugar de PersonaViewHolder
    class CategoriesViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        // CAMBIO 5: bind recibe Categories en lugar de String
        fun bind(categories: Categories) {
            // CAMBIO 6: Mostramos el nombre de la categoría
            (itemView as TextView).text = categories.name
        }
    }
}