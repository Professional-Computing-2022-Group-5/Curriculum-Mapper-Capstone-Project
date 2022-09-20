import React, {useState } from "react";
import httpClient from "./httpClient.js";
import GraphComponent from "./graphComponent";


const Query = () => {
    const [query, setQuery] = useState("");
    //const [resp, setResponse] = useState({});
    const [graphActive, setGraphActive] = useState("noGraph");
    var response = {};

    const executeQuery = async (query) => {
        console.log(query);
        try {
            const dbData = await httpClient.post("//localhost:5000/query", {
                query
            });

            console.log("DBDATA _ QUERY.js")
            console.log(dbData.data)
            if (dbData.data !== undefined){
                console.log("IN FINALLY")
                

                console.log("FROM DOOO GRAPH")
                response = JSON.parse(JSON.stringify(dbData.data))
                Object.freeze(response);
                console.log(response)
                setGraphActive("haveData")
                //const forceRef = useRef(null);
                //console.log(inputs)
        
                //useEffect(() => {
                //    forceRef.current.d3Force("charge").strength(-400);
                //});

            }

            //setResponse(JSON.parse(JSON.stringify(dbData.data)))
            //response = JSON.parse(JSON.stringify(dbData.data))
            //setResponse(dbData.data)
            //console.log(response)


        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Query");
            }
        } //finally {
        //console.log("IN FINALLY")
        //console.log(response)
        //setResponse(response)
        //console.log(resp)
        //setGraphActive("showGraph");
    //}
    };

    if (graphActive === "haveData"){
        console.log(response)
        setGraphActive("showGraph");
    }

    return ( 
        <div class="container">

            <h1 class="font-weight-light">Query Page</h1>
            <label>Input Query: </label>
            <input type = "text" value={query} onChange={(e)=> setQuery(e.target.value)}/>
            <button type="button" onClick={() => executeQuery(query)}>Submit</button>

            <div class="row align-items-center" >

            {graphActive === "showGraph" && <GraphComponent data = {query}/>}

            </div>
        </div>

);
}

export default Query;

