import React, { useRef, useEffect, useState, } from "react";
import ForceGraph2D from "react-force-graph-2d";
import httpClient from "./httpClient.js";

var currentId;

var searchSourceId;
var searchTargetId;
var chosenType;

var nodeInputs =   
    {"Unit": ["Avaliabilities", "Credit", "Programming Based", "Title", "unitCode"], 
    "CBoK - Top": ["area"], "CBoK - Sub": ["area"], "CBoK - End": ["area"],
    "Outcome": ["Description", "Level", "Outcome", "OutcomeId", "unitCode"],
    "AQF Outcome": ["aqfId", "description", "foreignKey"],
    "AQF Category": ["Category", "Description", "id", "programCode"]}

var linkTypes = [
    "INCLUDE", 
    "MUST_COMPLETE", 
    "ADVISABLE_PRIOR_STUDY", 
    "CHOICE", 
    "ACTIVITY_OF", 
    "INCOMPATABLE_WITH", 
    "CBOK_WEIGHTING"
]
const GraphComponent = ({data}) => {
    //-----------------------------------------------------------------------------------GLOBAL VARIABLES
    // WHICH CRUD COMMAND TO HAVE ON
    const [filterActive, setFilterActive] = useState("none")
    const [searchActive, setSearchActive] = useState("no")

    //-----------------------------------------------------------------------------------FORCEGRAPH2D ELEMENT

    // FOR THE FORCEGRAPH2D ELEMENT
    const forceRef = useRef(null);
    useEffect(() => {
        forceRef.current.d3Force("charge").strength(-400);
    });

    //-----------------------------------------------------------------------------------SEARCH FUNCTIONS
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
    //-----------------------------------------------------------------------------------HELPER FUNCTIONS
    function getInputs(selectedType, type){
        chosenType = selectedType;
        if (type === "NODE"){
            setFilterActive("NodeInputs");
        }
        if (type === "LINK"){
            setFilterActive("LinkInputs");
        }
    }
    //-----------------------------------------------------------------------------------REQUEST FUNCTIONS
    // CREATE NODE CRUD COMMAND POST
    const sendCreateNode = async (inputs) => {
        console.log("sending this data")
        console.log(data)
    
        try {
            const dbData = await httpClient.post("//localhost:5000/nodeCreate", {
                inputs
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

    // CREATE LINK CRUD COMMAND POST
    const sendCreateLink = async (inputs) => {
        console.log("sending this data")
        console.log(inputs)

        try {
            const dbData = await httpClient.post("//localhost:5000/linkCreate", {
                inputs
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

    // DELETE NODE CRUD COMMAND POST
    const sendDeleteNode = async (id) => {
        console.log("please delete node")
        console.log(id)
        try {
            const dbData = await httpClient.post("//localhost:5000/delete_entity", {
                id,
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

    // DELETE LINK CRUD COMMAND POST
    const sendDeleteLink = async (id) => {
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

    // UPDATE NODE CRUD COMMAND POST
    const sendNodeUpdate = async (inputs, id) => {
        console.log(inputs, id);
        try {
            const dbData = await httpClient.post("//localhost:5000/nodeUpdate", {
                inputs // {"avaliability":"fssfds", "unitCode":32454}
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

    // UPDATE LINK CRUD COMMAND POST
    const sendLinkUpdate = async (link, id) => {

        console.log("link----t")
        console.log(link)
        console.log("id----")
        console.log(id)

        try {
            const dbData = await httpClient.post("//localhost:5000/linkUpdate", {
                link, id
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

    //-----------------------------------------------------------------------------------MOUSE EVENT FUNCTIONS
    // NODE MOUSE EVENT 
    function handleNodeClick(node){
        console.log(node.id)
        console.log(typeof(node.id))
        console.log(data.nodes.length)
        if (searchActive === "no"){
            currentId = node.id
            setFilterActive("NodeRead");
        }
        else if (searchActive === "source"){
            searchSourceId = node.id
            console.log("search for source")
        }
        else if (searchActive === "target"){
            searchTargetId = node.id
            console.log("search for target")
        }
        //setFilterActive({ ...filterActive, state:"NodeRead",id: node.id });
        //currentId = node.id
        // if (filterActive === "searchState")
        //setFilterActive("NodeRead");
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
        var attributes = Object.keys(unitnode);

        //for 
        return ( 
            <div>
                <p>NODE READ</p>
                {attributes.map((attribute) => (
                    <p>{attribute}: {unitnode[attribute]}</p>

                ))}

                <button onClick={n => setFilterActive("NodeUpdate")}>Update</button>
                <button onClick={e => sendDeleteNode(unitnode.id)}>Delete</button>
            </div>
        );
    }

    // UPDATE NODE COMPONENT
    const NodeUpdate = () => {
        var unitNode = searchforNode(currentId)
        var attributes = Object.keys(unitNode);

        const index = attributes.indexOf("id");
        if (index > -1) { // only splice array when item is found
            attributes.splice(index, 1); // 2nd parameter means remove one item only
        }

        const [nodeDetails, setNodeDetails] = useState(unitNode)
        console.log("nodeDetails")
        console.log(nodeDetails)
        return ( 
            <div>
                <p>NODE UPDATE</p>

                <p>Node id: {nodeDetails.id}</p>
                {attributes.map((attribute) => (
                    <div>
                    <label>
                        {attribute}:
                    <input type="text" value={nodeDetails[attribute]} onChange={(e)=> setNodeDetails({ ...nodeDetails, [attribute]: e.target.value })} />
                    </label>
                    </div>
                ))}
                <input type="submit" value="Submit" onClick={e => sendNodeUpdate(nodeDetails, unitNode.id)}/>
                <input type="submit" value="Delete" onClick={e => sendDeleteNode(unitNode.id)}/>
            </div>
        );
    }

    // READ LINK COMPONENT
    const LinkRead = () => {
        var unitlink = searchforLink(currentId)

        var properties = Object.keys(unitlink.property);
        var sourceProp = Object.keys(unitlink.source);
        var targetProp = Object.keys(unitlink.target);

        return ( 
            <div>
                <p>LINK READ</p>

                <p>PROPERTIES</p>
                {properties.map((property) => (
                    <p>{property}: {unitlink.property[property]}</p>

                ))}

                <p>SOURCE</p>
                {sourceProp.map((source) => (
                    <p>{source}: {unitlink.source[source]}</p>

                ))}

                <p>TARGET</p>
                {targetProp.map((target) => (
                    <p>{target}: {unitlink.target[target]}</p>

                ))}

                <button onClick={n => setFilterActive("LinkUpdate")}>Update</button>
                <button onClick={e => sendDeleteLink(unitlink.property.id)}>Delete</button>
            </div>
        );
    }

    // CREATE NODE INPUTS COMPONENT
    const NodeInputs = () => {
        console.log("__________")
        console.log(chosenType)
        var inputs = nodeInputs[chosenType];
        console.log(inputs)
        const [nodeDetails, setNodeDetails] = useState({type: chosenType})

        return ( 
            <div>
            <p>NODE CREATE INPUTS</p>
            <label >Chosen Type: {nodeDetails.type}</label>

            {inputs.map((input) => (
                <div>
                <label>
                    {input}:
                <input type="text" value={nodeDetails[input]} onChange={(e)=> setNodeDetails({ ...nodeDetails, [input]: e.target.value })} />
                </label>
                </div>
            ))}
            <button onClick={e => sendCreateNode(nodeDetails)}>Submit</button>
            </div>
        );
    }

    // CREATE NODE COMPONENT
    const NodeCreate = () => {
        var nodeTypeInputs = Object.keys(nodeInputs);
        const [selectedType, setSelectedType] = useState(nodeTypeInputs[0]);

        return ( 
            <div>
                <p>NODE CREATE</p>
                <select
                    value={selectedType}
                    //onChange={e => setSelectedType(e.target.value)}>
                    onChange={(e) => setSelectedType(e.target.value)}>
                    {nodeTypeInputs.map((type) => (
                        <option key={type} value={type}>{type}</option>
                        ))}
                </select>
                <button onClick={e => getInputs(selectedType, "NODE")}>Submit</button>

            </div>
        );
    }

    // CREATE LINK INPUTS COMPONENT
    const LinkInputs = () => {
        const [linkDetails, setLinkDetails] = useState({type: chosenType})
        var inputs = ["X", "1", "2", "3"];

        return ( 
        <div>
            <label >Chosen Type: {linkDetails.type}</label>
            {(() => {
                if (chosenType === 'CBOK_WEIGHTING'){
                    console.log("CBOK_WEIGHTING")
                    return (
                        <select
                            value={linkDetails.weight}
                            //onChange={e => setSelectedType(e.target.value)}>
                            onChange={(e) => setLinkDetails({ ...linkDetails, weight: e.target.value})}>
                            {inputs.map((weight) => (
                                <option key={weight} value={weight}>{weight}</option>
                                ))}
                        </select>
                    )
                }
                return null;
            })()}
            <label>
                source id: {linkDetails.sourceId} 
            </label>
            <label>
                target id: {linkDetails.targetId}
            </label>
            
        
            <button onClick={(e) => setSearchActive("source")}>Select Source</button>
            <button onClick={(e) => setSearchActive("target")}>Select Destination</button>
            <button onClick={(e) => setLinkDetails({ ...linkDetails, sourceId: searchSourceId, targetId: searchTargetId })}>Confirm Source and Target</button>

            <button onClick={e => sendCreateLink(linkDetails)}>Submit</button>
        </div>
        );
    }

    // CREATE LINK COMPONENT
    const LinkCreate = () => {
        const [selectedType, setSelectedType] = useState(linkTypes[0]);

        console.log(linkTypes)

        return ( 
            <div>
                <p>LINK CREATE</p>
                    <select
                        value={selectedType}
                        //onChange={e => setSelectedType(e.target.value)}>
                        onChange={(e) => setSelectedType(e.target.value)}>
                        {linkTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                            ))}
                    </select>

                    <button onClick={e => getInputs(selectedType, "LINK")}>Submit</button>
                
            </div>
        );
    }

    // UPDATE LINK COMPONENT
    const LinkUpdate = () => {
        var unitLink = searchforLink(currentId)

        const [sourceDetails, setSourceDetails] = useState(unitLink.source)
        const [targetDetails, setTargetDetails] = useState(unitLink.target)
        const [linkDetails, setLinkDetails] = useState(unitLink.property)

        var properties = Object.keys(unitLink.property);
        var sourceProp = Object.keys(unitLink.source);
        var targetProp = Object.keys(unitLink.target);

        searchSourceId = sourceDetails.id
        searchTargetId = targetDetails.id
        
        function updateIds(){
            setSourceDetails({ ...sourceDetails, id: searchSourceId })
            setTargetDetails({ ...targetDetails, id: searchTargetId })
            setLinkDetails({ ...linkDetails, sourceId: searchSourceId, targetId: searchTargetId})
        }

        const index = properties.indexOf("id");
        if (index > -1) { // only splice array when item is found
            properties.splice(index, 1); // 2nd parameter means remove one item only
        }

        return ( 
            <div>
                <p>LINK UPDATE</p>

                <p>Link id: BUTTON HERE {linkDetails.id}</p>

                <p>PROPERTY UPDATE</p>
                {properties.map((property) => (
                    <div>
                    <label>
                        {property}:
                    <input type="text" value={linkDetails[property]} onChange={(e)=> setLinkDetails({ ...linkDetails, [property]: e.target.value })} />
                    </label>
                    </div>
                ))}

                <p>SOURCE UPDATE</p>
                <label>
                        Source Id:

                    <input type="text" value={sourceDetails.id} onChange={(e)=> setSourceDetails({ ...sourceDetails, id: searchSourceId })} />
                </label>
                        
                <button onClick={(e) => setSearchActive("source")}>Select Source</button>

                {sourceProp.map((sProperty) => (
                    <div>
                    <p>{sProperty}: {sourceDetails[sProperty]}</p>
                    </div>
                ))}

                <p>TARGET UPDATE</p>
                <label>
                        Target Id:
                    <input type="text" value={targetDetails.id} onChange={(e)=> setTargetDetails({ ...targetDetails, id: searchTargetId })} />
                </label>

                <button onClick={(e) => setSearchActive("target")}>Select Destination</button>

                {targetProp.map((tProperty) => (
                    <div>
                    <p>{tProperty}: {targetDetails[tProperty]}</p>
                    </div>
                ))}

                <button onClick={(e) => updateIds()}>Confirm Source and Target</button>
                <button onClick={e => sendLinkUpdate(linkDetails, unitLink.property.id)}>Submit</button>
                <button onClick={e => sendDeleteLink(unitLink.property.id)}>Delete</button>
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
        {filterActive ===  "NodeInputs" && <NodeInputs/>}
        {filterActive ===  "LinkUpdate" && <LinkUpdate/>}
        {filterActive ===  "LinkCreate" && <LinkCreate/>}
        {filterActive ===  "LinkInputs" && <LinkInputs/>}

        <ForceGraph2D
            graphData={data}
    
            width = {window.innerWidth*0.6}
            height = {window.innerHeight*0.8}
    
            //nodeColor = {color}
            //nodeLabel = {displayName}
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


