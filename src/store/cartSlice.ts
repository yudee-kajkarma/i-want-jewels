import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addCartItem, clearCartItems, deleteCartItem, getCart, updateCartItem } from '../services/cartService'
import type { AddToCartPayload, Cart } from '../types/cart'

type CartState = {
  cart: Cart | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  mutationStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
}

const initialState: CartState = {
  cart: null,
  status: 'idle',
  mutationStatus: 'idle',
  error: '',
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => getCart())

export const addToCart = createAsyncThunk('cart/addToCart', async (payload: AddToCartPayload, thunkApi) => {
  await addCartItem(payload)

  return thunkApi.dispatch(fetchCart()).unwrap()
})

export const changeCartItemQuantity = createAsyncThunk(
  'cart/changeQuantity',
  async (payload: { itemId: string; quantity: number }, thunkApi) => {
    await updateCartItem(payload.itemId, payload.quantity)

    return thunkApi.dispatch(fetchCart()).unwrap()
  },
)

export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (payload: { productId: string; variantId: string }, thunkApi) => {
    await deleteCartItem(payload.productId, payload.variantId)

    return thunkApi.dispatch(fetchCart()).unwrap()
  },
)

export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkApi) => {
  await clearCartItems()

  return thunkApi.dispatch(fetchCart()).unwrap()
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart(state) {
      state.cart = null
      state.status = 'idle'
      state.mutationStatus = 'idle'
      state.error = ''
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cart = action.payload
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Unable to load cart.'
      })
      .addCase(addToCart.pending, (state) => {
        state.mutationStatus = 'loading'
        state.error = ''
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.cart = action.payload
      })
      .addCase(addToCart.rejected, (state) => {
        state.mutationStatus = 'failed'
        state.error = 'Unable to add item to cart.'
      })
      .addCase(changeCartItemQuantity.pending, (state) => {
        state.mutationStatus = 'loading'
        state.error = ''
      })
      .addCase(changeCartItemQuantity.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.cart = action.payload
      })
      .addCase(changeCartItemQuantity.rejected, (state) => {
        state.mutationStatus = 'failed'
        state.error = 'Unable to update cart item.'
      })
      .addCase(removeCartItem.pending, (state) => {
        state.mutationStatus = 'loading'
        state.error = ''
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.cart = action.payload
      })
      .addCase(removeCartItem.rejected, (state) => {
        state.mutationStatus = 'failed'
        state.error = 'Unable to remove cart item.'
      })
      .addCase(clearCart.pending, (state) => {
        state.mutationStatus = 'loading'
        state.error = ''
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.cart = action.payload
      })
      .addCase(clearCart.rejected, (state) => {
        state.mutationStatus = 'failed'
        state.error = 'Unable to clear cart.'
      })
  },
})

export const { resetCart } = cartSlice.actions
export default cartSlice.reducer