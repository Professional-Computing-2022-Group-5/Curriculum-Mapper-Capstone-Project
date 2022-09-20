import { useState } from "react";
import React from "react";
import httpClient from "./httpClient";


 // COMPONENT POST FUNCTION

const createNode = async (data) => {
    console.log("sending this data")
    console.log(data)

    try {
        const dbData = await httpClient.post("//localhost:5000/nodeCreate", {
            data
        });

        console.log("DBDATA _ GRAPH COMP.js")
        console.log(dbData.data)
        if (dbData.data !== undefined){
            console.log("IN FINALLY")

        }
    } catch (error) {
        if (error.response.status === 401) {
            alert("Invalid Node Create");
        }
    } 
};

// Component 

const NodeCreate = () => {
    const [nodeDetails, setNodeDetails] = useState({unitCode: "", avaliabilities:""})
    

        return ( 
            <div>
                <p>NODE CREATE</p>

                <label>
                Unit Code :
                <input type="text" value={nodeDetails.unitCode} onChange={(e)=> setNodeDetails({ ...nodeDetails, unitCode: e.target.value })} />
                </label>
                <label>
                Avaliabilities:
                <input type="text" value={nodeDetails.avaliabilities} onChange={(e)=> setNodeDetails({ ...nodeDetails, avaliabilities: e.target.value })} />
                </label>
                <input type="submit" value="Submit" onClick={e => createNode(nodeDetails)}/>

            </div>
        );

        }
// <input type="submit" value="Delete" onClick={e => reurnQuery()}/>

const createLink = async (source, target) => {
    console.log("sending this source")
    console.log(source)
    console.log("sending this target")
    console.log(target)

    try {
        const dbData = await httpClient.post("//localhost:5000/linkCreate", {
            source, target
        });

        console.log("DBDATA _ GRAPH COMP.js")
        console.log(dbData.data)
        if (dbData.data !== undefined){
            console.log("IN FINALLY")

        }
    } catch (error) {
        if (error.response.status === 401) {
            alert("Invalid Link Create");
        }
    } 
};



const LinkCreate = () => {

    const [sourceDetails, setSourceDetails] = useState({unitCode: ""})
    const [targetDetails, setTargetDetails] = useState({unitCode: ""})

    return ( 
        <div>
            <p>LINK CREATE</p>

            <label>
            source id:
            <input type="text" value={sourceDetails.unitCode} onChange={(e)=> setSourceDetails({ ...sourceDetails, unitCode: e.target.value })} />
            </label>
            <label>
            target id:
            <input type="text" value={targetDetails.unitCode} onChange={(e)=> setTargetDetails({ ...targetDetails, unitCode: e.target.value })} />
            </label>
            <button onClick={e => createLink(sourceDetails, targetDetails)}>Submit</button>
        </div>
    );
}


export {  NodeCreate, LinkCreate }