package com.grocery.app.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.grocery.app.databinding.ActivityCheckoutBinding
import com.grocery.app.viewmodel.CartVM

class CheckoutActivity : AppCompatActivity() {
    lateinit var b: ActivityCheckoutBinding
    val vm: CartVM by viewModels()

    override fun onCreate(s: Bundle?) {
        super.onCreate(s)
        b = ActivityCheckoutBinding.inflate(layoutInflater)
        setContentView(b.root)

        b.rgPayment.check(b.rbCod.id)

        b.btnPlace.setOnClickListener {
            val addr = b.etAddr.text.toString().trim()
            if (addr.isEmpty()) {
                Toast.makeText(this, "Enter delivery address", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            val pay = if (b.rbCod.isChecked) "Cash on Delivery" else "Online Payment"
            vm.clear()
            startActivity(
                Intent(this, SuccessActivity::class.java)
                    .putExtra("addr", addr)
                    .putExtra("pay", pay)
            )
            finishAffinity()
        }
    }
}