from py2neo import Graph,NodeMatcher,cypher,Node,Relationship
import json

# graphDB -> Connect the neo4j database
# Graph("neo4j is running on localhost and port 7474", auth=("neo4j_username", "neo4j_password"))
graphDB = Graph("http://localhost:7474", auth=("neo4j","test"))

def search_by_query(query):
    try:
        # query -> neo4j cypher query from the user input
        # run(): execute the query and return the result
        # data(): format the result (a list of dict)
        queryResult = graphDB.run(query).data()  #[dict,dict,dict, ...]
        list_data = []  #[Path/Node, Path/Node, Path/Node, ...]

        # "i" is a dict type
        for i in queryResult: 
            list_data.extend(i.values())

        # "item" is a Path/Node object
        for i, item in enumerate(list_data):
            #get Node object from Path object
            list_data[i] = list_data[i].nodes 
        return list_data 
    except:
        # return error message if the query is invalid
        return {'status': 'error'}


