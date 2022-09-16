import React from 'react';
//import React, { useRef, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import './style.css';
//import App from './App';


//import ReactDOM from "react-dom";
//import ForceGraph2D from "react-force-graph-2d";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Home,
  Register,
  Login,
  Query,
  ReportGen,
  Navigation,
  Footer
} from "./templates";

/*var data = {
  nodes: [{ id: "A"}, { id: "B" }, { id: "C" }, { id: "D" }],
  links: [
    { source: "B", target: "C", value: 8 },
    { source: "C", target: "D", value: 10 },
    { source: "D", target: "A", value: 6 },
    { source: "B", target: "A", value: 6 },
    { source: "B", target: "D", value: 6 },
    { source: "D", target: "D", value: 6, curvature: 0.3 }
  ]
};*/
/*
var data = {
  nodes:[
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6, "deleted":false, "id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"deleted":false,"describe":"present and defend opinions by making judgments about information. validity of ideas, or quality of work based on a set of criteria.","id":292,"level":"IV.Analyzing","outcome":"(5) communicate effectively with stakeholders.","outcomeId":"5","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"deleted":false,"describe":"Exhibit memory of previously learned material by recalling facts, terms,basic concepts, and answers.","id":289,"level":"I.Remembering","outcome":"(2) select appropriate data visualisation options; ","outcomeId":"2","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":false,"id":183,"programmingBased":true,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
    {"deleted":false,"describe":"Present and defend opinions by making judgments about information, validity of ideas, or quality of work based on a set of criteria.","id":291,"level":"V. Evaluating","outcome":"(4) critically assess the outcomes of a data analysis; ","outcomeId":"4","type":"node","unitCode":"CITS4009"}],
  links:[
      {"property":{"deleted":false,"id":241,"type":"relationship"},"source":183,"target":292},
      {"property":{"deleted":false,"id":238,"type":"relationship"},"source":183,"target":289},
      {"property":{"deleted":false,"id":240,"type":"relationship"},"source":183,"target":291}],
}
*/
function App() {
  /*const forceRef = useRef(null);
  useEffect(() => {
    forceRef.current.d3Force("charge").strength(-400);
  });
  return (
    <ForceGraph2D
      graphData={data}
      nodeLabel="id"
      linkCurvature="curvature"
      enablePointerInteraction={true}
      linkDirectionalParticleWidth={1}
      ref={forceRef}
    />
  );*/

  return <div></div>
}




const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(  
  <Router>
    <Navigation />
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/query" element={<Query />} />
      <Route path="/reportGen" element={<ReportGen />} />
    </Routes>
    <App />
    <Footer />
  </Router>
  );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

