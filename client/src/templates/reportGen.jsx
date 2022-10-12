import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   PDFDownloadLink,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "#d11fb6",
//     color: "white",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//   },
//   viewer: {
//     width: window.innerWidth, //the pdf viewer will take up all of the width and height
//     height: window.innerHeight,
//     showToolbar: true,
//   },
// });

// function BasicDocument() {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text>Hello</Text>
//         </View>
//         <View style={styles.section}>
//           <Text>World</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// }

const ReportGen = () => {
  // Create styles

  return (
    <div className="report_gen">
      <div className="col-lg-5">
        <Row>
          <Col>
            <h1 className="font-weight-light">Report Generation </h1>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReportGen;
