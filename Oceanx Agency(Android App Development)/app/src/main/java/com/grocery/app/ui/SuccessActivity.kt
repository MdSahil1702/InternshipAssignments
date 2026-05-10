package com.grocery.app.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.grocery.app.databinding.ActivitySuccessBinding
import kotlin.random.Random

class SuccessActivity : AppCompatActivity() {
    lateinit var b: ActivitySuccessBinding

    override fun onCreate(s: Bundle?) {
        super.onCreate(s)
        b = ActivitySuccessBinding.inflate(layoutInflater)
        setContentView(b.root)

        b.tvOrderId.text = "Order ID: ORD${Random.nextInt(10000, 99999)}"
        b.tvAddr.text    = "Delivering to: ${intent.getStringExtra("addr")}"
        b.tvPay.text     = "Payment: ${intent.getStringExtra("pay")}"
        b.tvEta.text     = "Estimated delivery: 20-30 mins"
    }
}