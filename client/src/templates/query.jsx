import React, { useState } from "react";
import httpClient from "./httpClient.js";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import GraphComponent from "./graphComponent";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { ImTable } from "react-icons/im";
import { ImFileText2 } from "react-icons/im";
import { IconContext } from "react-icons";

/*
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
*/
var response = {};

const AllDataTable = () => {
    //change this to var nHeadData = ["id", "label", "displayName", "color"] when the backend workd
    var nHeadData = ["id", "unitCode", "title"]
    var nBodyData = response.nodes
    //console.log("nHEADDATE")
    //console.log(nHeadData)

    var lHeadData = ["id", "source", "target"]
    //var lBodyData = data.links

    var lBodyData = []

    for (var i = 0; i < response.links.length; i++) {
        lBodyData.push({
            "id": response.links[i].property.id,
            "source": response.links[i].source.id,
            "target": response.links[i].target.id
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

const Query = () => {
    //-----------------------------------------------------------------------------------GLOBAL VARIABLES

    const [query, setQuery] = useState("");
    const [graphActive, setGraphActive] = useState("noGraph");
    const [tableActive, setTableActive] = useState(false);
    const closeTable = () => setTableActive(false);
    const toggleTable = () => setTableActive((s) => !s);

    const basicQueries = [
        { Name: "All CBoK levels", Query: "MATCH (e:CBoK:End)<-[r:INCLUDES]-(s:CBoK:Sub {area:'ICT Management'}) RETURN e,r,s" },
        { Name: "ICT Management", Query: "MATCH (e:CBoK:End)<-[r1:INCLUDES]-(s:CBoK:Sub)<-[r2:INCLUDES]-(t:CBoK:Top {area:'General ICT Knowledge'}) RETURN e,r1,s,r2,t" },
        { Name: "General ICT Knowledge", Query: "MATCH (e:CBoK:End)<-[r1:INCLUDES]-(s:CBoK:Sub)<-[r2:INCLUDES]-(t:CBoK:Top {area:'General ICT Knowledge'}) RETURN e,r1,s,r2,t" },
        { Name: "Essential Core ICT Knwoledge", Query: "MATCH (s:CBoK:Sub)<-[r:INCLUDES]-(t:CBoK:Top {area:'Essential Core ICT Knowledge'}) RETURN s,r,t" },
        { Name: "CITS5206 Activities", Query: "MATCH (u:Unit {unitCode: 'CITS5206'})<-[r:ACTIVITY_OF]-(a:Activity) RETURN u,r,a" },
        { Name: "CITS5206 Activites + Mapping to end levels", Query: "MATCH (u:Unit {unitCode: 'CITS5206'})<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(c:CBoK:End) RETURN u,r1,a,r2,c" },
        { Name: "CITS5206 Activites + Mapping to sub levels", Query: "MATCH (u:Unit {unitCode: 'CITS5206'})<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(e:CBoK:End)<-[r3:INCLUDES]-(s:CBoK:Sub) RETURN u,r1,a,r2,e,r3,s" },
        { Name: "CITS1001 mapping to Systems Acquisition", Query: "MATCH (u:Unit {unitCode: 'CITS1001'})<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(c:CBoK:End {area: 'Systems acquisition'}) RETURN u,r1,a,r2,c" },
        { Name: "CITS1001 Activites mapping to Technology Resource", Query: "MATCH (u:Unit {unitCode: 'CITS1001'})<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(e:CBoK:End)<-[r3:INCLUDES]-(s:CBoK:Sub {area:'Technology Resource'}) RETURN u,r1,a,r2,e,r3,s" },
        { Name: "Units with Cybersecurity Activities", Query: "MATCH (u:Unit)<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(c:CBoK:End {area:'Cyber security'}) RETURN u" },
        { Name: "Units that map to ICT Management", Query: "MATCH (u:Unit)<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(e:CBoK:End)<-[r3:INCLUDES]-(s:CBoK:Sub {area:'ICT Management'}) RETURN u" },
        { Name: "Units that map to General ICT Knowledge", Query: "MATCH (u:Unit)<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(e:CBoK:End)<-[r3:INCLUDES]-(s:CBoK:Sub)<-[r4:INCLUDES]-(t:CBoK:Top {area:'General ICT Knowledge'}) RETURN u" },
        { Name: "Units and Activities that map to Cybersecurity", Query: "MATCH (u:Unit)<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(c:CBoK:End {area:'Cyber security'}) RETURN u,r1,a LIMIT 5" },
        { Name: "CITS4009 Unit Outcomes", Query: "MATCH (u:Unit{unitCode:'CITS4009'}), OPTIONAL MATCH r=(u)-[:Unit_Outcome]-(:Outcome), RETURN r" },
        { Name: "CITS4009 Activity and Outcome Relationships", Query: "MATCH (u:Unit{unitCode:'CITS4009'}),(a:Activity), OPTIONAL MATCH r=(a)-[:How_outcome_will_be_assessed]-(:Outcome), RETURN r" },
        { Name: "MIT AQF relationships", Query: "MATCH (p:Program),(c:AQFcategory),(o:AQFoutcome), WHERE p.abbreviation='MIT' , RETURN p,c,o;" },
    ];

    //-----------------------------------------------------------------------------------FUNCTIONS
    // EXECUTE & QUERY AND GET THE RETURN DATA
    const executeQuery = async (query) => {
        console.log("AAAAAAAA THE QUERY IS HERE LOOK HERE AAAAAAAAAAAAAAAA!!!");
        console.log(query);
        console.log("--------------");
        console.log("\n\n\n");
        try {
            const dbData = await httpClient.post("//localhost:5000/query", {
                query
            });

            console.log("DBDATA _ QUERY.js")
            console.log(dbData.data)
            if (dbData.data !== undefined) {
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

    if (graphActive === "haveData") {
        console.log(response)
        setGraphActive("showGraph");
    }
    //  //{graphType === "tabularView" && graphActive === "showGraph" && <TableComponent data = {response} />}
    //-----------------------------------------------------------------------------------RETURN
    return (
        <Container>

            <Row>
                <h1 className="font-weight-light">Query Page</h1>
                <Form.Group as={Row} ClassName="mb-3">
                    <Col sm={9} lg={10}>
                        {graphActive !== "showGraph" && <Form.Control className="mb-3" placeholder="Enter query" value={query} onChange={(e) => setQuery(e.target.value)} />}
                    </Col>
                    <Col sm={2} md={2} lg={1}>
                        {graphActive !== "showGraph" && <Button variant="uwa" onClick={() => executeQuery(query)}>Submit</Button>}
                    </Col>
                    <Col sm={1} md={1} lg={1}>
                        {graphActive !== "showGraph" && <Dropdown>
                            <Dropdown.Toggle variant="uwa" id="dropdown-basic">Basic Query </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {basicQueries.map((q) =>
                                    (<Dropdown.Item className="dd-uwa" onClick={() => executeQuery(q.Query)}>{q.Name}</Dropdown.Item>)
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        }
                    </Col>
                </Form.Group>
                <Col>
                    {graphActive === "showGraph" && <Button variant="uwa" onClick={toggleTable}><IconContext.Provider value={{ size: 42 }}><ImTable /></IconContext.Provider> </Button>}
                    {graphActive === "showGraph" && <Button variant="uwa"><IconContext.Provider value={{ size: 42 }}><ImFileText2 /></IconContext.Provider> </Button>}
                </Col>
            </Row>


            <Row>
                <Col>
                    {graphActive === "showGraph" && <GraphComponent data={response} />}
                </Col>

                <Offcanvas show={tableActive} onHide={closeTable} placement={"end"} backdrop={false} scrol={true}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Tabular View</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {graphActive === "showGraph" && <AllDataTable />}
                    </Offcanvas.Body>
                </Offcanvas>
            </Row>


        </Container>

    );
}

export default Query;

