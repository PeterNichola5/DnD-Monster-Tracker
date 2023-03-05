import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMonster } from "../monsterList/monsterListSlice";

export const getMonsters = createAsyncThunk(
    'searchBar/getMonsters',
    async() => {
        const response = await fetch('https://www.dnd5eapi.co/api/monsters/');
        const jsonResponse = await response.json();
        return jsonResponse.results;
    }
);


export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        term: '',
        results: [],
        isLoading: false,
        loadingFailed: false
    },
    reducers: {
        updateTerm: (state, action) => {
            state.term = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMonsters.pending, (state) => {
                state.isLoading = true;
                state.loadingFailed = false;
            })
            .addCase(getMonsters.fulfilled, (state, action) => {
                state.results = action.payload.filter(monster => monster.name.toLowerCase().includes(state.term.toLowerCase()));
                state.isLoading = false;
                state.loadingFailed = false;
            })
    }
});

export const termSelector = (state) => state.searchBar.term;
export const resultSelector = (state) => state.searchBar.results;

export const { updateTerm } = searchBarSlice.actions;
export default searchBarSlice.reducer;