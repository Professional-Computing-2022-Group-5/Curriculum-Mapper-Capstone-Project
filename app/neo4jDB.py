from py2neo import Graph,NodeMatcher,cypher,Node,Relationship
import json
from app import api

# graphDB -> Connect the neo4j database
# Graph("neo4j is running on localhost and port 7474", auth=("neo4j_username", "neo4j_password"))
graphDB = Graph("http://localhost:7474", auth=("neo4j","test"))

def search_by_query(query):
    try:
        #using jolt API to get the data to the frontend
        data = api.joltAPI(query) 
        return data
    except:
        # return error message if the query is invalid
        return {'status': 'error'}


