import requests
import base64
import json
url = 'http://127.0.0.1:7474/db/data/transaction'
auth = str(base64.b64encode(f'Username:neo4j,Password:test'.encode('utf-8')), 'utf-8')
header = {
    'Authorization': f'Basic {auth}',
    "content-type":'application/json'
}

def joltAPI(query):
    data = {   
        "statements" : [{
            # "statement": "MATCH (u:Unit{unitCode:'CITS4009'}) OPTIONAL MATCH r=(u)-[:Unit_Outcome]-(:Outcome) RETURN r"
            "statement": query
        }]
    }

    res = requests.post(url=url,data=json.dumps(data),headers=header)
    all_data = json.loads(res.text)['results']
    return_data = {}
    nodes = []
    links = []
    for item in all_data:
        if len(item['data']):
            for item1 in item['data']:
                for row,meta in zip(item1['row'],item1['meta']):
                    link = {}
                    node = {}
                    for (rowItem,metaItem) in zip(row,meta):
                        print(rowItem,metaItem)
                        if metaItem['type'] == 'node':
                            node ={**rowItem,**metaItem}
                        if metaItem['type'] == 'relationship':
                            rel_property = {**rowItem,**metaItem}
                        nodes.append(node)
                    if len(meta) > 1:
                        link['source'] = meta[0]['id']
                        link['target'] = meta[2]['id']
                        links.append(link)
                    link['property'] = rel_property
    return_data['nodes'] = nodes
    return_data['links'] = links
    return return_data