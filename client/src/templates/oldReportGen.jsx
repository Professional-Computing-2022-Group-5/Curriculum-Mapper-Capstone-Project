import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import httpClient from "./httpClient.js";

import Button from "react-bootstrap/Button";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

var coreUnits = {};
var conversionUnits = {};
var choiceUnits = {};

const courseTitle = "Master of Information Technology";
const egCourseCode = "62510";

//import PSPDFKit from "./PSPDFKit";
//import PSPDFKit from "./assets/pspdfkit.js";

// MATCH THE CORE UNITS: MATCH p=()-[r:CORE]->(c:Course{courseCode:"<CORSECODE>"}) RETURN p
// MATCH THE CHOICE UNITS: MATCH p=()-[r:CHOICE]->(c:Course{courseCode:"CORSECODE"}) RETURN p
// MATCH THE CONVERSION UNITS: MATCH p=()-[r:CONVERSION]->(c:Course{courseCode:"62510"}) RETURN p

// MATCH p=()-[r:OPTION]->(c:Course{courseCode:"62510"}) RETURN p

// MATCH (n:Course) RETURN n

const styles = StyleSheet.create({
  page: {
    backgroundColor: "pink",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    // width: window.innerWidth * 0.8, //the pdf viewer will take up all of the width and height
    // height: window.innerHeight,
    showToolbar: true,
  },
});

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// const BasicDocument = (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Hello World!</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>We're inside a PDF!</Text>
//       </View>
//     </Page>
//   </Document>
// );

//var courseData = {};

//var courseData = {};

// MATCH THE CORE UNITS: MATCH p=()-[r:CORE]->(c:Course{courseCode:"<CORSECODE>"}) RETURN p
// MATCH THE CHOICE UNITS: MATCH p=()-[r:CHOICE]->(c:Course{courseCode:"CORSECODE"}) RETURN p
// MATCH THE CONVERSION UNITS: MATCH p=()-[r:CONVERSION]->(c:Course{courseCode:"62510"}) RETURN p
// Create styles

const GenerateReport = () => {
  const getAllCourses = "MATCH (n:Course) RETURN n";
  const getAllCore =
    "MATCH p=()-[r:CORE]->(c:Course{courseCode:'62510'}) RETURN p";
  const getAllConversion =
    "MATCH p=()-[r:CONVERSION]->(c:Course{courseCode:'62510'}) RETURN p";
  const getAllChoice =
    "MATCH p=()-[r:CHOICE]->(c:Course{courseCode:'62510'}) RETURN p";

  //const [choosenCourse, setChoosenCourse] = useState("default");

  const findCoreUnits = async (query) => {
    console.log(query);
    try {
      const dbData = await httpClient.post("//localhost:5000/query", {
        query,
      });
      console.log(dbData.data);

      if (dbData.data.status === "success") {
        coreUnits = JSON.parse(JSON.stringify(dbData.data.data.nodes));

        Object.freeze(coreUnits);
        console.log(coreUnits);
      }
      if (dbData.data.status === "request_error") {
        console.log(
          "[request_error]: Error Receiving Query Request (routes.py) "
        );
      }
      if (dbData.data.status === "joltAPI_error") {
        console.log("[joltAPI_error]: Error Accessing Neo4jDB (neo4jDB.py) ");
      }
      if (dbData.data.status === "empty_data") {
        console.log("[empty_data]: Error Executing Query (api.py) ");
      }
    } catch (e) {
      console.log("Error");
    }
  };

  const findConversionUnits = async (query) => {
    try {
      const dbData = await httpClient.post("//localhost:5000/query", {
        query,
      });
      console.log(dbData.data);

      if (dbData.data.status === "success") {
        conversionUnits = JSON.parse(JSON.stringify(dbData.data.data.nodes));

        Object.freeze(conversionUnits);
        console.log(conversionUnits);
      }
      if (dbData.data.status === "request_error") {
        console.log(
          "[request_error]: Error Receiving Query Request (routes.py) "
        );
      }
      if (dbData.data.status === "joltAPI_error") {
        console.log("[joltAPI_error]: Error Accessing Neo4jDB (neo4jDB.py) ");
      }
      if (dbData.data.status === "empty_data") {
        console.log("[empty_data]: Error Executing Query (api.py) ");
      }
    } catch (e) {
      console.log("Error");
    }
  };

  const findChoiceUnits = async (query) => {
    try {
      const dbData = await httpClient.post("//localhost:5000/query", {
        query,
      });
      console.log(dbData.data);

      if (dbData.data.status === "success") {
        choiceUnits = JSON.parse(JSON.stringify(dbData.data.data.nodes));

        Object.freeze(choiceUnits);
        console.log(choiceUnits);
      }
      if (dbData.data.status === "request_error") {
        console.log(
          "[request_error]: Error Receiving Query Request (routes.py) "
        );
      }
      if (dbData.data.status === "joltAPI_error") {
        console.log("[joltAPI_error]: Error Accessing Neo4jDB (neo4jDB.py) ");
      }
      if (dbData.data.status === "empty_data") {
        console.log("[empty_data]: Error Executing Query (api.py) ");
      }
    } catch (e) {
      console.log("Error");
    }
  };

  findCoreUnits(getAllCore);
  findConversionUnits(getAllConversion);
  findChoiceUnits(getAllChoice);

  return (
    <div>
      <p>Hello</p>
      <Row>
        <Col>
          <Container>
            <PDFViewer>
              <Document>
                <Page size="A4" style={styles.page}>
                  <View style={styles.section}>
                    <Text>Report for: </Text>
                  </View>

                  <View style={styles.section}>
                    <Text>World</Text>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

const BasicDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{courseTitle}</Text>
      </View>
      <View style={styles.section}>
        <Text>Core Units</Text>
        {coreUnits.map()}
      </View>
      <View style={styles.section}>
        <Text>Complementary Units</Text>
      </View>
    </Page>
  </Document>
);

const ReportGen = () => {
  const [genReport, setGenReport] = useState(false);

  return (
    <div className="report_gen">
      <div>
        <Button variant="uwa" onClick={() => setGenReport(true)}>
          Generate Report
        </Button>
      </div>

      {genReport && (
        <PDFViewer width={window.innerWidth} heigh={window.innerHeight}>
          <BasicDocument />
        </PDFViewer>
      )}
    </div>
  );
};

export default ReportGen;
