import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        uid: null,
        cid: null,
    },
    reducers: {
        play: (state, action) => {
            state.uid = action.payload[0];
            state.cid = action.payload[1];
        },
        reload: (state) => {
            //we're taking care of this in the root reducer.
        }
    },
}
)

export const { play, reload } = userSlice.actions
export const selectUser = state => state.user

export default userSlice.reducer