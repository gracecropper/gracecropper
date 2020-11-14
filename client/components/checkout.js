import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const onToken = token => {
  console.log('stripe token', token)
}

class CheckoutForm extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    // loadOrder()
  }
  render() {
    // const { status, quantity, orderSubtotal, tax, orderTotal, shippingAddress } = this.order
    let orderSubtotal = 100
    console.log('here?')
    return (
      <div>
        <StripeCheckout
          name="Grace Croppers"
          description="Total price"
          token={onToken}
          amount={orderSubtotal * 100}
          stripeKey="pk_test_51Hmk1dJSfpsyMJaRPcz6no77LrPylcbf7RHzy2QPQtxhoVrxFG7lkHDCvf5PXZHQRxnkM4pS1wrgYH23p61DEtLA00LIGcDTUo"
        >
          <span>PURCHASE</span>
        </StripeCheckout>
      </div>
    )
  }
}
export default CheckoutForm
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
