import { createSlice, configureStore } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: {}
    },
    reducers: {
        update: (state, messages) => {
            let m ={}
            messages.payload.forEach(mes=>{
                const {data,id}=mes;
                if(m[data.chatID]){
                    m[data.chatID].push(mes)
                }else{ m[data.chatID]=[mes]}
            })
            state.messages = m;

        }
    }
})

const store = configureStore({
    reducer: messageSlice.reducer
})
const { update } = messageSlice.actions
export { store, update }

