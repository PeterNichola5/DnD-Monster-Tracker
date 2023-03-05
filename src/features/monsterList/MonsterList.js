import { useSelector, useDispatch } from "react-redux";
import { selectMonsters } from "./monsterListSlice";
import { fetchMonster } from "../monsterDisplay/monsterDisplaySlice";
import "./MonsterList.css";

export function MonsterList() {
    const monsters= useSelector(selectMonsters);
    const dispatch = useDispatch();
   
    return (
        <div className="sidebar">
            <p className="list-title">Saved Monsters:</p>
            {monsters.map(monster => {
                return <button className="mon-btn" key={monster.index} onClick={() => {dispatch(fetchMonster(monster.index))}}>{monster.name}</button>;
            })}
        </div>
    );
}