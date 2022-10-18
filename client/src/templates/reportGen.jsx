import React, { useState, useEffect } from "react";
import PDFFile from "./PDFFile";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import httpClient from "./httpClient";

import Button from "react-bootstrap/Button";

const ReportGen = () => {
  const [userType, setUserType] = useState("BasicUser");

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");

        if (resp.data.isCoordinator === true) {
          setUserType("UnitCoordinator");
        }
      } catch (error) {
        console.log("No Current User Logged In");
      }
    })();
  }, []);

  return (
    <div>
      {userType === "UnitCoordinator" ? (
        <>
          <div>
            <PDFDownloadLink document={<PDFFile />} filename="CurriculumMapper">
              {({ loading }) =>
                loading ? (
                  <Button col={1} variant="uwa">
                    Loading document ...
                  </Button>
                ) : (
                  <Button col={1} variant="uwa">
                    Download
                  </Button>
                )
              }
            </PDFDownloadLink>
          </div>

          <PDFViewer width={window.innerWidth} height={window.innerHeight}>
            <PDFFile />
          </PDFViewer>
        </>
      ) : (
        <>
          <h1 className="txt-ctr">
            You are not a unitCoordinator, please contact an administrator for
            assistance!
          </h1>
        </>
      )}
    </div>
  );
};

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
        <Row>
          <Col>
            <PDFViewer style={styles.viewer}>
              <BasicDocument />
            </PDFViewer>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReportGen;
