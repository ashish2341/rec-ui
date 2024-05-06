import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from "./reducers/tokenSlice"

 
export default configureStore({
    reducer: {
        tokenInStore: tokenReducer,
      
      },
})