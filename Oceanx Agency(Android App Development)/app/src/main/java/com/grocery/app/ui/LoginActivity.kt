package com.grocery.app.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.grocery.app.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {
    lateinit var b: ActivityLoginBinding

    override fun onCreate(s: Bundle?) {
        super.onCreate(s)
        b = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(b.root)

        b.btnNext.setOnClickListener {
            val ph = b.etPhone.text.toString().trim()
            if (ph.length != 10) {
                Toast.makeText(this, "Enter valid 10-digit number", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            startActivity(Intent(this, OtpActivity::class.java).putExtra("phone", ph))
        }
    }
}