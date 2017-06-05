var graph = {};

function loadGraph(s)
{
	var objID = s['const'][1]['_id'];
	graph[objID] = [];
	graph[objID].push(objID);
	jQuery.ajax({
		type:'GET',
		url: "http://stat1.lomonosov.parallel.ru:4448/view/attributes?names=_id&path=obj(_id==" + objID + ").out_n(type==contain)",
		contentType: "application/json",
		dataType: "jsonp",
		crossDomain: true,
		cache: true,
		error:function(d, textStatus, error) {
			console.log("Загрузка данных не вышла, ",s['const'][1]['_id']);
		},
		success: function(json) {
			// alert(json.data[0][0]["_id"]);
			if (typeof(json.data) == "object") {
				for (var i = 0; i < json.data.length; i++)
				{
					graph[objID].push(json.data[i][0]["_id"]);
				}
			}
		}
	});
	jQuery.ajax({
		type:'GET',
		url: "http://stat1.lomonosov.parallel.ru:4448/view/attributes?names=_id&path=obj(_id==" + objID + ").out_n(type==contain).out_n(type==contain)",
		contentType: "application/json",
		dataType: "jsonp",
		crossDomain: true,
		cache: true,
		error:function(d, textStatus, error) {
			console.log("Загрузка данных не вышла, ",s['const'][1]['_id']);
		},
		success: function(json) {
			// alert(json.data[0][0]["_id"]);
			if (typeof(json.data) == "object") {
				for (var i = 0; i < json.data.length; i++)
				{
					graph[objID].push(json.data[i][0]["_id"]);
				}
			}
		}
	});
}

function transformid(param)
{
	var s = param['const'][1]['_id'];
	var temp = s.slice(8,s.length).replace('_','-').split('-').map(Number);
	var res = [0,0,0];
	if (temp.length == 3)
	{
		if (temp[0] <= 2) {
			res[0] = (temp[0]*2+temp[1]-1) * 13;
			res[2] = temp[2] * 6;
		} else {
			res[0] = (temp[0]*2+temp[1]-5) * 13;
			res[2] = temp[2] * 6 - 100;
		}
	} else {
		res[0] = (temp[0]*2-4) * 13;
		res[2] = temp[1] * 6 - 100;
	}
    res[1] = 4;
	return res;
}

var statuses =
{
	"WARNING" : 0xffff00,
	"DANGER" : 0xffa500,
	"CRITICAL" : 0xff0000,
	"INFO" : 0x0000ff
};

var defaultColor = 0x00ee22;

var pathOfObjects = [
{
	"name":"http://user@stat1.lomonosov.parallel.ru:4448/view/entity?path=obj(type==rack)",
	"size":[4,8,4]
}
];

var pathOfRequest = "http://admin:admin@stat1.lomonosov.parallel.ru:4448/control/snapshot?format=jsonp";

var frequencyOfRequests = 10;

function getErrorObjName(s)
{
	return s["usr"]["_id"];
}

function getName(s)
{
	return s['const'][1]['_id'];
}

function getTimeOfError(s)
{
	return s["info"]["time"];
}

function getErrorStatus(s)
{
	return s["info"]["status"];
}
