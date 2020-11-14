import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css'

let orderSubtotal = 100
function StripeButton() {
  function handleToken(token, address) {
    console.log(token, address)
  }
  return (
    <div className="container">
      <StripeCheckout
        name="Pay with Stripe"
        stripeKey="pk_test_51Hmk1dJSfpsyMJaRPcz6no77LrPylcbf7RHzy2QPQtxhoVrxFG7lkHDCvf5PXZHQRxnkM4pS1wrgYH23p61DEtLA00LIGcDTUo"
        token={handleToken}
        amount={orderSubtotal * 100}
      />
    </div>
  )
}
export default StripeButton
// const mapState = (state) => {
//   return {
//     order: state.order
//   }
// }
// const mapDispatch = (dispatch) => {
//   return {
//     loadOrder: () => dispatch(getOrder())
//   }
// }
// export default (mapState, mapDispatch)(CheckoutForm);
