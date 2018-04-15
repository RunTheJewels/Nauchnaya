from subprocess import Popen, PIPE
from json import loads, dumps
from loadSettings import *

itemsToChg = set()
# Получаем множество элементов, которые нужно переместить вниз по иерархии
for key in hierExclu:
	for item in hierExclu[key]:
		itemsToChg.add(item)

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
		exclusions = {}
		for item in data:
			d = {}
			for item1 in item:
				d.update(item1)
			if d.get('_id') and d.get('type'):
				if d['_id'] in itemsToChg:
					exclusions[d['_id']] = d['type']
		
		for item in data:
			d = {}
			for item1 in item:
				d.update(item1)
			if d.get('_id') and d.get('type'):
				if d['_id'] in exclusions:
					continue
				d['children'] = []
				getChildren(d, depth-1)
				if d['_id'] in hierExclu:
					for item2 in hierExclu[d['_id']]:
						if item2 in exclusions:
							newd = {'_id':item2, 'type':exclusions[item2], 'children':[]}
							getChildren(newd, depth-1)
							d['children'].append(newd) 
				dest['children'].append(d)
	except ValueError:
		pass

loadGraph(res, depth)

resTree = {'_id': '__graphRoot__', 'type': '__graphRoot__', 'children': res}

with open('graph.json', 'w') as file:
	file.write('var graph = {};'.format(dumps(resTree, indent=4)))

