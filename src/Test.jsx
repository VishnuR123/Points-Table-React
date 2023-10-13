import { useState,useEffect } from "react";
import './Test.css';
function Test(props){
    const [peopleData,setPeopleData]=useState([]);
    const [playerData,setPlayerData]=useState([]);
    const [myArray, setMyArray] = useState([]);
    const [valuee,setValuee] = useState('');
    const [country1players,setCount1]=useState([]);
    const [country2players,setCount2]=useState([]);
    const [finalList,setFinalList]=useState([]);
    //process initiators
    const [changeCss,setChangeCss] = useState(0);
    const [changeCountry,setChangeCountry] = useState(0);
    const [changeList,setChangeList] = useState(0);
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/people.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPeopleData(data);
                setPlayerData(props.data);
                console.log("setting initial data");

          } catch (error) {
            console.error('Error fetching JSON data:', error);
          }
        };
    
        fetchData();
    }, []);
    
    const handleButtonClick = (value,myArray1) => {
        setFinalList([]);
        setValuee(value);
        setMyArray(myArray1);
        setChangeCss(changeCss+1);
    };  
    
    useEffect(()=>{
        const temparr=myArray;
        
        if (temparr.includes(valuee)) {
            // If the value is already in myArray, remove it
            // setMyArray(temparr.filter((item) => item !== value));
            return;
        } else {
            // If the value is not in myArray, add it
            if (temparr.length >= 2) {
                // If myArray has 2 elements, empty it first
                temparr.splice(0);
                setMyArray(temparr);
            }
            temparr.push(valuee);
            setMyArray(temparr);
        }

        console.log(myArray.length);
        for(const value of myArray){
            console.log(value);
        }
 
        setChangeCountry(changeCountry+1);
        console.log('changes');

    },[changeCss]);

    useEffect(()=>{
        const country1=myArray[0];
        const country2=myArray[1];
        const tempcountry1pl=[];
        const tempcountry2pl=[];

        for(const player of playerData){
            if(player.Country && player.Country.trim() === country1){
                console.log('succes');
                tempcountry1pl.push(player.Title);
            }else if(player.Country && player.Country.trim() === country2){
                console.log('succes');
                tempcountry2pl.push(player.Title);
            }
        }

        setCount1(tempcountry1pl);
        setCount2(tempcountry2pl);
        console.log(tempcountry1pl);
        console.log(tempcountry2pl);
            setChangeList(changeList+1);

    },[changeCountry]);

    useEffect(()=>{
        finalList.splice(0);
        setFinalList([]);

        const tempfinalList = peopleData.map((person) => {
            let Players1 = [];
            let Players2 = [];
            Players1 = person.players.filter((player) => country1players.includes(player));
            Players2 = person.players.filter((player) => country2players.includes(player));
            return {
                personName: person.personName,
                Players1,
                Players2
            };
        });
        setFinalList(tempfinalList);
        console.log(tempfinalList);
    },[changeList]);
    


    return(
    <div>
        <div>
            {['AFG','AUS','BAN','ENG','IND','NED','NZ','PAK','SA','SL'].map((value) => (
                <button
                key={value}
                className={myArray.includes(value) ? value+'1':'normal-button'}
                onClick={() => handleButtonClick(value,myArray)}
                >
                {value}
                </button>
            ))}
        </div>
        <br />
        <hr /><br />

            <div className="team-container-2">{finalList.map((person)=>(
                <div className="person-box" key={person.personName}>
                    <h2>{person.personName}</h2>
                    <ul>{person.Players1.map((playerr,index)=>(
                        <li key={index}>{playerr}</li>
                        ))}</ul>
                    <ul>{person.Players2.map((playerr,index)=>(
                        <li key={index}>{playerr}</li>
                        ))}</ul>
                </div> 
            ))}

            </div>
    
    </div>
    )
}

export default Test;