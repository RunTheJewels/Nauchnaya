//Трансформирует параметр _id в нужное смещение
function transformid(s)
{
	var temp = s.slice(8,s.length).replace('_','-').split('-').map(Number);
	var res = [0,0,0];
	if (temp.length == 3)
	{
		if (temp[0] <= 2) {
			res[0] = (temp[0]*2+temp[1]-1) * 13;
			res[2] = (temp[2] - 15) * 6;
		} else {
			res[0] = (temp[0]*2+temp[1]-5) * 13;
			res[2] = temp[2] * 6;
		}
	} else {
		res[0] = (temp[0]*2-4) * 13;
		res[2] = temp[1] * 6;
	}
    res[1] = 4;
	return res;
}
