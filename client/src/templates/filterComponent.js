import React, { useState } from "react";
import httpClient from "./httpClient.js";

const FilterComponent = () => {
    const [query, setQuery] = useState("");
        
        const executeQuery = async () => {
            console.log(query);

            try {
                const dbData = await httpClient.post("//localhost:5000/query", {
                    query
                });
                console.log(dbData.data)
                //HERE IS THE DATA

            } catch (error) {
                if (error.response.status === 401) {
                    alert("Invalid Query");
                }
            }
        };

    return ( 
        <div>
        <h1 class="font-weight-light">Query Page</h1>
        <label>Input Query: </label>
        <input type = "text" value={query} onChange={(e)=> setQuery(e.target.value)}/>
        <button type="button" onClick={() => executeQuery()}>Submit</button>
        </div>
     );
}
 
export default FilterComponent;