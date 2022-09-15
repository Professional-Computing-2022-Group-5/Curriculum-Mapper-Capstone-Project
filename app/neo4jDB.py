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

def create_by_user(data):
    for item in data:
        #create a empty node object（source_node）
        source_node = Node()
        #get the data from the frontend (label,name)
        for (key,value) in zip(item['source'].keys(),item['source'].values()):
            if key == 'label':
                #assign a name to the previously created node object
                source_node.add_label(value)
            else:
                #add properties other than label(name, age, height, weight ...)
                source_node[key] = value
        #query whether the current node already exists in the database (check both label and name)
        source_match = NodeMatcher(graphDB).match(item['source']['label'],name=item['source']['name'])
        if source_match.__len__() == 0:
            #not exist: add the currently created node(source_node) to the database
            graphDB.create(source_node)
        else:
            #exist: directly copy the queried node to source_node
            source_node = source_match.first()

        #same as above, just processing the target node
        target_node = Node()
        for (key,value) in zip(item['target'].keys(),item['target'].values()):
            if key == 'label':
                target_node.add_label(value)
            else:
                target_node[key] = value
        target_match = NodeMatcher(graphDB).match(item['target']['label'], name=item['target']['name'])
        if target_match.__len__() == 0:
            graphDB.create(target_node)
        else:
            target_node = target_match.first()

        #handling the relationship
        rel_match = RelationshipMatcher(graphDB) #create a query object
        for (key,value) in zip(item['relationship'].keys(),item['relationship'].values()):
            if key == 'label':
                #relationship object :（‘startNode’, 'knows', 'endNode'）
                rel = Relationship(source_node,value,target_node)
                #any properties except label are added to the relationship object
                for (key1, value1) in zip(item['relationship'].keys(), item['relationship'].values()):
                    if key1 != 'label':
                        rel[key1] = value1
                #Use the previously created query object
                #query whether the current relationship already exists in the database(relationship between source_node and target_node)
                if len(rel_match.match([source_node,target_node],r_type=value)) == 0:
                    graphDB.create(rel)

