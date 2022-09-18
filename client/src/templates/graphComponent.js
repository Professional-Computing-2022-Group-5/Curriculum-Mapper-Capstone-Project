import React, { useRef, useEffect, } from "react";
import ForceGraph2D from "react-force-graph-2d";


function  nodeHoverFunc(n) {

    console.log("---------------------");
    console.log("Read Link");
    console.log("---------------------");
}

function  nodeClickFunc(n) {

    console.log("---------------------");
    console.log("update or delete node");
    console.log("---------------------");
}

function  linkHoverFunc(l) {

    console.log("---------------------");
    console.log("Read Link");
    console.log("---------------------");
}

function  linkClickFunc(l) {

    console.log("---------------------");
    console.log("update or delete link");

    console.log("---------------------");
}

function  backgroundClickFunc(n) {

    console.log("---------------------");
    console.log("create new node or link");
    console.log("---------------------");
}

const GraphComponent = () => {
    const forceRef = useRef(null);
    useEffect(() => {
        forceRef.current.d3Force("charge").strength(-400);
    });

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

    return ( 
        <div>
        <ForceGraph2D
        graphData={data}

        width = {window.innerWidth*0.6}
        height = {window.innerHeight*0.8}

        backgroundColor="grey"

        nodeLabel={n => nodeHoverFunc(n)}
        onNodeClick={n => nodeClickFunc(n)}

        onLinkHover={l => linkHoverFunc(l)}
        onLinkClick={l => linkClickFunc(l)}
        
        onBackgroundClick={b => backgroundClickFunc(b)}

        linkCurvature="curvature"
        enablePointerInteraction={true}
        linkDirectionalParticleWidth={1}

        ref={forceRef}
        />
        </div>
    );
}

export default GraphComponent;


