import React, { useRef, useEffect, useState } from "react";
import httpClient from "./httpClient.js";
import ForceGraph2D from "react-force-graph-2d";

    /*var data = {
    nodes: [{ id: "A"}, { id: "B" }, { id: "C" }, { id: "D" }],
    links: [
        { source: "B", target: "C", value: 8 },
        { source: "C", target: "D", value: 10 },
        { source: "D", target: "A", value: 6 },
        { source: "B", target: "A", value: 6 },
        { source: "B", target: "D", value: 6 },
        { source: "D", target: "D", value: 6, curvature: 0.3 }
    ]
    };*/

    var data = {
    nodes:[
        {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6, "deleted":false, "id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
        {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
        {"deleted":false,"describe":"present and defend opinions by making judgments about information. validity of ideas, or quality of work based on a set of criteria.","id":292,"level":"IV.Analyzing","outcome":"(5) communicate effectively with stakeholders.","outcomeId":"5","type":"node","unitCode":"CITS4009"},
        {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
        {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
        {"deleted":false,"describe":"Exhibit memory of previously learned material by recalling facts, terms,basic concepts, and answers.","id":289,"level":"I.Remembering","outcome":"(2) select appropriate data visualisation options; ","outcomeId":"2","type":"node","unitCode":"CITS4009"},
        {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
        {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
        {"deleted":false,"describe":"Present and defend opinions by making judgments about information, validity of ideas, or quality of work based on a set of criteria.","id":291,"level":"V. Evaluating","outcome":"(4) critically assess the outcomes of a data analysis; ","outcomeId":"4","type":"node","unitCode":"CITS4009"}],
    links:[
        {"property":{"deleted":false,"id":241,"type":"relationship"},"source":183,"target":292},
        {"property":{"deleted":false,"id":238,"type":"relationship"},"source":183,"target":289},
        {"property":{"deleted":false,"id":240,"type":"relationship"},"source":183,"target":291}],
    }

    function App() {
    const forceRef = useRef(null);
    useEffect(() => {
        forceRef.current.d3Force("charge").strength(-400);
    });
    return (
        <ForceGraph2D
        graphData={data}
        nodeLabel="id"
        linkCurvature="curvature"
        enablePointerInteraction={true}
        linkDirectionalParticleWidth={1}
        ref={forceRef}
        />
    );
    }

    function Query() {
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
        <div className="query">
        <div class="container">
            <div class="row align-items-center my-5">
            <div class="col-lg-7">
                <img
                class="img-fluid rounded mb-4 mb-lg-0"
                src="http://placehold.it/900x400"
                alt=""
                />
            </div>
            <div class="col-lg-5">
                <h1 class="font-weight-light">Query</h1>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
                </p>
            </div>
            </div>
            <div>
                    <label>Input Query: </label>
                    <input type = "text" value={query} onChange={(e)=> setQuery(e.target.value)}/>
                </div>
                <button type="button" onClick={() => executeQuery()}>Submit</button>

            <App />
        </div>
        </div>
    );
    }

    export default Query;