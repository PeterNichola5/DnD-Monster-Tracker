import { useDispatch, useSelector } from "react-redux";
import { resultSelector } from "../features/searchBar/searchBarSlice";
import '../features/searchBar/searchBar.css';
import { fetchMonster, selectIsDisplayed, selectIsLoading} from "../features/monsterDisplay/monsterDisplaySlice";

export function SearchFilter() {
    const results = useSelector(resultSelector);
    const loading = useSelector(selectIsLoading);
    const isMonsterDisplayed = useSelector(selectIsDisplayed);
    const dispatch = useDispatch();
    const classToggle = isMonsterDisplayed || loading ? "hidden-filter" : "filter-container";

    return (
        <div className={classToggle}>
            {!isMonsterDisplayed && results.map(monster => (
                <button key={monster.index} 
                className='search-results'
                onClick={() => {dispatch(fetchMonster(monster.index))}}>{monster.name}</button>
            ))}
        </div>
    );
}