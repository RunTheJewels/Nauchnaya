
# Имя пользователя
user = 'user'
# Пароль
password = ''
# Тип данных, которые будут в корне
startType = 'room'
# Общая часть для всех запросов
basicURL = 'http://{user}:{pwd}@stat1.lomonosov.parallel.ru:4448/view/'.format(user=user, pwd=password)
# Стартовый запрос
startReq = basicURL + 'attributes?names=_id,type&path=obj(type=={startType})'
# Запрос на получение потомков
childrenReq = basicURL + 'attributes?names=_id,type&path=obj(type=={type}).q(_id=={id}).out_n(type==contain)'
# Глубина рекурсии
depth = 2

