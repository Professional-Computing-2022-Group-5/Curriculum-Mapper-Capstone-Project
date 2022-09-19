import requests
from requests.auth import HTTPBasicAuth
import base64
import json
url = 'http://127.0.0.1:7474/db/data/transaction'
header = {
    "content-type":'application/json'
}

def joltAPI(user_query):
    data = {   
        "statements" : [{
            "statement": user_query
        }]
    }
    # database authentication
    res = requests.post(url=url, data=json.dumps(data), headers=header, auth=HTTPBasicAuth('neo4j','test'))
    # load json data from response
    all_data = json.loads(res.text)['results']
    # initialize return data
    return_data = {}
    nodes = []
    links = []
    # iterate all data
    for item in all_data:
        if len(item['data']):
            for item1 in item['data']:
                #array mapping
                if len(item1['row']) > 0:
                    if type(item1['row'][0]).__name__ == 'list':
                        for row,meta in zip(item1['row'],item1['meta']):
                            link = {}
                            node = {}
                            #element mapping
                            for (rowItem,metaItem) in zip(row,meta):
                                if metaItem['type'] == 'node':
                                    # property merge
                                    node ={**rowItem,**metaItem}
                                if metaItem['type'] == 'relationship':
                                    rel_property = {**rowItem,**metaItem}
                                nodes.append(node)
                            if len(meta) > 1:
                                link['source'] = meta[0]['id']
                                link['target'] = meta[2]['id']
                                links.append(link)
                            link['property'] = rel_property
                    elif type(item1['row'][0]).__name__ == 'dict':
                        link = {}
                        node = {}
                        rel_property = {}
                        for row, meta in zip(item1['row'], item1['meta']):
                            if meta['type'] == 'node':
                                # property merge
                                node = {**row, **meta}
                            if meta['type'] == 'relationship':
                                rel_property = {**row, **meta}
                            nodes.append(node)
                        if len(item1['meta']) > 1:
                            link['source'] = item1['meta'][0]['id']
                            link['target'] = item1['meta'][2]['id']
                            links.append(link)
                        link['property'] = rel_property
    return_data['nodes'] = nodes
    return_data['links'] = links
    # empty data handling
    if len(nodes) == 0 and len(links) == 0:
        return {'status':'error'}
    else:
        return return_data