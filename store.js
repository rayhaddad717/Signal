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
const callStatusSlice = createSlice({
    name: 'callStatus',
    initialState: {
        isVideoCall:false,
        incomingCall:false,
        isOnACall:false,
        callerName:'',
        callerID:'',
        callDuration:0,
        isCalling:false,
    },
    reducers: {
        incrementCallDuration:(state)=>{
            state.callDuration++;
        },
        resetCallStatus:(state)=>{
            state.isVideoCall=false;
            state.incomingCall=false;
            state.isOnACall=false;
            state.callerName='';
            state.callerID='';
            state.callDuration=0;
            state.isCalling=false;
        },
        updateCallStatus: (state, newState) => {
            state={...state,...newState};
        }
    }
})
const userMediaSlice = createSlice({
    name: 'userMedia',
    initialState: {
        localMediaStream:null,
        remoteMediaStream:null
    },
    reducers: {
        setLocalMediaStream:((state,stream)=>{
            state.localMediaStream=stream;
        }),
        setRemoteMediaStream:((state,stream)=>{
            state.remoteMediaStream=stream;
        })
    }
})

const store = configureStore({
    reducer:  {
        messages: messageSlice.reducer,
        callStatus:callStatusSlice.reducer,
        userMedia:userMediaSlice.reducer
    }
})
const { update } = messageSlice.actions
const { updateCallStatus,resetCallStatus,incrementCallDuration } = callStatusSlice.actions
const {setLocalMediaStream, setRemoteMediaStream} = userMediaSlice.actions
export { setLocalMediaStream, setRemoteMediaStream,store, update , updateCallStatus,resetCallStatus,incrementCallDuration};

