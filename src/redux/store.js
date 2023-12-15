import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { CollApsedReducer } from './reducers/CollapsedReducer';
import { LoadingReducer } from './reducers/LoadingReducer'
import { SetColorReducer } from './reducers/SetColorReducer'


import { persistStore, persistReducer } from 'redux-persist'
// 存储的位置
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// 持久化存储的reducer
const persistConfig = {
    key: 'ws',
    storage,
    blacklist: ['LoadingReducer','CollApsedReducer','SetColorReducer']
}

const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer,
    SetColorReducer
})
// 这个函数将一个persistConfig对象和一个reducer函数传递给persistReducer函数，返回一个用于处理Redux应用状态的持久化(reduced)函数。
const persistedReducer = persistReducer(persistConfig, reducer)

// 创建了一个store，使用了persistedReducer作为reducer函数
const store = createStore(persistedReducer);
const persistor = persistStore(store)
export {
    store,
    persistor
}