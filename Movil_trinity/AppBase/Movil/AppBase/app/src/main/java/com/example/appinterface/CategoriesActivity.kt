package com.example.appinterface

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.appinterface.Adapter.CategoriesAdapter
import com.example.appinterface.Api.RetrofitInstance
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CategoriesActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: CategoriesAdapter
    private val categoriesList = mutableListOf<Categories>()

    // Variables para los nuevos inputs
    private lateinit var etCategoriesName: EditText
    private lateinit var etImageUrl: EditText
    private lateinit var etDescription: EditText
    private lateinit var etStockMinimo: EditText
    private lateinit var btnAddCategories: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_categories)

        // Inicializar los nuevos inputs
        initViews()
        setupRecyclerView()
        loadCategories()
    }

    private fun initViews() {
        // Conectar los inputs del XML
        etCategoriesName = findViewById(R.id.etCategoriesName)
        etImageUrl = findViewById(R.id.etImageUrl)
        etDescription = findViewById(R.id.etDescription)
        etStockMinimo = findViewById(R.id.etStockMinimo)
        btnAddCategories = findViewById(R.id.btnAddCategories)

        // Configurar el botón agregar
        btnAddCategories.setOnClickListener {
            agregarCategoria()
        }

        recyclerView = findViewById(R.id.recyclerViewCategories)
    }

    private fun setupRecyclerView() {
        adapter = CategoriesAdapter(categoriesList)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = adapter
    }

    private fun loadCategories() {
        val call = RetrofitInstance.api.getCategories()

        call.enqueue(object : Callback<List<Categories>> {
            override fun onResponse(
                call: Call<List<Categories>>,
                response: Response<List<Categories>>
            ) {
                if (response.isSuccessful) {
                    val categories = response.body() ?: emptyList()
                    categoriesList.clear()
                    categoriesList.addAll(categories)
                    adapter.notifyDataSetChanged()

                    Toast.makeText(
                        this@CategoriesActivity,
                        "Categorías cargadas: ${categories.size}",
                        Toast.LENGTH_SHORT
                    ).show()
                } else {
                    Toast.makeText(
                        this@CategoriesActivity,
                        "Error del servidor: ${response.code()}",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }

            override fun onFailure(call: Call<List<Categories>>, t: Throwable) {
                Toast.makeText(
                    this@CategoriesActivity,
                    "Error de conexión: ${t.message}",
                    Toast.LENGTH_LONG
                ).show()
            }
        })
    }

    private fun agregarCategoria() {
        val nombre = etCategoriesName.text.toString()
        val descripcion = etDescription.text.toString()
        val stockMinimoText = etStockMinimo.text.toString()

        if (nombre.isEmpty() || descripcion.isEmpty() || stockMinimoText.isEmpty()) {
            Toast.makeText(this, "Por favor, completa todos los campos", Toast.LENGTH_SHORT).show()
            return
        }

        val stockMinimo = stockMinimoText.toIntOrNull()
        if (stockMinimo == null || stockMinimo < 0) {
            Toast.makeText(this, "Stock mínimo debe ser un número válido", Toast.LENGTH_SHORT).show()
            return
        }

        val nuevaCategoria = Categories(
            name = nombre,
            description = descripcion,
            stock_minimo = stockMinimo
        )

        val call = RetrofitInstance.api.createCategories(nuevaCategoria)

        call.enqueue(object : Callback<Categories> {
            override fun onResponse(call: Call<Categories>, response: Response<Categories>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@CategoriesActivity, "✅ Categoría creada exitosamente", Toast.LENGTH_SHORT)
                        .show()
                    etCategoriesName.text.clear()
                    etImageUrl.text.clear()
                    etDescription.text.clear()
                    etStockMinimo.text.clear()
                    loadCategories()
                } else {
                    // MOSTRAR MÁS DETALLES DEL ERROR
                    val errorBody = response.errorBody()?.string()
                    Toast.makeText(
                        this@CategoriesActivity,
                        "❌ Error ${response.code()}: $errorBody",
                        Toast.LENGTH_LONG
                    ).show()
                    println("ERROR DETAILS: $errorBody")
                }
            }

            override fun onFailure(call: Call<Categories>, t: Throwable) {
                Toast.makeText(
                    this@CategoriesActivity,
                    "❌ Error de conexión: ${t.message}",
                    Toast.LENGTH_LONG
                ).show()
            }
        })
    }
}