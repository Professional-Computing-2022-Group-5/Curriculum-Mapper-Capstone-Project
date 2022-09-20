import React, { useRef, useEffect, useState, } from "react";
import ForceGraph2D from "react-force-graph-2d";
import {NodeCreate, LinkCreate} from "./createCommand.js";
import httpClient from "./httpClient.js";

var currentId;

//href="/query" - ONCE THE QUERY IS SAVE
const GraphComponent = ({data}) => {
    //-----------------------------------------------------------------------------------GLOBAL VARIABLES
    // WHICH CRUD COMMAND TO HAVE ON
    const [filterActive, setFilterActive] = useState("none")

    //-----------------------------------------------------------------------------------FORCEGRAPH2D ELEMENT

    // FOR THE FORCEGRAPH2D ELEMENT
    const forceRef = useRef(null);
    useEffect(() => {
        forceRef.current.d3Force("charge").strength(-400);
    });

    //-----------------------------------------------------------------------------------FUNCTIONS
    // FIND THE NODE CORRESPONDING WITH THAT ID
    function searchforNode(searchId){
                for(var i=0; i<data.nodes.length; i++) {
                    if(data.nodes[i].id === searchId) {
                        return data.nodes[i];
                    }
                    }
    }

    // FIND THE LINK CORRESPONDING WITH THAT ID
    function searchforLink(searchId){
        for(var j=0; j<data.links.length; j++) {
            console.log("LOOKING AT LINK INDEX" + j)
            if(data.links[j].property.id === searchId) {
                console.log("in IF" + data.links[j].property.id)
                return data.links[j];
            }
            }
    }

    // DELETE NODE CRUD COMMAND POST
    const deleteNode = async (id) => {
        console.log("please delete node")
        console.log(id)
        try {
            const dbData = await httpClient.post("//localhost:5000/nodeDelete", {
                id
            });

            console.log("DBDATA _ GRAPH COMP.js")
            console.log(dbData.data)
            if (dbData.data !== undefined){
                console.log("IN FINALLY")

            }
        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Node Delete");
            }
        } 
    }

    // UPDATE NODE CRUD COMMAND POST
    const sendNodeUpdate = async (inputs, id) => {
        console.log(inputs, id);
        try {
            const dbData = await httpClient.post("//localhost:5000/nodeUpdate", {
                inputs
            });

            console.log("DBDATA _ GRAPH COMP.js")
            console.log(dbData.data)
            if (dbData.data !== undefined){
                console.log("IN FINALLY")

            }
        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Node Update");
            }
        } 
    };

    // DELETE LINK CRUD COMMAND POST
    const deleteLink = async (id) => {
        console.log("please delete link")
        console.log(id)
        try {
            const dbData = await httpClient.post("//localhost:5000/linkDelete", {
                id
            });

            console.log("DBDATA _ GRAPH COMP.js")
            console.log(dbData.data)
            if (dbData.data !== undefined){
                console.log("IN FINALLY")
            }

        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Link Delete");
            }
        } 
    }

    // UPDATE LINK CRUD COMMAND POST
    const sendLinkUpdate = async (source, target, id) => {
        console.log("source ----")
        console.log(source)
        console.log("targe----t")
        console.log(target)
        console.log("id----")
        console.log(id)

        try {
            const dbData = await httpClient.post("//localhost:5000/linkUpdate", {
                source, target, id
            });

            console.log("DBDATA _ GRAPH COMP.js")
            console.log(dbData.data)
            if (dbData.data !== undefined){
                console.log("IN FINALLY")

            }
        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Link Update");
            }
        } 
    }

    // NODE MOUSE EVENT 
    function handleNodeClick(node){
        console.log(node.id)
        console.log(typeof(node.id))
        console.log(data.nodes.length)
        //setFilterActive({ ...filterActive, state:"NodeRead",id: node.id });
        currentId = node.id
        setFilterActive("NodeRead");
    }

    // LINK MOUSE EVENT
    function handleLinkClick(link){
        console.log("clicked on:" + link)
        console.log(typeof(link.property.id))
        console.log(data.links.length)
        //setFilterActive({ ...filterActive, state:"NodeRead",id: node.id });
        currentId = link.property.id
        console.log("current currentid = " + link.property.id)

        setFilterActive("LinkRead");
    }

    // BACKGROUND MOUSE EVENT
    function handleBackgroundClick(item){
        setFilterActive("Create");
    }

    //-----------------------------------------------------------------------------------COMPONENTS
    // READ NODE COMPONENT
    const NodeRead = () => {
        var unitnode = searchforNode(currentId)
        console.log(unitnode)
        //for 
        return ( 
            <div>
                <p>NODE READ</p>
                <p>{unitnode.unitCode}</p>
                <p>{unitnode.avaliabilities}</p>

                <button onClick={n => setFilterActive("NodeUpdate")}>Update</button>
                <button onClick={e => deleteNode(unitnode.id)}>Delete</button>
            </div>
        );
    }

    // UPDATE NODE COMPONENT
    const NodeUpdate = () => {

        var unitNode = searchforNode(currentId)

        const [nodeDetails, setNodeDetails] = useState(unitNode)
        console.log("nodeDetails")
        console.log(nodeDetails)
        return ( 
            <div>
                <p>NODE UPDATE</p>

                <label>
                node id:
                <input type="text" value={nodeDetails.id} onChange={(e)=> setNodeDetails({ ...nodeDetails, id: e.target.value })} />
                </label>
                <label>
                Unit Code:
                <input type="text" value={nodeDetails.unitCode} onChange={(e)=> setNodeDetails({ ...nodeDetails, unitCode: e.target.value })} />
                </label>
                <input type="submit" value="Submit" onClick={e => sendNodeUpdate(nodeDetails, unitNode.id)}/>
                <input type="submit" value="Delete" onClick={e => deleteNode(unitNode.id)}/>
            </div>
        );
    }

    // READ LINK COMPONENT
    const LinkRead = () => {
        console.log(data.links)
        console.log("1111"+currentId)
        console.log(data.links[0].property.id)
        var unitlink = searchforLink(currentId)
        console.log("got it:")
        console.log(unitlink)
        console.log("got it link id:")
        console.log(unitlink.property.id)
        console.log("got it source id:")
        console.log(unitlink.source.id)
        return ( 
            <div>
                <p>LINK READ</p>
                <p>Link Id: {unitlink.property.id}</p>
                <p>Source Unit Code: {unitlink.source.unitCode}</p>
                <p>Target Unit Code: {unitlink.target.unitCode}</p>
                <button onClick={n => setFilterActive("LinkUpdate")}>Update</button>
                <button onClick={e => deleteLink(unitlink.property.id)}>Delete</button>
            </div>
        );
    }

    // UPDATE LINK COMPONENT
    const LinkUpdate = () => {
        var unitLink = searchforLink(currentId)

        const [sourceDetails, setSourceDetails] = useState(unitLink.source)
        const [targetDetails, setTargetDetails] = useState(unitLink.target)
    
        return ( 
            <div>
                <p>LINK UPDATE</p>
                <label>
                source id:
                <input type="text" value={sourceDetails.id} onChange={(e)=> setSourceDetails({ ...sourceDetails, id: e.target.value })} />
                </label>
                <label>
                target id:
                <input type="text" value={targetDetails.id} onChange={(e)=> setTargetDetails({ ...targetDetails, id: e.target.value })} />
                </label>
                <button onClick={e => sendLinkUpdate(sourceDetails, targetDetails, unitLink.property.id)}>Submit</button>
                <button onClick={e => deleteLink(unitLink.property.id)}>Delete</button>
            </div>
        );
    }

    // CREATE NODE & LINK COMPONENT
    const Create = () => {
        return ( 
            <div>
                <p>CREATE</p>
                <button onClick= {n => setFilterActive("NodeCreate")}>Create Node</button>
                <button onClick= {n => setFilterActive("LinkCreate")}>Create Link</button>
            </div>
        );
    }


    //-----------------------------------------------------------------------------------RETURN
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
            graphData={data}
    
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
            onLinkClick = {link => handleLinkClick(link)}
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


