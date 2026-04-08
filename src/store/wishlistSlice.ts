import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addWishlistItem, clearWishlistItems, deleteWishlistItem, getWishlist } from '../services/wishlistService'
import type { Wishlist } from '../types/wishlist'

type WishlistState = {
  wishlist: Wishlist | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  mutationStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
}

const initialState: WishlistState = {
  wishlist: null,
  status: 'idle',
  mutationStatus: 'idle',
  error: '',
}

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => getWishlist())

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (productId: string, thunkApi) => {
  await addWishlistItem({ productId })

  return thunkApi.dispatch(fetchWishlist()).unwrap()
})

export const removeWishlistItem = createAsyncThunk('wishlist/removeItem', async (itemId: string, thunkApi) => {
  await deleteWishlistItem(itemId)

  return thunkApi.dispatch(fetchWishlist()).unwrap()
})

export const clearWishlist = createAsyncThunk('wishlist/clearWishlist', async (_, thunkApi) => {
  await clearWishlistItems()

  return thunkApi.dispatch(fetchWishlist()).unwrap()
})

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    resetWishlist(state) {
      state.wishlist = null
      state.status = 'idle'
      state.mutationStatus = 'idle'
      state.error = ''
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.wishlist = action.payload
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Unable to load wishlist.'
      })
      .addCase(addToWishlist.pending, (state) => {
        state.mutationStatus = 'loading'
        state.error = ''
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.wishlist = action.payload
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.mutationStatus = 'failed'
        state.error = 'Unable to add item to wishlist.'
      })
      .addCase(removeWishlistItem.pending, (state) => {
        state.mutationStatus = 'loading'
        state.error = ''
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.wishlist = action.payload
      })
      .addCase(removeWishlistItem.rejected, (state) => {
        state.mutationStatus = 'failed'
        state.error = 'Unable to remove wishlist item.'
      })
      .addCase(clearWishlist.pending, (state) => {
        state.mutationStatus = 'loading'
        state.error = ''
      })
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.wishlist = action.payload
      })
      .addCase(clearWishlist.rejected, (state) => {
        state.mutationStatus = 'failed'
        state.error = 'Unable to clear wishlist.'
      })
  },
})

export const { resetWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer