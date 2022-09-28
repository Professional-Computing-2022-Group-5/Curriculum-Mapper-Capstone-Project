import requests
from requests.auth import HTTPBasicAuth
import base64
import json
from config import JOLT_URL, NEO4j_USER, NEO4j_PASSWORD

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
    res = requests.post(url=JOLT_URL, data=json.dumps(data), headers=header, auth=HTTPBasicAuth(NEO4j_USER, NEO4j_PASSWORD))
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

    # add displayName and color attribute to the return data
    for item in nodes:
        node_data = graphDB.nodes.get(item['id'])
        labels = set(node_data.labels)
        color = {
            'CBoK': 'orange',
            'Outcome': 'green',
            'Unit': 'brown',
            'AQFcategory': 'blue',
            'AQFoutcome': 'pink',
            'Sub': 'purple',
            'Top': 'red'
        }
        item['labels'] = list(labels)
        if 'CBoK' in list(labels):
            item['displayName'] = item['area']
        elif 'Outcome' in list(labels):
            item['displayName']= item['level']
        elif 'Unit' in list(labels):
            item['displayName']= item['title']
        elif 'Course' in list(labels):
            item['displayName'] = item['title']
        elif 'AQFcategory' in list(labels):
            item['displayName'] = item['description']
        elif 'AQFoutcome' in list(labels):
            item['displayName'] = item['description']
        elif 'Activity' in list(labels):
            item['displayName'] = item['activity']
        elif item['name'] != None:
            item['displayName'] = item['name']
        else:
            item['displayName'] = list(labels)[0]

        for label_item in list(labels):
            if label_item in color.keys():
                item['color'] = color[label_item]
                if 'Sub' in list(labels):
                    item['color'] = color['Sub']
                elif 'Top' in list(labels):
                    item['color'] = color['Top']
                break
        if 'color' not in item.keys():
                item['color'] = 'grey'

    for item in links:
        link_data = graphDB.relationships.get(item['property']['id'])
        item['labels'] = type(link_data).__name__
        item['displayName'] = type(link_data).__name__

    # remove duplicate nodes
    id_list = []
    node_list = []
    for node in nodes:
        if node['id'] not in id_list:
            node_list.append(node)
            id_list.append(node['id'])
    
    # remove duplicate links
    linkID_list = []
    link_list = []
    for link_item in links:
        if link_item['property']['id'] not in linkID_list:
            # print(node['id'])
            link_list.append(link_item)
            linkID_list.append(link_item['property']['id'])
    # print(linkID_list)

    return_data['nodes'] = node_list
    return_data['links'] = links
    
    # empty data handling
    if len(nodes) == 0 and len(links) == 0:
        return {'status':'empty_data'}
    else:
        return return_data