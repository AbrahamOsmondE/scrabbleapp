import React, {useRef} from 'react';
import '../App.css';
const Rack = ({rack,handleRackChange}) => {
    const refs = useRef([]);
    const changeFocus = (num) => {
        refs.current[num].focus()
    }
    const onKeyDown = (event,num) => {
        if(event.keyCode === 39){
            if(num!==6){
                changeFocus(num+1,refs)
            }
        }
        else if(event.keyCode===37){
            if(num!==0){
                changeFocus(num-1,refs)
            }
        }
    }
    const onKeyUp = (event,num) => {
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode === 32){
            if(num!==6){
                changeFocus(num+1,refs)
            }
        }
        else if(event.keyCode===8){
            if(rack[num] === "" && num!==0){
                changeFocus(num-1,refs)
            }
        }
    }
    let rows = [];
    for(var i = 0; i < 7; i++){
        let tileID = `tile${i}`;
        let tileNum = parseInt(`${i}`)
        rows.push(
            <div key={tileID} className={
                rack[tileNum]?
                "tileRack" :
                "normalRack"}>
                <input 
                    ref = {(element) => {
                        refs.current[tileNum] = element}}
                    id={tileID}
                    type="text" 
                    maxLength="1" 
                    value = {rack[tileNum]}
                    onChange = {(e) => {
                        handleRackChange(e,tileNum)
                    }}
                    onKeyDown ={(e) =>{
                        onKeyDown(e,tileNum)
                    }}
                    onKeyUp = {(e) => {
                        onKeyUp(e,tileNum)
                    }}
                >
                </input>
            </div>
        )
    }
    return (
    <div className="rack">
        {rows}
    </div>)
}
export default Rack;