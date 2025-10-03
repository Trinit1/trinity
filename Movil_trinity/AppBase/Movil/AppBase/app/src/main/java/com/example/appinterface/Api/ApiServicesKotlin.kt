package com.example.appinterface.Api

import com.example.appinterface.Categories
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiServicesKotlin {
    // GET existente para obtener categorías
    @GET("categories")
    fun getCategories(): Call<List<Categories>>

    // POST NUEVO para crear categorías
    @POST("categories")
    fun createCategories(@Body categories: Categories): Call<Categories>
}