import { useSelector } from "react-redux";
import { selectIsDisplayed} from "../features/monsterDisplay/monsterDisplaySlice";
import { MonsterCard } from "./MonsterCard";

export function Monster () {
    const isMonsterDisplayed = useSelector(selectIsDisplayed);

    return (
        <div>
            {isMonsterDisplayed && <MonsterCard />}
        </div>
    )
}