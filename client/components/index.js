/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

// export {default as Home} from './home'
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {AllProducts} from './all-products'
export {default as SingleProduct} from './SingleProduct'
export {default as AllUsers} from './allusers'
export {default as AdminHome} from './admin-home'
