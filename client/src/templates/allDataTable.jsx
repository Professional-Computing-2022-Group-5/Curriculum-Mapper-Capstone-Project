import React from "react";
import Table from "react-bootstrap/Table";

const AllDataTable = ({data}) => {
    //change this to var nHeadData = ["id", "label", "displayName", "color"] when the backend workd
    var nHeadData = ["id", "unitCode", "title"]
    var nBodyData = data.nodes
    //console.log("nHEADDATE")
    //console.log(nHeadData)

    var lHeadData = ["id", "source", "target"]
    //var lBodyData = data.links

    var lBodyData = []

    for (var i = 0; i < data.links.length; i++) {
        lBodyData.push({
            "id": data.links[i].property.id,
            "source": data.links[i].source.id,
            "target": data.links[i].target.id
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

 
export default AllDataTable;