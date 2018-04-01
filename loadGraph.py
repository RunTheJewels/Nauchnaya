from subprocess import Popen, PIPE
from json import loads, dumps
from loadSettings import *

res = []

def loadGraph(res, depth):
	stdout, stderr = Popen(['curl', startReq.format(startType=startType)], stdout=PIPE, stderr=PIPE).communicate()
	data = loads(stdout.decode('utf-8'))
	for item in data:
		d = {}
		for item1 in item:
			d.update(item1)
		if d.get('_id') and d.get('type'):
			d['children'] = []
			getChildren(d, depth)
			res.append(d)
		
def getChildren(dest, depth):
	if (depth == 0):
		return
	stdout, stderr = Popen(['curl', childrenReq.format(type=dest['type'], id=dest['_id'])], stdout=PIPE, stderr=PIPE).communicate()
	try:	
		data = loads(stdout.decode('utf-8'))
		for item in data:
			d = {}
			for item1 in item:
				d.update(item1)
			if d.get('_id') and d.get('type'):
				d['children'] = []
				getChildren(d, depth-1)
				dest['children'].append(d)
	except ValueError:
		pass

loadGraph(res, depth)

resTree = {'_id': '__graphRoot__', 'type': '__graphRoot__', 'children': res}

with open('graph.json', 'w') as file:
	file.write('var graph = {};'.format(dumps(resTree, indent=4)))

