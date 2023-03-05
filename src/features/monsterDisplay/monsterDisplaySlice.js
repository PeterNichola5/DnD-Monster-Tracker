import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMonster = createAsyncThunk(
    'monsterDisplay/fetchMonster',
    async (index) => {
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${index}/`);
        const jsonResponse = await response.json();
        return jsonResponse;
    });

export const monsterDisplaySlice = createSlice({
    name: 'monsterDisplay',
    initialState: {
        monster: {},
        speedCycle: 0,
        isDisplayed: false,
        isLoading: false,
        loadingFailed: false
    },
    reducers: {
        unload: (state) => {
            state.monster = {};
            state.isDisplayed = false;
        },
        cycleSpeed: (state) => {
            if(state.speedCycle >= 3) {
                state.speedCycle = 0;
            } else {
                state.speedCycle += 1;
            }
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMonster.pending, (state) => {
                state.isLoading = true;
                state.loadingFailed = false;
                state.isDisplayed = false;
            })
            .addCase(fetchMonster.fulfilled, (state, action) => {
                state.monster = action.payload;
                state.isDisplayed = true;
                state.isLoading = false;
                state.loadingFailed = false;
            })
            .addCase(fetchMonster.rejected, (state) => {
                state.isLoading = false;
                state.loadingFailed = true;
            });
    },
});


export const selectIsDisplayed = (state) => state.monsterDisplay.isDisplayed;
export const selectIsLoading = (state) => state.monsterDisplay.isDisplayed;
export const selectMonster = (state) => state.monsterDisplay.monster;
export const selectSpeedCycle = (state) => state.monsterDisplay.speedCycle;

export const { unload, cycleSpeed } = monsterDisplaySlice.actions;
export default monsterDisplaySlice.reducer;