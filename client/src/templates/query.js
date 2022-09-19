import React from "react";
import GraphComponent from "./graphComponent.js";
import FilterComponent from "./filterComponent.js";


const Query = () => {

    return ( 
        <div class="container">

            <div class="row col-lg-6">
            <FilterComponent/>
            </div>
            <div id="crudCommand" class="row col-lg-6"/>

            <div class="row align-items-center" >
            <GraphComponent/>
            </div>


            <div class="row align-items-center my-5"/>

            <p className="filer-section">

            </p>

        </div>


);
}

export default Query;

