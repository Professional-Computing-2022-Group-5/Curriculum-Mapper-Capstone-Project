import React, { useRef, useEffect, useState, } from "react";
import ForceGraph2D from "react-force-graph-2d";

import {NodeUpdate} from "./nodeCrud.js";
import {NodeCreate} from "./nodeCrud.js";

import {LinkUpdate} from "./linkCrud.js";
import {LinkCreate} from "./linkCrud.js";

var resultData =  ({"links":[
    {"property":{"deleted":false,"id":241,"type":"relationship"},"source":183,"target":292},
    {"property":{"deleted":false,"id":238,"type":"relationship"},"source":183,"target":289},
    {"property":{"deleted":false,"id":240,"type":"relationship"},"source":183,"target":291}],
"nodes":
    [{"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"deleted":false,"describe":"present and defend opinions by making judgments about information. validity of ideas, or quality of work based on a set of criteria.","id":292,"level":"IV.Analyzing","outcome":"(5) communicate effectively with stakeholders.","outcomeId":"5","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"deleted":false,"describe":"Exhibit memory of previously learned material by recalling facts, terms,basic concepts, and answers.","id":289,"level":"I.Remembering","outcome":"(2) select appropriate data visualisation options; ","outcomeId":"2","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"deleted":false,"describe":"Present and defend opinions by making judgments about information, validity of ideas, or quality of work based on a set of criteria.","id":291,"level":"V. Evaluating","outcome":"(4) critically assess the outcomes of a data analysis; ","outcomeId":"4","type":"node","unitCode":"CITS4009"}]
})


const GraphComponent = ({data}) => {

    const [filterActive, setFilterActive] = useState("none")
    //const [receivedData, setReceivedData] = useState("noData")
    
    console.log("DID IT WORK")
    console.log(data)

    const forceRef = useRef(null);

    useEffect(() => {
        forceRef.current.d3Force("charge").strength(-400);
    });
    

    //let responseData;
/*
    httpClient.post("//localhost:5000/query", {query})
        .then(function (response) {
            console.log("REAPOSNED FUNCTION");
            console.log(response.data);
            responseData = JSON.parse(JSON.stringify(response.data))
            setReceivedData("haveData");
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                alert("Invalid Query");
            }
        });

    //function callPost(){
       // httpClient.post("//localhost:5000/query", {query})
        //    .then(function (response) {
        //        console.log("REAPOSNED FUNCTION");
                //console.log(response.data);
                //responseData = JSON.parse(JSON.stringify(response.data))
                //receivedData.data = JSON.parse(JSON.stringify(response.data))
//
         //       setGotData(JSON.parse(JSON.stringify(response.data)))

         //       console.log("setGotData")
         //       console.log(gotData)
            
         //       setReceivedData("haveData");
         //   })
         //   .catch(function (error) {
         //       if (error.response.status === 401) {
         //           alert("Invalid Query");
         //       }
         //   });
      //  }

      const executeQuery = async (query) => {
        console.log(query);
        
        try {
            const dbData = await httpClient.post("//localhost:5000/query", {
                query
            });
            setGotData(JSON.parse(JSON.stringify(dbData.data)))
            console.log(gotData)

        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Query");
            }
        } finally {
        console.log("IN FINALLY")
        setReceivedData("haveData");
    }
    };

    const executeQuery = async (query) => {
        try {
            var dbData = await httpClient.post("//localhost:5000/query", {
                query
            });
            setGotData(JSON.parse(JSON.stringify(dbData.data)))
            console.log(gotData)
            if (dbData != undefined){
                console.log("IN FINALLY - HAVE DATA")
                setReceivedData("haveData");
            }

        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Query");
            }
        } 
    };


   //const query = props.query
    //if (receivedData != "haveData" && gotData == undefined){
    //    console.log("IN IF STATEMENT")
    //    callPost()

    executeQuery()

    function getDataPost(){
     var response;
    useEffect(() => {(async () => {
        try {
            const resp = await httpClient.post("//localhost:5000/query", {
                    query
            });
            
            console.log(resp.data)
                const returnData = {"links":[
                    {"property":{"deleted":false,"id":241,"type":"relationship"},"source":183,"target":292},
                    {"property":{"deleted":false,"id":238,"type":"relationship"},"source":183,"target":289},
                    {"property":{"deleted":false,"id":240,"type":"relationship"},"source":183,"target":291}],
                "nodes":
                    [{"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"deleted":false,"describe":"present and defend opinions by making judgments about information. validity of ideas, or quality of work based on a set of criteria.","id":292,"level":"IV.Analyzing","outcome":"(5) communicate effectively with stakeholders.","outcomeId":"5","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"deleted":false,"describe":"Exhibit memory of previously learned material by recalling facts, terms,basic concepts, and answers.","id":289,"level":"I.Remembering","outcome":"(2) select appropriate data visualisation options; ","outcomeId":"2","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"deleted":false,"describe":"Present and defend opinions by making judgments about information, validity of ideas, or quality of work based on a set of criteria.","id":291,"level":"V. Evaluating","outcome":"(4) critically assess the outcomes of a data analysis; ","outcomeId":"4","type":"node","unitCode":"CITS4009"}]
                }
                response = JSON.parse(JSON.stringify(resp.data))
                console.log(response)
    
            } finally {
                console.log("IN FINALLY")
                console.log(response)
                setReceivedData("haveData");
            }
        })();
        }, []);
        if (response != "undefined"){

            return response;
        }
        console.log("AFTER TRY FINALLY")
        console.log(response)
    }


    //const data = props.data
    //console.log(data)
    //console.log(typeof(data))

    //getDataPost(query);
    //console.log("AFTER PSOT CASS")
    //console.log(responseData)
    //console.log("HOHOHO PSOT CASS")
    

/*
    const getData = async () => {
        const dbData = await httpClient.post("//localhost:5000/query", props.query);

        console.log(dbData.data)
        console.log(dbData.data)

        
        const returnData = {"links":[
            {"property":{"deleted":false,"id":241,"type":"relationship"},"source":183,"target":292},
            {"property":{"deleted":false,"id":238,"type":"relationship"},"source":183,"target":289},
            {"property":{"deleted":false,"id":240,"type":"relationship"},"source":183,"target":291}],
        "nodes":
            [{"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
            {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
            {"deleted":false,"describe":"present and defend opinions by making judgments about information. validity of ideas, or quality of work based on a set of criteria.","id":292,"level":"IV.Analyzing","outcome":"(5) communicate effectively with stakeholders.","outcomeId":"5","type":"node","unitCode":"CITS4009"},
            {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
            {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
            {"deleted":false,"describe":"Exhibit memory of previously learned material by recalling facts, terms,basic concepts, and answers.","id":289,"level":"I.Remembering","outcome":"(2) select appropriate data visualisation options; ","outcomeId":"2","type":"node","unitCode":"CITS4009"},
            {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
            {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
            {"deleted":false,"describe":"Present and defend opinions by making judgments about information, validity of ideas, or quality of work based on a set of criteria.","id":291,"level":"V. Evaluating","outcome":"(4) critically assess the outcomes of a data analysis; ","outcomeId":"4","type":"node","unitCode":"CITS4009"}]
        }

        //data = JSON.parse(JSON.stringify(returnData));
        //console.log("__DEDWC_++")
        //console.log(typeof(data.nodes))
        //console.log(data.nodes)

        return (
            {"links":[
                {"property":{"deleted":false,"id":241,"type":"relationship"},"source":183,"target":292},
                {"property":{"deleted":false,"id":238,"type":"relationship"},"source":183,"target":289},
                {"property":{"deleted":false,"id":240,"type":"relationship"},"source":183,"target":291}],
            "nodes":
                [{"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                {"deleted":false,"describe":"present and defend opinions by making judgments about information. validity of ideas, or quality of work based on a set of criteria.","id":292,"level":"IV.Analyzing","outcome":"(5) communicate effectively with stakeholders.","outcomeId":"5","type":"node","unitCode":"CITS4009"},
                {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                {"deleted":false,"describe":"Exhibit memory of previously learned material by recalling facts, terms,basic concepts, and answers.","id":289,"level":"I.Remembering","outcome":"(2) select appropriate data visualisation options; ","outcomeId":"2","type":"node","unitCode":"CITS4009"},
                {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                {"deleted":false,"describe":"Present and defend opinions by making judgments about information, validity of ideas, or quality of work based on a set of criteria.","id":291,"level":"V. Evaluating","outcome":"(4) critically assess the outcomes of a data analysis; ","outcomeId":"4","type":"node","unitCode":"CITS4009"}]
            })
        } 
*/


    const NodeRead = () => {

        return ( 
            <div>
                <p>NODE READ</p>
                <button onClick= {n => setFilterActive("NodeUpdate")}>Update</button>
                <button>Delete</button>
            </div>
        );
    }
    
    const LinkRead = () => {
        return ( 
            <div>
                <p>LINK READ</p>
                <button onClick= {n => setFilterActive("LinkUpdate")}>Update</button>
                <button>Delete</button>
            </div>
        );
    }
    
    const Create = () => {
        return ( 
            <div>
                <p>CREATE</p>
                <button onClick= {n => setFilterActive("NodeCreate")}>Create Node</button>
                <button onClick= {n => setFilterActive("LinkCreate")}>Create Link</button>
            </div>
        );
    }

    function handleNodeClick(node){
        console.log(node.id)
        //setFilterActive({ ...filterActive, state:"NodeRead",id: node.id });
        //console.log(filterActive[id])
        setFilterActive("NodeRead");
    }

    function handleLinkClick(link){
        setFilterActive("LinkRead");
    }

    function handleBackgroundClick(item){
        setFilterActive("Create");
    }



    return ( 
        <div>
        
        {filterActive === "NodeRead" && <NodeRead />}
        {filterActive === "LinkRead" && <LinkRead />}
        {filterActive === "Create" && <Create/>}

        {filterActive ===  "NodeUpdate" && <NodeUpdate/>}
        {filterActive ===  "NodeCreate" && <NodeCreate/>}
        {filterActive ===  "LinkUpdate" && <LinkUpdate/>}
        {filterActive ===  "LinkCreate" && <LinkCreate/>}

        <ForceGraph2D
            graphData={resultData}
    
            width = {window.innerWidth*0.6}
            height = {window.innerHeight*0.8}
    
            backgroundColor="grey"
    
            onNodeDragEnd={node => {
                node.fx = node.x;
                node.fy = node.y;
                node.fz = node.z;
            }}
    
            cooldownTicks={100}
            onEngineStop={() => forceRef.current.zoomToFit(400)}
    
            //nodeLabel={n => nodeHoverFunc(n)}
            onNodeClick = {node => handleNodeClick(node)}
            onLinkClick = {l => handleLinkClick(l)}
            onBackgroundClick = {i => handleBackgroundClick(i)}
            //onNodeRightClick={()=> setActive("NodeUpdate")}
    
            //onLinkClick={()=> setActive("LinkRead")}
            //onLinkRightClick={()=> setActive("LinkUpdate")}
            
            //onBackgroundClick={b => backgroundClickFunc(b)}
    
            linkCurvature="curvature"
            enablePointerInteraction={true}
            linkDirectionalParticleWidth={1}
    
            ref={forceRef}
            />

        </div>
    );
}

export default GraphComponent;

//{receivedData === "haveData" && <AddGraph inputs = {gotData}/>}
