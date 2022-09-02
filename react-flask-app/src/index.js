

import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import ForceGraph2D from "react-force-graph-2d";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Navigation,
  Footer,
  Home,
  Query,
  Report_gen
} from "./components";
import "./style.css";

var data = {
  nodes: [{ id: "A"}, { id: "B" }, { id: "C" }, { id: "D" }],
  links: [
    { source: "B", target: "C", value: 8 },
    { source: "C", target: "D", value: 10 },
    { source: "D", target: "A", value: 6 },
    { source: "B", target: "A", value: 6 },
    { source: "B", target: "D", value: 6 },
    { source: "D", target: "D", value: 6, curvature: 0.3 }
  ]
};

function App() {
  const forceRef = useRef(null);
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
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(  
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/query" element={<Query />} />
      <Route path="/report_gen" element={<Report_gen />} />
    </Routes>
    <App />
    <Footer />
  </Router>, rootElement);
