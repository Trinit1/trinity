package com.example.appinterface

import android.os.Bundle
import android.view.View
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import android.annotation.SuppressLint
import android.content.Intent
import android.widget.*
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.appinterface.Api.RetrofitInstance
import com.example.appinterface.Adapter.CategoriesAdapter


class MainActivity : AppCompatActivity() {
    fun crearmostrarcategories(v: View) {
        val recyclerView = findViewById<RecyclerView>(R.id.RecyPersonas)
        recyclerView.layoutManager = LinearLayoutManager(this)

        RetrofitInstance.api.getCategories().enqueue(object : Callback<List<Categories>> {
            override fun onResponse(call: Call<List<Categories>>, response: Response<List<Categories>>) {
                if (response.isSuccessful) {
                    val data = response.body()
                    if (data != null && data.isNotEmpty()) {
                        val adapter = CategoriesAdapter(data)
                        recyclerView.adapter = adapter
                    } else {
                        Toast.makeText(this@MainActivity, "No hay categorias disponibles", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this@MainActivity, "Error en la respuesta de la API", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Categories>>, t: Throwable) {
                Toast.makeText(this@MainActivity, "Error en la conexión con la API", Toast.LENGTH_SHORT).show()
            }

        })
    }

}