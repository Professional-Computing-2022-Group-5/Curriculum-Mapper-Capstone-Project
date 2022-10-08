import React, {useState } from "react";
import httpClient from "./httpClient.js";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from "react-bootstrap/Form";
import GraphComponent from "./graphComponent";
import TableComponent from "./tableComponent";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

const Query = () => {
    //-----------------------------------------------------------------------------------GLOBAL VARIABLES
 
    const [query, setQuery] = useState("");
    const [graphActive, setGraphActive] = useState("noGraph");
    const [tableActive, setTableActive] = useState(false);
        const closeTable = () => setTableActive(false);
        const toggleTable = ()  => setTableActive((s) => !s);


    //-----------------------------------------------------------------------------------FUNCTIONS
    // EXECUTE & QUERY AND GET THE RETURN DATA
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
    //  //{graphType === "tabularView" && graphActive === "showGraph" && <TableComponent data = {response} />}
    //-----------------------------------------------------------------------------------RETURN
    return ( 
        <Container>

<Row>
    <h1 className="font-weight-light">Query Page</h1>
    {graphActive !== "showGraph" && <Form.Label>Input Query: </Form.Label>}
    {graphActive !== "showGraph" && <Form.Control placeholder="Enter query" value={query} onChange={(e)=> setQuery(e.target.value)}/>}
    {graphActive !== "showGraph" && <Button variant="primary" onClick={() => executeQuery(query)}>Submit</Button>}
    <Col>
        {graphActive == "showGraph" && <Button variant="primary" onClick={toggleTable}>Tabular View</Button>}
        {graphActive == "showGraph" && <Button variant="primary">Generate Report (placeholder)</Button>}
    </Col>
    </Row>


<Row>
    <Col>
    {graphActive === "showGraph" && <GraphComponent data = {response} />}
    </Col>
    
    <Offcanvas show={tableActive} onHide={closeTable} placement={"end"} backdrop={false} scrolling={true}>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title>Tabular View</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {graphActive === "showGraph" && <TableComponent data = {response} />}
        </Offcanvas.Body>
    </Offcanvas>
</Row>


        </Container>

);
}

export default Query;

