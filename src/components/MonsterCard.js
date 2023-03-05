import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMonster, removeMonster } from "../features/monsterList/monsterListSlice";
import { selectMonster, unload, cycleSpeed, selectSpeedCycle } from "../features/monsterDisplay/monsterDisplaySlice";
import './MonsterCard.css';


export function MonsterCard () {
    const dispatch = useDispatch();
    const monster = useSelector(selectMonster);
    const speedCycle = useSelector(selectSpeedCycle);
    const [speedElement, setSpeedElement] = useState([monster.speed.walk, '(walk)']);
    const [speedClass, setSpeedClass] = useState("");
    const saves = monster.proficiencies.filter(attribute => attribute.proficiency.name.includes('Saving'));
    const skills = monster.proficiencies.filter(attribute => attribute.proficiency.name.includes('Skill'));
    const aOrAn = monster.name[0].toLowerCase() === 'a' ||
        monster.name[0].toLowerCase() === 'e' ||
        monster.name[0].toLowerCase() === 'i' ||
        monster.name[0].toLowerCase() === 'o' ||
        monster.name[0].toLowerCase() === 'u' ? "an" : "a";
    let monSense = []; 
    
    Object.entries(monster.senses).forEach(sense => {
        const senseNames = sense[0].split("_");
        let senseName = "";
        for(let i = 0; i < senseNames.length; i++) {
            if(i === senseNames.length - 1) {
                senseName += senseNames[i];
            } else {
                senseName += `${senseNames[i]} `;
            }
        }
        monSense.push(`${senseName}: ${sense[1]}`)
    });

    useEffect(() => {
            switch(speedCycle) {
            case 0:
                if(monster.speed.walk) {
                    setSpeedElement([monster.speed.walk, '(walk)']);
                } else {setSpeedElement(["N/A","(walk)"]);}
                break;
            case 1:
                if(monster.speed.swim) {
                    setSpeedElement([monster.speed.swim, "(swim)"]);
                } else {setSpeedElement(["N/A","(swim)"]);}
                break;
            case 2:
                if(monster.speed.fly) {
                    setSpeedElement([monster.speed.fly, "(fly)"]);
                } else {setSpeedElement(["N/A","(fly)"]);}
                break;
            case 3:
                if(monster.speed.burrow) {
                    setSpeedElement([monster.speed.burrow, "(burrow)"]);
                } else {setSpeedElement(["N/A", "(burrow)"]);}
                break;
            default:
                break;
            }
    }, [dispatch, speedCycle]);

    return (
        <div className="card">

            {/*Top section of card info*/}
            <div className="card-name-container">
                <p className="card-text">{monster.name}</p>
                <p className="card-text">EXP: {monster.xp}</p>
            </div>
            <div className="size-container">
                <p className="card-text">Size</p>
                <p className="card-text">{monster.size}</p>
            </div>
            <div className="type-container">
                <p className="card-text">Type</p>
                <p className="card-text">{monster.type}</p>
            </div>
            <div className="alignment-container">
                <p className="card-text">Alignment</p>
                <p className="card-text">{monster.alignment}</p>
            </div>
            <div className="exit-container">
                <button className="card-exit"
                onClick={() => {dispatch(unload())}}>X</button>
            </div>

            {/*Image and column stats card section */}
            <div className='str-container'>
                <p className="card-text">STR</p>
                <p className='card-text'>{monster.strength}</p>
                <p className="card-text-mod">{monster.strength>=10?<span>(+</span>:<span>(</span>}{Math.floor(monster.strength/2)-5})</p>
            </div>
            <div className="dex-container">
                <p className="card-text">DEX</p>
                <p className="card-text">{monster.dexterity}</p>
                <p className="card-text-mod">{monster.dexterity>=10?<span>(+</span>:<span>(</span>}{Math.floor(monster.dexterity/2)-5})</p>
            </div>
            <div className="con-container">
                <p className="card-text">CON</p>
                <p className="card-text">{monster.constitution}</p>
                <p className="card-text-mod">{monster.constitution>=10?<span>(+</span>:<span>(</span>}{Math.floor(monster.constitution/2)-5})</p>
            </div>
            <div className="int-container">
                <p className="card-text">INT</p>
                <p className="card-text">{monster.intelligence}</p>
                {monster.intelligence>=10?<p className="card-text-mod">(+{Math.floor(monster.intelligence/2)-5})</p>:<p className="card-text-mod">({Math.floor(monster.intelligence/2)-5})</p>}
            </div>
            <div className="wis-container">
                <p className="card-text">WIS</p>
                <p className="card-text">{monster.wisdom}</p>
                <p className="card-text-mod">{monster.wisdom>=10?<span>(+</span>:<span>(</span>}{Math.floor(monster.wisdom/2)-5})</p>
            </div>
            <div className="cha-container">
                <p className="card-text">CHA</p>
                <p className="card-text">{monster.charisma}</p>
                <p className="card-text-mod">{monster.charisma>=10?<span>(+</span>:<span>(</span>}{Math.floor(monster.charisma/2)-5})</p>
            </div>

            <div className="img-container">
                {monster.image && <img src={`https://www.dnd5eapi.co${monster.image}`} alt='' className="card-image"/>}
                {!monster.image && <p className="card-text"><br/><br/><br/>Unfortunately, there is no image for this monster.  You're just gunna have to imagine {aOrAn} {monster.name}</p>}
            </div>

            <div className="hp-container">
                <p className="card-text">HP</p>
                <p className="card-text">{monster.hit_points}</p>
            </div>
            <div className="ac-container">
                <p className="card-text">AC</p>
                <p className="card-text">{monster.armor_class[0].value}</p>
            </div>
            <div className={`speed-container ${speedClass}`}
            onClick={() => {setSpeedClass("speed-animation")}}
            onAnimationStart={() => {setTimeout(() => {dispatch(cycleSpeed())}, 110)}}
            onAnimationEnd={() => {setSpeedClass("")}}>
                <p className="card-text-spd">Speed</p>
                <p className="card-text-spd">{speedElement[0]}</p>
                <p className="card-text-spd">{speedElement[1]}</p>
            </div>
            <div className="cr-container">
                <p className="card-text">CR</p>
                <p className="card-text">{monster.challenge_rating}</p>
            </div>

            {/*Abilities section of card below image*/}
            <div className="prof-container">
                <p className="card-text-cen">Proficiencies:</p>
                <p className="card-text-left"> 
                    Saving Throws: {saves.length !== 0 && saves.map(attribute => {
                        const arr = attribute.proficiency.name.split(" ");
                        return `${arr[arr.length - 1]} +${attribute.value}, `;  
                    })}
                    
                    {saves.length === 0 && "None"}
                </p>
                <p className="card-text-left">
                    Skills: {skills.length !== 0 && skills.map(attribute => {
                        const arr = attribute.proficiency.name.split(": ");
                        return `${arr[arr.length - 1]} +${attribute.value}, `;
                    })}

                    {skills.length === 0 && "None"}
                </p>
            </div>

            <div className="dmg-vuln-container">
                <p className="card-text-left">Damage Vulnerabilities: {monster.damage_vulnerabilities.length !==0 && 
                    monster.damage_vulnerabilities.map(attribute => `${attribute}, ` )} 
                    {monster.damage_vulnerabilities.length === 0 && " None"}
                </p>
            </div>
            <div className="dmg-res-container">
                <p className="card-text-left">Damage Resistances: {monster.damage_resistances.length !== 0 &&
                    monster.damage_resistances.map(attribute => `${attribute}, ` )}
                    {monster.damage_resistances.length === 0 && " None"}
                </p>
            </div>
            <div className="dmg-im-container">
                <p className="card-text-left">Damage Immunities: {monster.damage_immunities.length !== 0 &&
                    monster.damage_immunities.map(attribute => `${attribute}, ` )}
                    {monster.damage_immunities.length === 0 && " None"}
                </p>
            </div>
            <div className="con-im-container">
                <p className="card-text-left">Condition Immunities: {monster.condition_immunities.length !== 0 &&
                    monster.condition_immunities.map(attribute => `${attribute.name}, ` )}
                    {monster.condition_immunities.length === 0 && " None"}
                </p>
            </div>
            <div className="language-container">
            <p className="card-text-left">Languages: {monster.languages !== "" && monster.languages}
                {monster.languages === "" && " None"}
            </p>
            </div>

            <div className="senses-container">
                <p className="card-text-cen"> Senses:</p>
                <ul>
                    {monSense.map(sense => {
                        return <li key={sense} className="card-text">{sense}</li>;
                    })}
                </ul>
            </div>

            <div className="ability-container">

            </div>

            <div className="add-and-remove">
                <button className="add-btn" onClick={() => {dispatch(addMonster({name: monster.name, index: monster.index, url: monster.url}))}}>ADD</button>
                <button className="rmv-btn" onClick={() => {dispatch(removeMonster({index: monster.index}))}}>REMOVE</button>
            </div>
        </div>
    );
}