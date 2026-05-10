package com.grocery.app.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.grocery.app.databinding.ActivityOtpBinding
import com.grocery.app.utils.Fake

class OtpActivity : AppCompatActivity() {
    lateinit var b: ActivityOtpBinding

    override fun onCreate(s: Bundle?) {
        super.onCreate(s)
        b = ActivityOtpBinding.inflate(layoutInflater)
        setContentView(b.root)

        val ph = intent.getStringExtra("phone")
        b.tvMsg.text = "OTP sent to $ph\n(Use: ${Fake.OTP})"

        b.btnVerify.setOnClickListener {
            val otp = b.etOtp.text.toString().trim()
            if (otp == Fake.OTP) {
                startActivity(Intent(this, HomeActivity::class.java))
                finishAffinity()
            } else {
                Toast.makeText(this, "Wrong OTP!", Toast.LENGTH_SHORT).show()
            }
        }
    }
}