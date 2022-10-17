import React, { useRef, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import PropTypes from "prop-types";

import ForceGraph2D from "react-force-graph-2d";
import httpClient from "./httpClient.js";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AllDataTable from "./allDataTable.jsx";
import Col from "react-bootstrap/Col";
import { IconContext } from "react-icons";

import { ImTable } from "react-icons/im";
import { FaFileCsv } from "react-icons/fa";

var currentId;
var searchSourceId;
var searchTargetId;
var chosenType;

var nodeInputs = {
  Unit: [
    "Availabilities",
    "Credit",
    "Programming Based",
    "Title",
    "unitCode",
    "name",
  ],
  Top: ["name", "area"],
  Sub: ["name", "area"],
  End: ["name", "area"],
  Outcome: ["name", "Description", "Level", "Outcome", "OutcomeId", "unitCode"],
  AQFutcome: ["name", "aqfId", "description", "foreignKey"],
  AQFcategory: ["name", "Category", "Description", "id", "programCode"],
};

var linkTypes = [
  "INCLUDE",
  "MUST_COMPLETE",
  "ADVISABLE_PRIOR_STUDY",
  "CHOICE",
  "CORE",
  "ACTIVITY_OF",
  "INCOMPATABLE_WITH",
  "CBOK_WEIGHTING",
];

const queryDisplay = ({ data }) => {

  //-----------------------------------------------------------------------------------GLOBAL VARIABLES
  // WHICH CRUD COMMAND TO HAVE ON

  const [filterActive, setFilterActive] = useState("none");
  const [searchActive, setSearchActive] = useState("no");

  const [tableActive, setTableActive] = useState(false);
  const [crudActive, setCrudActive] = useState(false);
  //const [allTable, setAllTable] = useState(true);

  const closeTable = () => {
    setTableActive(false);
  };
  const toggleTable = () => {
    setTableActive((s) => !s);
    setCrudActive(false);
  };

  const closeCrudTable = () => {
    setCrudActive(false);
  };

  const [seed, setSeed] = useState(1);

  const reset = () => {
    setSeed(Math.random());
  };

  const [showDelNode, setDelNodeShow] = useState(false);
  const [showDelLink, setDelLinkShow] = useState(false);

  const handleDelNodeClose = () => {
      setDelNodeShow(false);
  };
  
  const handleDelNodeShow = (id) => {
      setDelNodeShow(true);
      console.log("CHECK HERE_______________________\n\n\n")
      console.log(id);
  };

  const handleDelLinkClose = () => {
      setDelLinkShow(false);
  };
  const handleDelLinkShow = (id) => {
      setDelLinkShow(true);
  };

  //-----------------------------------------------------------------------------------GET USER TYPE

  const [userType, setUserType] = useState("BasicUser");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");

        if (resp.data.isCoordinator === true) {
          setUserType("UnitCoordinator");
        }

        if (resp.data.loggedIn === true) {
          setUserLoggedIn(true);
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
    forceRef.current.d3Force("charge").strength(-100);
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
      console.log("LOOKING AT LINK INDEX" + j);
      if (data.links[j].property.id === searchId) {
        console.log("in IF" + data.links[j].property.id);
        return data.links[j];
      }
    }
  }
  //-----------------------------------------------------------------------------------HELPER FUNCTIONS
  function getInputs(selectedType, type) {
    chosenType = selectedType;
    console.log(chosenType);
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
    console.log("sending this data");
    console.log(inputs);

    try {
      const dbData = await httpClient.post("//localhost:5000/nodeCreate", {
        inputs,
      });

      console.log("DBDATA _ GRAPH COMP.js");
      console.log(dbData.data);
      if (dbData.data !== undefined) {
        console.log("IN FINALLY");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid Node Create");
      }
    }
  };

  // CREATE LINK CRUD COMMAND POST
  const sendCreateLink = async (inputs) => {
    console.log("sending this data");
    console.log(inputs);

    try {
      const dbData = await httpClient.post("//localhost:5000/linkCreate", {
        inputs,
      });

      console.log("DBDATA _ GRAPH COMP.js");
      console.log(dbData.data);
      if (dbData.data !== undefined) {
        console.log("IN FINALLY");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid Link Create");
      }
    }
  };

  // DELETE NODE CRUD COMMAND POST
  const sendDeleteNode = async (id) => {
    console.log("please delete node");
    console.log(id);
    try {
      const dbData = await httpClient.post("//localhost:5000/delete_entity", {
        id,
      });

      console.log("DBDATA _ GRAPH COMP.js");
      console.log(dbData.data);
      if (dbData.data !== undefined) {
        console.log("IN FINALLY");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid Node Delete");
      }
    }
  };

  // DELETE LINK CRUD COMMAND POST
  const sendDeleteLink = async (id) => {
    console.log("please delete link");
    console.log(id);
    try {
      const dbData = await httpClient.post("//localhost:5000/linkDelete", {
        id,
      });

      console.log("DBDATA _ GRAPH COMP.js");
      console.log(dbData.data);
      if (dbData.data !== undefined) {
        console.log("IN FINALLY");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid Link Delete");
      }
    }
  };

  // UPDATE NODE CRUD COMMAND POST
  const sendNodeUpdate = async (inputs, id) => {
    console.log(inputs, id);
    try {
      const dbData = await httpClient.post("//localhost:5000/nodeUpdate", {
        inputs, // {"avaliability":"fssfds", "unitCode":32454}
      });

      console.log("DBDATA _ GRAPH COMP.js");
      console.log(dbData.data);
      if (dbData.data !== undefined) {
        console.log("IN FINALLY");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid Node Update");
      }
    }
  };

  // UPDATE LINK CRUD COMMAND POST
  const sendLinkUpdate = async (link, id) => {
    console.log("link----t");
    console.log(link);
    console.log("id----");
    console.log(id);

    try {
      const dbData = await httpClient.post("//localhost:5000/linkUpdate", {
        link,
        id,
      });

      console.log("DBDATA _ GRAPH COMP.js");
      console.log(dbData.data);
      if (dbData.data !== undefined) {
        console.log("IN FINALLY");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid Link Update");
      }
    }
  };

  //-----------------------------------------------------------------------------------MOUSE EVENT FUNCTIONS
  // NODE MOUSE EVENT
  function handleNodeClick(node) {
    console.log(node.id);
    console.log(typeof node.id);
    console.log(data.nodes.length);
    if (searchActive === "no") {
      //refreshPage();
      currentId = node.id;
      setFilterActive("none");
      setFilterActive("NodeRead");
      setCrudActive((s) => !s);
      setTableActive(false);
      reset();
      // setSpectificTable("SpecificNode");
    } else if (searchActive === "source") {
      searchSourceId = node.id;
      console.log("search for source");
      reset();
    } else if (searchActive === "target") {
      searchTargetId = node.id;
      console.log("search for target");
      reset();
    }
    //setFilterActive({ ...filterActive, state:"NodeRead",id: node.id });
    //currentId = node.id
    // if (filterActive === "searchState")
    //setFilterActive("NodeRead");
  }

  // LINK MOUSE EVENT
  function handleLinkClick(link) {
    console.log("clicked on:" + link);
    console.log(typeof link.property.id);

    console.log(data.links.length);
    //setFilterActive({ ...filterActive, state:"NodeRead",id: node.id });
    currentId = link.property.id;
    console.log("current currentid = " + link.property.id);
    setCrudActive((s) => !s);
    setTableActive(false);
    setFilterActive("LinkRead");
    reset();
    //setSpectificTable("SpecificLink");
  }

  // BACKGROUND MOUSE EVENT
  function handleBackgroundClick(item) {
    setFilterActive("Create");
    setCrudActive((s) => !s);
    setTableActive(false);
    reset();
  }

  //-----------------------------------------------------------------------------------COMPONENTS
  
  // DELETE NODE MODAL
  const DelNode = (id) => {
    return(
    <Modal
    show={showDelNode}
    onHide={handleDelNodeClose}
    animation={true}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    backdrop="static"
    keyboard={false}
    centered>
      <Modal.Header closeButton centered>
        <Modal.Title><h2>Delete Node?</h2></Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Container>
        <Row>
          <Col></Col>
          <Col>
          <Button variant="uwa" onClick={handleDelNodeClose}>
            Cancel
          </Button>
          </Col>

          <Col>
          <Button variant="uwa" onClick={() => sendDeleteNode(id.id)}>
            Delete
          </Button>
          </Col>
          <Col></Col>

        </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );};

  //DELETE LINK MODAL
  const DelLink = (id) => {
    return(
    <Modal
    show={showDelLink}
    onHide={handleDelLinkClose}
    animation={true}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    backdrop="static"
    keyboard={false}
    centered>
      <Modal.Header closeButton centered>
        <Modal.Title><h2>Delete Link?</h2></Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Container>
        <Row>
          <Col></Col>
          <Col>
          <Button variant="uwa" onClick={handleDelLinkClose}>
            Cancel
          </Button>
          </Col>

          <Col>
          <Button variant="uwa" onClick={() => sendDeleteLink(id.id)}>
            Delete
          </Button>
          </Col>
          <Col></Col>

        </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );};


  // READ NODE COMPONENT
  const NodeRead = () => {
    var unitnode = searchforNode(currentId);
    console.log(unitnode);
    var attributes = Object.keys(unitnode);
    var unnecessaryHeadings = [
      "availabilities",
      "__indexColor",
      "index",
      "x",
      "y",
      "vx",
      "vy",
      "fx",
      "fy",
    ];

    for (let i = 0; i < unnecessaryHeadings.length; i++) {
      const index = attributes.indexOf(unnecessaryHeadings[i]);
      if (index > -1) {
        // only splice array when item is found
        attributes.splice(index, 1); // 2nd parameter means remove one item only
      }
    }

    //for
    return (
      <Container>
        <Row>
          <h2>NODE READ</h2>
        </Row>

        <Row>
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
        </Row>

        {userType === "UnitCoordinator" ? (
          <Row>
            <Col></Col>
            <Col sm="auto" md="auto" lg="auto">
              <Button variant="uwa"
                onClick={(n) => setFilterActive("NodeUpdate")}>
                Update
              </Button>
            </Col>

            <Col sm="auto" md="auto" lg="auto">
            <Button variant="uwa" onClick={(e) => sendDeleteNode(unitnode.id)}>
              Delete
            </Button>
            </Col>
            <Col></Col>
          </Row>
        ) : (
          <Row></Row>
        )}

      <DelNode id={unitnode.id}/>

      </Container>

    );
  };

  /*                {userType === "UnitCoordinator" ? (
                    <div>
                        <Button variant="uwa" onClick={n => setFilterActive("NodeUpdate")}>Update</Button>
                        <Button variant="uwa" onClick={e => sendDeleteNode(unitnode.id)}>Delete</Button></div>)
                    : (<div></div>)}

            </div>
        ); */

  // UPDATE NODE COMPONENT
  const NodeUpdate = () => {
    var unitNode = searchforNode(currentId);
    var attributes = Object.keys(unitNode);

    const index = attributes.indexOf("id");
    if (index > -1) {
      // only splice array when item is found
      attributes.splice(index, 1); // 2nd parameter means remove one item only
    }

    const [nodeDetails, setNodeDetails] = useState(unitNode);
    console.log("nodeDetails");
    console.log(nodeDetails);
    return (
      <Container>
        <h2>NODE UPDATE</h2>

        <p className="txt-ctr"><b>Node id:</b> {nodeDetails.id}</p>

        <Form><Form.Group as={Row} className="mb-3">
          {attributes.map((attribute) => (
            <Row>
              <Col sm="auto" md={4} lg={4}>
                <Form.Label><b>{attribute}:</b></Form.Label>
              </Col>

              <Col>
                <Form.Control
                  // className = "mb-3"
                  value={nodeDetails[attribute]}
                  onChange={(e) =>
                    setNodeDetails({
                      ...nodeDetails,
                      [attribute]: e.target.value,
                    })} />
              </Col>
            </Row>
          ))}
        </Form.Group></Form>

        <Row>
        <Col></Col>
        <Col sm="auto" md="auto" lg="auto">
        <Button variant="uwa"
          value="Submit"
          onClick={(e) => sendNodeUpdate(nodeDetails, unitNode.id)}>
        Submit</Button>
        </Col>

        <Col sm="auto" md="auto" lg="auto">
        <Button variant="uwa"
          value="Delete"
          onClick={(e) => sendDeleteNode(unitNode.id)}>
        Delete</Button>
        </Col>
        <Col></Col>
        </Row>
      
      <DelNode id={unitNode.id}/>
      </Container>

    );
  };

  // READ LINK COMPONENT
  const LinkRead = () => {
    var unitlink = searchforLink(currentId);

    //var properties = Object.keys(unitlink.property);
    //var sourceProp = Object.keys(unitlink.source);
    //var targetProp = Object.keys(unitlink.target);

    // Link Properties
    var linkHeadings = ["id", "type", "source", "target"]; // can change type to label later on

    var linkBodyData = {
      id: unitlink.property.id,
      type: unitlink.property.type,
      source: unitlink.source.id,
      target: unitlink.target.id,
    };

    // Source Properties
    var sourceHeadings = ["id", "unitCode", "title", "type"]; // can change type to label later on

    var sourceBodyData = {
      id: unitlink.source.id,
      unitCode: unitlink.source.unitCode,
      title: unitlink.source.title,
      type: unitlink.source.type,
    };

    // Target Properties
    var targetHeadings = ["id", "type", "unitCode", "level", "outcome"]; // can change type to label later on

    var targetBodyData = {
      id: unitlink.target.id,
      type: unitlink.target.type,
      unitCode: unitlink.target.unitCode,
      level: unitlink.target.level,
      outcome: unitlink.target.outcome,
    };

    function handleUpdateLink() {
      setFilterActive("LinkUpdate");
      searchSourceId = unitlink.source.id;
      searchTargetId = unitlink.target.id;
    }
    return (
      <Container>
        <Row><h2>LINK READ</h2></Row>

        <Row>
          <Table responsive striped hover>
            <thead>
              <tr>
                {linkHeadings.map((heading) => (
                  <th>{heading}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                {linkHeadings.map((heading) => (
                  <td>{linkBodyData[heading]}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Row>

        <Row><h2>SOURCE DATA</h2></Row>

        <Row>
          <Table responsive striped hover>
            <thead>
              <tr>
                {sourceHeadings.map((heading) => (
                  <th>{heading}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                {sourceHeadings.map((heading) => (
                  <td>{sourceBodyData[heading]}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Row>

        <Row><h2>TARGET DATA</h2></Row>

        <Row>
          <Table responsive striped hover>
            <thead>
              <tr>
                {targetHeadings.map((heading) => (
                  <th>{heading}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                {targetHeadings.map((heading) => (
                  <td>{targetBodyData[heading]}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Row>

        {userType === "UnitCoordinator" ? (
          <Row>
            <Col></Col>
            <Col sm="auto" md="auto" lg="auto">
              <Button variant="uwa" onClick={(n) => handleUpdateLink()}>
                Update
              </Button>
            </Col>

            <Col sm="auto" md="auto" lg="auto">
            <Button variant="uwa"
              onClick={(e) => sendDeleteLink(unitlink.property.id)}>
              Delete
            </Button>
            </Col>
            <Col></Col>
          </Row>
        ) : (
          <Row></Row>
        )}
    
      <DelLink id={unitlink.property.id}/>

      </Container>
    );
  };

  // CREATE NODE INPUTS COMPONENT
  const NodeInputs = () => {
    console.log("__________");
    console.log(chosenType);
    var inputs = nodeInputs[chosenType];
    console.log(inputs);
    const [nodeDetails, setNodeDetails] = useState({ type: chosenType });

    return (
      <Container>
        <h2>NODE CREATE INPUTS</h2>
        <p className="txt-ctr"><b>Chosen Type:</b> {nodeDetails.type}</p>

        <Form><Form.Group as={Row} className="mb-3">
          {inputs.map((input) => (
            <Row>
              <Col sm="auto" md={4} lg={4}>
                <Form.Label><b>{input}:</b></Form.Label>
              </Col>

              <Col>
                <Form.Control
                  value={nodeDetails[input]}
                  onChange={(e) =>
                    setNodeDetails({ ...nodeDetails, [input]: e.target.value })
                  } />
              </Col>
            </Row>
          ))}
        </Form.Group></Form>

        <Row>
          <Col></Col>
          <Col>
            <Button variant="uwa" onClick={(e) => sendCreateNode(nodeDetails)}>
              Submit
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  };

  // CREATE NODE COMPONENT
  const NodeCreate = () => {
    var nodeTypeInputs = Object.keys(nodeInputs);
    const [selectedType, setSelectedType] = useState(nodeTypeInputs[0]);

    return (
      <Container>
        <h2>NODE CREATE</h2>
        <Row>
          <Col sm="auto" md="auto" lg="auto">
            <p><b>Select Type:</b></p>
          </Col>

          <Col sm={5} md={5} lg={5}>
            <Dropdown>
              <Dropdown.Toggle variant="uwa" id="dropdown-basic">
                {selectedType}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {nodeTypeInputs.map((type) => (
                  <Dropdown.Item
                    className="dd-uwa"
                    key={type}
                    value={type}
                    onClick={(e) => setSelectedType(type)}>
                    {type}
                  </Dropdown.Item>))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          {/*        <select
          value={selectedType}
          //onChange={e => setSelectedType(e.target.value)}>
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {nodeTypeInputs.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>*/}

          <Col sm="auto" md="auto" lg="auto">
            <Button variant="uwa" onClick={(e) => getInputs(selectedType, "NODE")}>
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  // CREATE LINK INPUTS COMPONENT
  const LinkInputs = () => {
    const [linkDetails, setLinkDetails] = useState({ type: chosenType });
    var inputs = ["X", "1", "2", "3"];

    return (
      <Container>
        <p className="txt-ctr"><b>Chosen Type:</b> {linkDetails.type}</p>
        {(() => {
          if (chosenType === "CBOK_WEIGHTING") {
            console.log("CBOK_WEIGHTING");
            return (
              <Row>
                <Col sm={5} md={5} lg={3}><p><b>Weight: </b></p></Col>

                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="uwa" id="dropdown-basic">
                      Weight{" "}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {inputs.map((weight) => (
                        <Dropdown.Item
                          className="dd-uwa"
                          key={weight}
                          value={weight}
                          onClick={(e) => setLinkDetails({ ...linkDetails, weight: weight })}>
                          {weight}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            );
          }
          return null;
        })()}

        <Form><Form.Group className="mb-3">
          <Row>
            <Col sm={5} md={5} lg={3}><p><b>source id:</b> {linkDetails.sourceId}</p></Col>
            <Col>
              <Button variant="uwa" onClick={(e) => setSearchActive("source")}>
                Select Source
              </Button>
            </Col>
          </Row>

          <Row>
            <Col sm={5} md={5} lg={3}><p><b>target id:</b> {linkDetails.targetId}</p></Col>
            <Col>
              <Button variant="uwa" onClick={(e) => setSearchActive("target")}>
                Select Destination
              </Button>
            </Col>
          </Row>

          <Row>
            <Col sm="auto" md="auto" lg="auto">
              <Button
                variant="uwa"
                onClick={(e) =>
                  setLinkDetails({
                    ...linkDetails,
                    sourceId: searchSourceId,
                    targetId: searchTargetId,
                  })
                }
              >
                Confirm Source and Target
              </Button>
            </Col>
            <Col sm="auto" md="auto" lg="auto">
              <Button variant="uwa" onClick={(e) => sendCreateLink(linkDetails)}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form.Group></Form>
      </Container>
    );
  };

  // CREATE LINK COMPONENT
  const LinkCreate = () => {
    const [selectedType, setSelectedType] = useState(linkTypes[0]);

    console.log(linkTypes);

    return (
      <Container>
        <h2>LINK CREATE</h2>

        <Row>
          <Col sm="auto" md="auto" lg="auto">
            <p><b>Select Type:</b></p>
          </Col>

          <Col sm={5} md={5} lg={5}>
            <Dropdown>
              <Dropdown.Toggle variant="uwa" id="dropdown-basic">
                {selectedType}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {linkTypes.map((type) => (
                  <Dropdown.Item
                    className="dd-uwa"
                    key={type}
                    value={type}
                    onClick={(e) => setSelectedType(type)}>
                    {type}
                  </Dropdown.Item>))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col sm="auto" md="auto" lg="auto">
            <Button variant="uwa" onClick={(e) => getInputs(selectedType, "LINK")}>
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  // UPDATE LINK COMPONENT
  const LinkUpdate = () => {
    var unitLink = searchforLink(currentId);

    const [sourceDetails, setSourceDetails] = useState(unitLink.source);
    const [targetDetails, setTargetDetails] = useState(unitLink.target);
    const [linkDetails, setLinkDetails] = useState(unitLink.property);

    var properties = Object.keys(unitLink.property);
    var sourceProp = Object.keys(unitLink.source);
    var targetProp = Object.keys(unitLink.target);

    searchSourceId = sourceDetails.id;
    searchTargetId = targetDetails.id;

    function updateIds() {
      setSourceDetails({ ...sourceDetails, id: searchSourceId });
      setTargetDetails({ ...targetDetails, id: searchTargetId });
      setLinkDetails({
        ...linkDetails,
        sourceId: searchSourceId,
        targetId: searchTargetId,
      });
    }

    const index = properties.indexOf("id");
    if (index > -1) {
      // only splice array when item is found
      properties.splice(index, 1); // 2nd parameter means remove one item only
    }

    return (
      <Container>
        <h2>LINK UPDATE</h2>

        <p><b>Link id:</b> {linkDetails.id}</p>

        <h3 className="txt-ctr">PROPERTY UPDATE</h3>

        <Form><Form.Group as={Row} className="mb-3">
          {properties.map((property) => (
            <Row>
              <Col sm={6} md={6} lg={3}>
                <Form.Label><b>{property}:</b></Form.Label>
              </Col>

              <Col>
                <Form.Control
                  value={linkDetails[property]}
                  onChange={(e) =>
                    setLinkDetails({ ...linkDetails, [property]: e.target.value })
                  } />
              </Col>
            </Row>
          ))}
        </Form.Group></Form>

        <h3 className="txt-ctr">SOURCE UPDATE</h3>


        <Form><Form.Group as={Row} className="mb-3">
          <Row>
            <Col sm={6} md={6} lg={3}>
              <Form.Label><b>Source Id:</b></Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                value={sourceDetails.id}
                onChange={(e) =>
                  setSourceDetails({ ...sourceDetails, id: searchSourceId })
                } />
            </Col>

            <Col sm="auto" md="auto" lg="auto">
              <Button variant="uwa" onClick={(e) => setSearchActive("source")}>
                Select Source
              </Button>
            </Col>
          </Row>

        </Form.Group></Form>

        {sourceProp.map((sProperty) => (
          <Row>
            <Col sm={6} md={6} lg={3}><p><b>{sProperty}: </b></p></Col>
            <Col><p>{sourceDetails[sProperty]}</p></Col>
          </Row>
        ))}

        <h3 className="txt-ctr">TARGET UPDATE</h3>

        <Row><Form><Form.Group as={Row} className="mb-3">
          <Col sm={6} md={6} lg={3}>
            <Form.Label><b>Target Id:</b></Form.Label>
          </Col>

          <Col>
            <Form.Control
              value={targetDetails.id}
              onChange={(e) =>
                setTargetDetails({ ...targetDetails, id: searchTargetId })
              } />
          </Col>
          <Col sm="auto" md="auto" lg="auto">
            <Button variant="uwa" onClick={(e) => setSearchActive("target")}>
              Select Destination
            </Button>
          </Col>
        </Form.Group></Form></Row>

        {targetProp.map((tProperty) => (
          <Row>
            <Col sm={6} md={6} lg={3}><p><b>{tProperty}: </b></p></Col>
            <Col><p>{sourceDetails[tProperty]}</p></Col>
          </Row>
        ))}

        <Row>
        <Col sm="auto" md="auto" lg="auto">
        <Button variant="uwa" onClick={(e) => updateIds()}>
          Confirm Source and Target
        </Button>
        </Col>
        
        
        <Col sm="auto" md="auto" lg="auto">
        <Button
          variant="uwa"
          onClick={(e) => sendLinkUpdate(linkDetails, unitLink.property.id)}>
          Submit
        </Button>
        </Col>

        <Col sm="auto" md="auto" lg="auto">
        <Button
          variant="uwa"
          onClick={(e) => sendDeleteLink(unitLink.property.id)}>
          Delete
        </Button>
        </Col>

        
        <Col sm="auto" md="auto" lg="auto">
        <Button
          variant="uwa"
          onClick={(e) => sendLinkUpdate(linkDetails, unitLink.property.id)}>
          Submit
        </Button>
        </Col>

        <Col sm="auto" md="auto" lg="auto">
        <Button
          variant="uwa"
          onClick={handleDelLinkShow.bind(this, unitLink.property.id)}>
          Delete
        </Button>
        </Col>
        </Row>
    
      <DelLink id={unitLink.property.id}/>

      </Container>
    );
  };

  // CREATE NODE & LINK COMPONENT
  const Create = () => {
    return (
      <Container>
        {userType === "UnitCoordinator" ? (
          <Row>
            <h2>CREATE</h2>
            <Col></Col>
            <Col sm="auto" md="auto" lg="auto">
              <Button
                variant="uwa"
                onClick={(n) => setFilterActive("NodeCreate")}
              >
                Create Node
              </Button>
            </Col>

            <Col sm="auto" md="auto" lg="auto">
              <Button
                variant="uwa"
                onClick={(n) => setFilterActive("LinkCreate")}
              >
                Create Link
              </Button>
            </Col>
            <Col></Col>
          </Row>
        ) : (
          <Row></Row>
        )}
      </Container>
    );
  };

  function getWidth() {
    if (crudActive === false && tableActive === false) {
      return window.innerWidth * 0.85;
    }
    return window.innerWidth * 0.6;
  }

  function getHeight() {
    return window.innerHeight * 0.7;
  }
  const longestDisplayNameWord = getLongestLabel();
  function getLongestLabel() {
    var longestLength = 0;
    for (var i = 0; i < data.nodes.length; i++) {
      var currentNodeWords = data.nodes[i].displayName.split(" ");
      console.log(currentNodeWords);
      var longestWord = 0;
      for (var j = 0; j < currentNodeWords.length; j++) {
        if (currentNodeWords[j].length > longestWord) {
          longestWord = currentNodeWords[j].length;
        }
      }
      if (longestWord > longestLength) {
        longestLength = longestWord;
      }
    }
    return longestLength;
  }

  // LEGEND COMPONENT
  const Canvas = ({ draw, height, width }) => {
    const canvas = React.useRef();

    React.useEffect(() => {
      const context = canvas.current.getContext("2d");
      draw(context);
    });

    return <canvas ref={canvas} height={height} width={width} />;
  };

  Canvas.propTypes = {
    draw: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  const legend = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "brown";
    ctx.arc(10, 30, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "15px Helvetica Neue";
    ctx.fillText("Unit", 25, 35);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.arc(70, 30, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "15px Helvetica Neue";
    ctx.fillText("EndCBoK", 85, 35);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(170, 30, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "15px Helvetica Neue";
    ctx.fillText("Outcome", 185, 35);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(270, 30, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "15px Helvetica Neue";
    ctx.fillText("AQF Category", 285, 35);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.arc(400, 30, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "15px Helvetica Neue";
    ctx.fillText("AQF Outcome", 415, 35);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "purple";
    ctx.arc(530, 30, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "15px Helvetica Neue";
    ctx.fillText("Sub", 545, 35);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(590, 30, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "15px Helvetica Neue";
    ctx.fillText("Top", 605, 35);
    ctx.closePath();
  };

  //-----------------------------------------------------------------------------------RETURN
  return (
    <div>
      <div className="color-block">
        <Container>
          <Col>
            <Button variant="uwa" onClick={toggleTable}>
              <IconContext.Provider value={{ size: 42 }}>
                <ImTable />
              </IconContext.Provider>{" "}
            </Button>
            <Button variant="uwa">
              <IconContext.Provider value={{ size: 42 }}>
                <FaFileCsv />
              </IconContext.Provider>{" "}
            </Button>
          </Col>
          <Canvas draw={legend} height={50} width={650} />

          <Row>
            <Offcanvas
              show={tableActive}
              onHide={closeTable}
              placement={"end"}
              backdrop={false}
              scrol={true}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Tabular View</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <AllDataTable data={data} />
              </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas
              show={crudActive}
              onHide={closeCrudTable}
              placement={"end"}
              backdrop={false}
              scrol={true}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>CRUD Commands</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {filterActive === "NodeRead" && <NodeRead />}
                {filterActive === "LinkRead" && <LinkRead />}
                {filterActive === "Create" && <Create />}

                {filterActive === "NodeUpdate" && <NodeUpdate />}
                {filterActive === "NodeCreate" && <NodeCreate />}
                {filterActive === "NodeInputs" && <NodeInputs />}
                {filterActive === "LinkUpdate" && <LinkUpdate />}
                {filterActive === "LinkCreate" && <LinkCreate />}
                {filterActive === "LinkInputs" && <LinkInputs />}
              </Offcanvas.Body>
            </Offcanvas>
          </Row>

          <div className="container-fluid row xs=2 md=2 lg=2">
            <div className="col">
              <ForceGraph2D
                graphData={data}
                width={getWidth()}
                height={getHeight()}
                //backgroundColor="grey"
                //nodeRelSize={8}
                nodeVal={12}
                nodeLabel={"displayName"}
                nodeCanvasObjectMode={() => "after"}
                nodeCanvasObject={(node, ctx, globalScale) => {
                  const vx = node.vx;
                  const vy = node.vy;
                  const fx = node.fx;
                  const fy = node.fy;
                  const MAX_FONT_SIZE = 4;

                  const label = node.displayName;
                  //const labelLength = label.length;
                  const OFFSET = 1.5;

                  const labelWords = label.split(" ");
                  var longestWordIndex = 0;
                  for (var i = 0; i < labelWords.length; i++) {
                    if (
                      labelWords[i].length > labelWords[longestWordIndex].length
                    ) {
                      longestWordIndex = i;
                    }
                  }

                  // const longestWordLength = labelWords[longestWordIndex].length;

                  const fontSize = (4 * (12 - OFFSET)) / longestDisplayNameWord;
                  ctx.font = `${fontSize}px Sans-Serif`;

                  const yIncrements = 12 / (labelWords.length - 1);

                  const startingY =
                    node.y - yIncrements * ((labelWords.length - 1) / 2);
                  //const yIncrements = 1 / labelWords.length;

                  if (labelWords.length == 1) {
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "black"; //node.color;
                    ctx.fillText(label, node.x, node.y);
                  } else {
                    for (var k = 0; k < labelWords.length; k++) {
                      ctx.textAlign = "center";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = "black"; //node.color;
                      ctx.fillText(
                        labelWords[k],
                        node.x,
                        startingY + k * yIncrements
                      );
                    }
                  }

                  // ctx.textAlign = "center";
                  // ctx.textBaseline = "middle";
                  // ctx.fillStyle = "black"; //node.color;
                  // ctx.fillText(label, node.x, node.y);
                }}
                /*nodeCanvasObjectMode="after"
                nodeCanvasObject={(node, ctx, globalScale) => {
                  const MAX_FONT_SIZE = 4;
                  const LABEL_NODE_MARGIN = 1.5;
 
                  const label = node.id;
                  //  const labelWords = label.split(" ");
                  //const wordLength = [];
                  //const longestLength = [{ length: 0, index: 0 }];
 
                  //for (let i = 0; i < labelWords.length; i++) {
                  //  wordLength.push(ctx.measureText(labelWords[i]));
                  // if (wordLength[i] > longestLength.length) {
                  //  longestLength.length = wordLength[i];
                  //   longestLength.index = i;
                  // }
                  // }
 
                  const fontSize = 12 / globalScale;
                  ctx.font = `${fontSize}px Sans-Serif`;
 
                  const textWidth = ctx.measureText(label).width;
                  const bckgDimensions = [textWidth, fontSize].map(
                    (n) => n + fontSize * 0.2
                  ); // some padding
 
                  /*ctx.beginPath();
                  ctx.arc(
                    node.x,
                    node.y,
                    bckgDimensions[0] / 2 + LABEL_NODE_MARGIN,
                    0,
                    2 * Math.PI,
                    false
                  );
                  ctx.fillStyle = "blue";
                  ctx.fill();
 
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = "black";
                  ctx.fillText(label, node.x, node.y);
 
                  //const label = node.id;
 
                    const label = "multi word label example";
                  const labelWords = label.split(" ");
                  const longestLength = [{ length: 0, index: 0 }];
 
                  for (var i = 0; i < labelWords.length; i++) {
                    if (ctx.measureText(labelWords[i]) > longestLength.length) {
                      longestLength.length = ctx.measureText(labelWords[i]);
                      longestLength.index = i;
                    }
                  }
 
                  //const fontSize = 12 / globalScale;
                  // const maxTextLength =
                  //   Math.sqrt(Math.pow(node.x, 2) + Math.pow(node.y, 2)) -
                  //   LABEL_NODE_MARGIN * 2;
                  const fontSize = Math.min(
                    MAX_FONT_SIZE,
                    globalScale / ctx.measureText(label).width /// longestLength.length
                  );
 
                  ctx.font = `${fontSize}px Sans-Serif`;
                  //  const textWidth = longestLength.length;
                  // const bckgDimensions = [textWidth, fontSize].map(
                  //   (n) => n + fontSize * 0.2
                  //); // some padding
                  // const radius =
                  //  ((textWidth + LABEL_NODE_MARGIN) * labelWords.length) / 2 +
                  //   5 * LABEL_NODE_MARGIN;
 
                  ctx.beginPath();
                  // ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                  ctx.arc(
                    node.x,
                    node.y,
                    ctx.measureText(label).width + LABEL_NODE_MARGIN,
                    0,
                    2 * Math.PI,
                    false
                  );
 
                  ctx.fillStyle = "blue";
                  ctx.fill();
 
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = "black";
 
                   const startingYPoint =
                    node.y - radius + 2.5 * LABEL_NODE_MARGIN;
 
                  for (var j = 0; j < labelWords.length; j++) {
                    ctx.fillText(
                      labelWords[j],
                      node.x,
                      startingYPoint + (fontSize + LABEL_NODE_MARGIN) * j
                    );
                  }
 
                  //ctx.textAlign = "center";
 
                  ctx.fillText(label, node.x, node.y);
                }}*/
                linkWidth={3}
                // PUT AN ATTRIBUTE FOR LINK COLOR
                linkColor={"linkColor"}
                linkDirectionalArrowLength={6}
                linkDirectionalArrowRelPos={1}
                linkDirectionalArrowColor={"linkColor"}
                //linkCanvasObjectMode={(() => 'after')}
                linkCanvasObjectMode={() => "after"}
                linkCanvasObject={(link, ctx) => {
                  const MAX_FONT_SIZE = 4;
                  const LABEL_NODE_MARGIN = 1.5;

                  const start = link.source;
                  const end = link.target;

                  // ignore unbound links
                  if (typeof start !== "object" || typeof end !== "object")
                    return;

                  // calculate label positioning
                  const textPos = Object.assign(
                    ...["x", "y"].map((c) => ({
                      [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
                    }))
                  );

                  const relLink = { x: end.x - start.x, y: end.y - start.y };

                  const maxTextLength =
                    Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) -
                    LABEL_NODE_MARGIN * 2;

                  let textAngle = Math.atan2(relLink.y, relLink.x);
                  // maintain label vertical orientation for legibility
                  if (textAngle > Math.PI / 2)
                    textAngle = -(Math.PI - textAngle);
                  if (textAngle < -Math.PI / 2)
                    textAngle = -(-Math.PI - textAngle);

                  const label = link.property.id;

                  // estimate fontSize to fit in link length
                  const fontSize = Math.min(
                    MAX_FONT_SIZE,
                    maxTextLength / ctx.measureText(label).width
                  );
                  ctx.font = `${fontSize}px Sans-Serif`;
                  const textWidth = ctx.measureText(label).width;
                  const bckgDimensions = [textWidth, fontSize].map(
                    (n) => n + fontSize * 0.2
                  ); // some padding

                  // draw text label (with background rect)
                  ctx.save();
                  ctx.translate(textPos.x, textPos.y);
                  ctx.rotate(textAngle);

                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = "darkgrey";
                  ctx.fillText(label, 0, 0);
                  ctx.restore();
                }}
                onNodeDragEnd={(node) => {
                  node.fx = node.x;
                  node.fy = node.y;
                  node.fz = node.z;
                }}
                cooldownTicks={100}
                onEngineStop={() => forceRef.current.zoomToFit(400)}
                onNodeClick={(node) => handleNodeClick(node)}
                onLinkClick={(link) => handleLinkClick(link)}
                onBackgroundClick={(i) => handleBackgroundClick(i)}
                linkCurvature="curvature"
                enablePointerInteraction={true}
                linkDirectionalParticleWidth={1}
                ref={forceRef}
              />
            </div>
          </div>
        </Container>
      </div >
    </div >
  );
};

export default queryDisplay;
