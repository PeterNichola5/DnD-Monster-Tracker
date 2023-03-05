import { getMonsters, termSelector, updateTerm } from "./searchBarSlice";
import { SearchFilter } from "../../components/SearchFilter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./searchBar.css";


export function SearchBar () {
    const dispatch = useDispatch();
    const term = useSelector(termSelector);

    useEffect(() => {
        dispatch(getMonsters());
    }, [dispatch, term]);
    

    return (
        <div className="search-holder">
            <div className="bar-effect">
                <input 
                className="search-bar"
                type='text'
                placeholder="enter a monster"
                onChange={({target}) => dispatch(updateTerm(target.value))}/>
            </div>
            
            <SearchFilter className='tst' />
        </div>
    );
}