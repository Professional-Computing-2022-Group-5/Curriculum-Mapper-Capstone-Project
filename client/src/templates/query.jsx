import React, { useState } from "react";
import httpClient from "./httpClient.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
//import { useNavigate } from "react-router-dom";
import { QueryDisplay } from "./index.js";

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

const basicQueries = [
  {
    Name: "All CBoK levels",
    Query:
      "MATCH (e:CBoK:End)<-[r:INCLUDES]-(s:CBoK:Sub {area:'ICT Management'}) RETURN e,r,s",
  },
  {
    Name: "ICT Management",
    Query:
      "MATCH (e:CBoK:End)<-[r1:INCLUDES]-(s:CBoK:Sub)<-[r2:INCLUDES]-(t:CBoK:Top {area:'General ICT Knowledge'}) RETURN e,r1,s,r2,t",
  },
  {
    Name: "General ICT Knowledge",
    Query:
      "MATCH (e:CBoK:End)<-[r1:INCLUDES]-(s:CBoK:Sub)<-[r2:INCLUDES]-(t:CBoK:Top {area:'General ICT Knowledge'}) RETURN e,r1,s,r2,t",
  },
  {
    Name: "Essential Core ICT Knwoledge",
    Query:
      "MATCH (s:CBoK:Sub)<-[r:INCLUDES]-(t:CBoK:Top {area:'Essential Core ICT Knowledge'}) RETURN s,r,t",
  },
  {
    Name: "CITS5206 Activities",
    Query:
      "MATCH (u:Unit {unitCode: 'CITS5206'})<-[r:ACTIVITY_OF]-(a:Activity) RETURN u,r,a",
  },
  {
    Name: "CITS5206 Activites + Mapping to end levels",
    Query:
      "MATCH (u:Unit {unitCode: 'CITS5206'})<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(c:CBoK:End) RETURN u,r1,a,r2,c",
  },
  {
    Name: "CITS5206 Activites + Mapping to sub levels",
    Query:
      "MATCH (u:Unit {unitCode: 'CITS5206'})<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(e:CBoK:End)<-[r3:INCLUDES]-(s:CBoK:Sub) RETURN u,r1,a,r2,e,r3,s",
  },
  {
    Name: "CITS1001 mapping to Systems Acquisition",
    Query:
      "MATCH (u:Unit {unitCode: 'CITS1001'})<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(c:CBoK:End {area: 'Systems acquisition'}) RETURN u,r1,a,r2,c",
  },
  {
    Name: "CITS1001 Activites mapping to Technology Resource",
    Query:
      "MATCH (u:Unit {unitCode: 'CITS1001'})<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(e:CBoK:End)<-[r3:INCLUDES]-(s:CBoK:Sub {area:'Technology Resource'}) RETURN u,r1,a,r2,e,r3,s",
  },
  {
    Name: "Units with Cybersecurity Activities",
    Query:
      "MATCH (u:Unit)<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(c:CBoK:End {area:'Cyber security'}) RETURN u",
  },
  {
    Name: "Units that map to ICT Management",
    Query:
      "MATCH (u:Unit)<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(e:CBoK:End)<-[r3:INCLUDES]-(s:CBoK:Sub {area:'ICT Management'}) RETURN u",
  },
  {
    Name: "Units that map to General ICT Knowledge",
    Query:
      "MATCH (u:Unit)<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(e:CBoK:End)<-[r3:INCLUDES]-(s:CBoK:Sub)<-[r4:INCLUDES]-(t:CBoK:Top {area:'General ICT Knowledge'}) RETURN u",
  },
  {
    Name: "Units and Activities that map to Cybersecurity",
    Query:
      "MATCH (u:Unit)<-[r1:ACTIVITY_OF]-(a:Activity)<-[r2:MAPS_TO]-(c:CBoK:End {area:'Cyber security'}) RETURN u,r1,a LIMIT 5",
  },
  {
    Name: "CITS4009 Unit Outcomes",
    Query:
      "MATCH (u:Unit{unitCode:'CITS4009'}), OPTIONAL MATCH r=(u)-[:Unit_Outcome]-(:Outcome), RETURN r",
  },
  {
    Name: "CITS4009 Activity and Outcome Relationships",
    Query:
      "MATCH (u:Unit{unitCode:'CITS4009'}),(a:Activity), OPTIONAL MATCH r=(a)-[:How_outcome_will_be_assessed]-(:Outcome), RETURN r",
  },
  {
    Name: "MIT AQF relationships",
    Query:
      "MATCH (p:Program),(c:AQFcategory),(o:AQFoutcome), WHERE p.abbreviation='MIT' , RETURN p,c,o;",
  },
];

const Query = () => {
  //-----------------------------------------------------------------------------------GLOBAL VARIABLES

  // const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [graphActive, setGraphActive] = useState("noGraph");

  //-----------------------------------------------------------------------------------FUNCTIONS
  // EXECUTE & QUERY AND GET THE RETURN DATA
  const executeQuery = async (query) => {
    try {
      const dbData = await httpClient.post("//localhost:5000/query", {
        query,
      });
      if (dbData.data !== undefined) {
        response = JSON.parse(JSON.stringify(dbData.data));
        Object.freeze(response);
        setGraphActive("haveData");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid Query");
      }
    }
  };

  if (graphActive === "haveData") {
    console.log(response);
    setGraphActive("showGraph");
  }
  //-----------------------------------------------------------------------------------RETURN
  return (
    <Container>
      <Row>
        <Col>
          <h3 className="font-weight-light">Query: </h3>
        </Col>
      </Row>
      <Row>
        <Col sm={5} lg={4}>
          {graphActive !== "showGraph" && (
            <Form.Control
              className="mb-3"
              placeholder="Enter query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
        </Col>
        <Col sm={1} md={1} lg={1}>
          {graphActive !== "showGraph" && (
            <h3 className="font-weight-light">OR </h3>
          )}
        </Col>

        <Col sm={1} md={1} lg={4}>
          {graphActive !== "showGraph" && (
            <Dropdown>
              <Dropdown.Toggle variant="uwa" id="dropdown-basic">
                Basic Query{" "}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {basicQueries.map((q) => (
                  <Dropdown.Item
                    className="dd-uwa"
                    onClick={() => executeQuery(q.Query)}
                  >
                    {q.Name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={2} md={2} lg={1}>
          {graphActive !== "showGraph" && (
            <Button variant="uwa" onClick={() => executeQuery(query)}>
              Submit
            </Button>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {graphActive === "showGraph" && <QueryDisplay data={response} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Query;
