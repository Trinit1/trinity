package com.example.appinterface

data class Categories(
    val id: Int = 0,
    val name: String,
    val description: String? = null,
    val stock_minimo: Int = 0,
)