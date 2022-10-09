import React, { useRef, useEffect, useState, } from "react";

import ForceGraph2D from "react-force-graph-2d";
import httpClient from "./httpClient.js";
import Table from "react-bootstrap/Table";
//import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';

var currentId;
var searchSourceId;
var searchTargetId;
var chosenType;

// 1. To return all the labels from the graph ("request for node or relationship")
// 2. Once you have a label & know if it is a link or node, get its attributes

var nodeInputs =
{
    "Unit": ["Avaliabilities", "Credit", "Programming Based", "Title", "unitCode", "name"],
    "Top": ["name", "area"], "Sub": ["name", "area"], "End": ["name", "area"],
    "Outcome": ["name", "Description", "Level", "Outcome", "OutcomeId", "unitCode"],
    "AQFutcome": ["name", "aqfId", "description", "foreignKey"],
    "AQFcategory": ["name", "Category", "Description", "id", "programCode"]
}

var linkTypes = [
    "INCLUDE",
    "MUST_COMPLETE",
    "ADVISABLE_PRIOR_STUDY",
    "CHOICE",
    "CORE",
    "ACTIVITY_OF",
    "INCOMPATABLE_WITH",
    "CBOK_WEIGHTING"
]
const GraphComponent = ({ data }) => {
    //-----------------------------------------------------------------------------------GLOBAL VARIABLES
    // WHICH CRUD COMMAND TO HAVE ON
    const [filterActive, setFilterActive] = useState("none")
    const [searchActive, setSearchActive] = useState("no")
    //const [specificTable, setSpectificTable] = useState("Both")

    function refreshPage() {
        window.location.reload(false);
    }

    //-----------------------------------------------------------------------------------GET USER TYPE

    const [userType, setUserType] = useState("BasicUser");

    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");

                if (resp.data.isCoordinator === true) {
                    setUserType("UnitCoordinator")
                }
            } catch (error) {
                console.log("No Current User Logged In");
            }
        })();
    }, []);


    //-----------------------------------------------------------------------------------FORCEGRAPH2D ELEMENT

    // FOR THE FORCEGRAPH2D ELEMENT
    const forceRef = useRef(null);
    useEffect(() => {
        forceRef.current.d3Force("charge").strength(-400);
    });

    //-----------------------------------------------------------------------------------SEARCH FUNCTIONS
    // FIND THE NODE CORRESPONDING WITH THAT ID
    function searchforNode(searchId) {
        for (var i = 0; i < data.nodes.length; i++) {
            if (data.nodes[i].id === searchId) {
                return data.nodes[i];
            }
        }
    }

    // FIND THE LINK CORRESPONDING WITH THAT ID
    function searchforLink(searchId) {
        for (var j = 0; j < data.links.length; j++) {
            console.log("LOOKING AT LINK INDEX" + j)
            if (data.links[j].property.id === searchId) {
                console.log("in IF" + data.links[j].property.id)
                return data.links[j];
            }
        }
    }
    //-----------------------------------------------------------------------------------HELPER FUNCTIONS
    function getInputs(selectedType, type) {
        chosenType = selectedType;
        if (type === "NODE") {
            setFilterActive("NodeInputs");
        }
        if (type === "LINK") {
            setFilterActive("LinkInputs");
        }
    }
    //-----------------------------------------------------------------------------------REQUEST FUNCTIONS
    // CREATE NODE CRUD COMMAND POST
    const sendCreateNode = async (inputs) => {
        console.log("sending this data")
        console.log(inputs)

        try {
            const dbData = await httpClient.post("//localhost:5000/nodeCreate", {
                inputs
            });

            console.log("DBDATA _ GRAPH COMP.js")
            console.log(dbData.data)
            if (dbData.data !== undefined) {
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
            if (dbData.data !== undefined) {
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
            if (dbData.data !== undefined) {
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
            if (dbData.data !== undefined) {
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
            if (dbData.data !== undefined) {
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
            if (dbData.data !== undefined) {
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
    function handleNodeClick(node) {
        console.log(node.id)
        console.log(typeof (node.id))
        console.log(data.nodes.length)
        if (searchActive === "no") {
            //refreshPage();
            currentId = node.id
            setFilterActive("none");
            setFilterActive("NodeRead");
            // setSpectificTable("SpecificNode");
        }
        else if (searchActive === "source") {
            searchSourceId = node.id
            console.log("search for source")
        }
        else if (searchActive === "target") {
            searchTargetId = node.id
            console.log("search for target")
        }
        //setFilterActive({ ...filterActive, state:"NodeRead",id: node.id });
        //currentId = node.id
        // if (filterActive === "searchState")
        //setFilterActive("NodeRead");
    }

    // LINK MOUSE EVENT
    function handleLinkClick(link) {
        console.log("clicked on:" + link)
        console.log(typeof (link.property.id))
        console.log(data.links.length)
        //setFilterActive({ ...filterActive, state:"NodeRead",id: node.id });
        currentId = link.property.id
        console.log("current currentid = " + link.property.id)

        setFilterActive("LinkRead");
        //setSpectificTable("SpecificLink");
    }

    // BACKGROUND MOUSE EVENT
    function handleBackgroundClick(item) {
        setFilterActive("Create");
    }
    //-----------------------------------------------------------------------------------TABLE COMPONENTS
    /*
                    <tr>
                    {nHeadData.map(heading => {

                        {heading == "property" ? ( 
                            <div>
                                <th key={heading}>Id</th>
                            </div>)
                            :(<div><th key={heading}>{heading}</th></div>)}
                    
                    })}
                </tr>
    */

    const AllDataTable = () => {
        //change this to var nHeadData = ["id", "label", "displayName", "color"] when the backend workd
        var nHeadData = ["id", "unitCode", "title"]
        var nBodyData = data.nodes
        //console.log("nHEADDATE")
        //console.log(nHeadData)

        var lHeadData = ["id", "source", "target"]
        //var lBodyData = data.links

        var lBodyData = []

        for (var i = 0; i < data.links.length; i++) {
            lBodyData.push({
                "id": data.links[i].property.id,
                "source": data.links[i].source.id,
                "target": data.links[i].target.id
            })
        }

        console.log("lBodyData")
        console.log(lBodyData)

        return (
            <div>

                <h2> NODES </h2>
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            {nHeadData.map(heading => {
                                return <th key={heading}>{heading}</th>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {nBodyData.map((row, index) => {
                            return <tr key={index}>
                                {nHeadData.map((key) => {
                                    return <td key={row[key]}>{row[key]}</td>
                                })}
                            </tr>;
                        })}
                    </tbody>
                </Table>

                <h2>LINKS</h2>
                <Table responsive striped hover>

                    <thead>
                        <tr>
                            {lHeadData.map(heading => {
                                return <th key={heading}>{heading}</th>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {lBodyData.map((row, index) => {
                            return <tr key={index}>
                                {lHeadData.map((key) => {
                                    return <td key={row[key]}>{row[key]}</td>
                                })}
                            </tr>;
                        })}
                    </tbody>
                </Table>

            </div>
        );
    }
    //-----------------------------------------------------------------------------------COMPONENTS
    // READ NODE COMPONENT
    const NodeRead = () => {
        var unitnode = searchforNode(currentId)
        console.log(unitnode)
        var attributes = Object.keys(unitnode);
        var unnecessaryHeadings = ["x", "y", "vx", "vy", "fx", "fy"]

        for (let i = 0; i < unnecessaryHeadings.length; i++) {
            const index = attributes.indexOf(unnecessaryHeadings[i]);
            if (index > -1) { // only splice array when item is found
                attributes.splice(index, 1); // 2nd parameter means remove one item only
            }
        }

        //for 
        return (
            <div>
                <p>NODE READ</p>
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            {attributes.map((attribute) => (
                                <th>{attribute}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            {attributes.map((attribute) => (
                                <th>{unitnode[attribute]}</th>
                            ))}
                        </tr>
                    </tbody>
                </Table>


                {userType === "UnitCoordinator" ? (
                    <div>
                        <button onClick={n => setFilterActive("NodeUpdate")}>Update</button>
                        <button onClick={e => sendDeleteNode(unitnode.id)}>Delete</button></div>)
                    : (<div></div>)}

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
                            <input type="text" value={nodeDetails[attribute]} onChange={(e) => setNodeDetails({ ...nodeDetails, [attribute]: e.target.value })} />
                        </label>
                    </div>
                ))}
                <input type="submit" value="Submit" onClick={e => sendNodeUpdate(nodeDetails, unitNode.id)} />
                <input type="submit" value="Delete" onClick={e => sendDeleteNode(unitNode.id)} />
            </div>
        );
    }

    // READ LINK COMPONENT
    const LinkRead = () => {
        var unitlink = searchforLink(currentId)

        var properties = Object.keys(unitlink.property);
        var sourceProp = Object.keys(unitlink.source);
        var targetProp = Object.keys(unitlink.target);

        // can change type to label later on
        var headings = ["id", "type", "source", "target"]

        var bodyData = {
            "id": unitlink.property.id,
            "type": unitlink.property.type,
            "source": unitlink.source.id,
            "target": unitlink.target.id
        }

        //var lBodyData = []

        //for(var i = 0; i<unitlink.property.length; i++){
        //bodyData.push({
        //    "id": unitlink.property.id, 
        //    "source": data.links[i].source.id, 
        //    "target": data.links[i].target.id})
        //}

        return (
            <div>
                <h2>LINK READ</h2>
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            {headings.map((heading) => (
                                <th>{heading}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            {headings.map((heading) => (
                                <td>{bodyData[heading]}</td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
                <h2>SOURCE DATA</h2>
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            {sourceProp.map((property) => (
                                <th>{property}</th>
                            ))}

                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            {sourceProp.map((property) => (
                                <th>{unitlink.source[property]}</th>
                            ))}
                        </tr>
                    </tbody>
                </Table>

                <h2>TARGET DATA</h2>
                <Table responsive striped hover>
                    <thead>
                        <tr>

                            {targetProp.map((property) => (
                                <th>{property}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            {targetProp.map((property) => (
                                <th>{unitlink.target[property]}</th>
                            ))}
                        </tr>
                    </tbody>
                </Table>


                {userType === "UnitCoordinator" ? (
                    <div>
                        <button onClick={(n) => setFilterActive("LinkUpdate")}>Update</button>
                        <button onClick={(e) => sendDeleteLink(unitlink.property.id)}>Delete</button>
                    </div>)
                    : (<div></div>)}



            </div>
        );
    }

    // CREATE NODE INPUTS COMPONENT
    const NodeInputs = () => {
        console.log("__________")
        console.log(chosenType)
        var inputs = nodeInputs[chosenType];
        console.log(inputs)
        const [nodeDetails, setNodeDetails] = useState({ type: chosenType })

        return (
            <div>
                <p>NODE CREATE INPUTS</p>
                <label >Chosen Type: {nodeDetails.type}</label>

                {inputs.map((input) => (
                    <div>
                        <label>
                            {input}:
                            <input type="text" value={nodeDetails[input]} onChange={(e) => setNodeDetails({ ...nodeDetails, [input]: e.target.value })} />
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
        const [linkDetails, setLinkDetails] = useState({ type: chosenType })
        var inputs = ["X", "1", "2", "3"];

        return (
            <div>
                <label >Chosen Type: {linkDetails.type}</label>
                {(() => {
                    if (chosenType === 'CBOK_WEIGHTING') {
                        console.log("CBOK_WEIGHTING")
                        return (
                            <select
                                value={linkDetails.weight}
                                //onChange={e => setSelectedType(e.target.value)}>
                                onChange={(e) => setLinkDetails({ ...linkDetails, weight: e.target.value })}>
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

        function updateIds() {
            setSourceDetails({ ...sourceDetails, id: searchSourceId })
            setTargetDetails({ ...targetDetails, id: searchTargetId })
            setLinkDetails({ ...linkDetails, sourceId: searchSourceId, targetId: searchTargetId })
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
                            <input type="text" value={linkDetails[property]} onChange={(e) => setLinkDetails({ ...linkDetails, [property]: e.target.value })} />
                        </label>
                    </div>
                ))}

                <p>SOURCE UPDATE</p>
                <label>
                    Source Id:

                    <input type="text" value={sourceDetails.id} onChange={(e) => setSourceDetails({ ...sourceDetails, id: searchSourceId })} />
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
                    <input type="text" value={targetDetails.id} onChange={(e) => setTargetDetails({ ...targetDetails, id: searchTargetId })} />
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
                {userType === "UnitCoordinator" ? (
                    <div>
                        <p>CREATE</p>
                        <button onClick={n => setFilterActive("NodeCreate")}>Create Node</button>
                        <button onClick={n => setFilterActive("LinkCreate")}>Create Link</button>
                    </div>)
                    : (<div></div>)}

            </div>
        );
    }
    /* 
    
        const [show, setShow] = useState(false);
    
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true); */

    //-----------------------------------------------------------------------------------RETURN
    return (
        <div>

            {/*<Button variant="primary" onClick={handleShow} className="my-modal">
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="false">
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal> */}


            <div className="container-fluid row xs=2 md=2 lg=2">
                <div className="col">
                    <ForceGraph2D
                        graphData={data}

                        width={window.innerWidth * 0.6}
                        height={window.innerHeight * 0.8}

                        //nodeColor = {color}
                        nodeLabel={'id'}
                        //nodeThreeObjectExtend={true}
                        nodeCanvasObject={(node, ctx, globalScale) => {
                            const label = node.id;
                            const fontSize = 12 / globalScale;
                            //ctx.font = ${fontSize}px Sans-Serif`;
                            ctx.beginPath();
                            ctx.arc(node.x, node.y, fontSize, 0, 2 * Math.PI, false);
                            ctx.fillStyle = "blue";
                            ctx.fill();
                            ctx.font = `${fontSize}px Sans-Serif`;
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = 'white'; //node.color;
                            ctx.fillText(label, node.x, node.y);
                        }}
                        //; inkDirectionalArrowRelPos={1}

                        /*linkCanvasObject={(link, ctx, globalScale) => {
                            const label = link.source
                            const fontSize = 12 / globalScale;
                            ctx.font = `${fontSize}px Sans-Serif`;
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = 'black'; //node.color;
                            ctx.fillText(label, link.x, link.y);
                        }}*/

                        //linkCanvasObjectMode={(() => 'after')}
                        linkCanvasObject={((link, ctx, globalScale) => {
                            const MAX_FONT_SIZE = 4;
                            //  const LABEL_NODE_MARGIN = Graph.nodeRelSize() * 1.5;

                            const start = link.source;
                            const end = link.target;

                            // ignore unbound links
                            if (typeof start !== 'object' || typeof end !== 'object') return;

                            // calculate label positioning
                            const textPos = Object.assign(...['x', 'y'].map(c => ({
                                [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                            })));

                            const relLink = { x: end.x - start.x, y: end.y - start.y };
                            const maxTextLength = Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) //- LABEL_NODE_MARGIN * 2;

                            let textAngle = Math.atan2(relLink.y, relLink.x);
                            // maintain label vertical orientation for legibility
                            if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
                            if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

                            const label = `${link.source.id} > ${link.target.id}`;

                            // estimate fontSize to fit in link length
                            ctx.font = '1px Sans-Serif';
                            //const fontSize = 12 / globalScale;
                            const fontSize = Math.min(MAX_FONT_SIZE, maxTextLength / ctx.measureText(label).width);
                            ctx.font = `${fontSize}px Sans-Serif`;
                            const textWidth = ctx.measureText(label).width;
                            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                            // draw text label (with background rect)
                            ctx.save();
                            ctx.translate(textPos.x, textPos.y);
                            ctx.rotate(textAngle);
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                            ctx.fillRect(- bckgDimensions[0] / 2, - bckgDimensions[1] / 2, ...bckgDimensions);
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = 'blue';
                            ctx.fillText(label, 0, 0);
                            ctx.restore();
                        })}
                        //linkWidth={3}
                        //linkColor={'black'}

                        linkDirectionalArrowLength={6}
                        //linkDirectionalArrowColor={'black'}
                        linkDirectionalArrowRelPos={1}

                        // backgroundColor="white"

                        onNodeDragEnd={node => {
                            node.fx = node.x;
                            node.fy = node.y;
                            node.fz = node.z;
                        }}

                        cooldownTicks={100}
                        onEngineStop={() => forceRef.current.zoomToFit(400)}

                        //nodeLabel={n => nodeHoverFunc(n)}
                        onNodeClick={node => handleNodeClick(node)}
                        onLinkClick={link => handleLinkClick(link)}
                        onBackgroundClick={i => handleBackgroundClick(i)}
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

                <div className="col col-lg-3">

                    {filterActive === "NodeRead" && <NodeRead />}
                    {filterActive === "LinkRead" && <LinkRead />}
                    {filterActive === "Create" && <Create />}

                    {filterActive === "NodeUpdate" && <NodeUpdate />}
                    {filterActive === "NodeCreate" && <NodeCreate />}
                    {filterActive === "NodeInputs" && <NodeInputs />}
                    {filterActive === "LinkUpdate" && <LinkUpdate />}
                    {filterActive === "LinkCreate" && <LinkCreate />}
                    {filterActive === "LinkInputs" && <LinkInputs />}

                    {filterActive === "none" && <AllDataTable />}
                </div>
            </div>

        </div>
    );
}

export default GraphComponent;


