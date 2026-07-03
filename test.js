import crypto from "crypto"
const expected = crypto
  .createHmac("sha256", "whsec_demo_nomba_2026")
  .update(
    JSON.stringify({
      event: "payment_success",
      requestId: "req_3f9a2c",
      data: { merchantTxRef: "ord_8821", amount: 250000, currency: "NGN" },
    })
  )
  .digest("hex")
console.log(expected)
