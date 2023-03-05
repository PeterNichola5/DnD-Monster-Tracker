import { createSlice } from '@reduxjs/toolkit';

/*
STATE FORMAT: 
[
    {
        name: 'name',
        index: 'index',
        url: `/api/monsters/${index}`
    },
]
*/ 

export const monsterListSlice = createSlice({
    name: 'monsterList',
    initialState: [],
    reducers: {
        addMonster: (state, action) => {
            if(state.find(monster => monster.index === action.payload.index) === undefined) {
                state.push(action.payload);
            }
        },
        removeMonster: (state, action) => {
            console.log(`target: ${state}, index: ${action.payload.index}`);
            const monIndex = state.findIndex(monster => monster.index === action.payload.index);
            if(state.length > 0 && monIndex !== -1) {
                state.splice(monIndex, 1);
            }
        },
    }
});

export const selectMonsters = (state) => state.monsterList;

export const { addMonster, removeMonster } = monsterListSlice.actions;
export default monsterListSlice.reducer;