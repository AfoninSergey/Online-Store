npm run server
npm start

ОБЛАСТИ ХРАНЕНИЯ ДАННЫХ:

-   БД (db) на JSON Server
-   BFF
-   Redux Store

СУЩНОСТИ ПРИЛОЖЕНИЯ:
-   Комбайны (combines): 			БД (список Комбайнов),
    								Redux Store (для отображения в браузере)

-   Запчасти (parts) 				БД (список Запчастей),
   									Redux Store (для отображения в браузере)

-   Пользователи (users):			БД (список Зарегестрированных Пользователей),
    								BFF (текущая сессия Пользователя),
   									Redux Store (для отображения в браузере)

-   Статус клиента (status):		БД (список Статусов),
    								BFF (текущая сессия Клиента со статусом),
    								Redux Store (для использования на клиенте - Отображение нужной скидки/цены)

-	Роль (role):                   	БД (список Ролей),
									BFF (текущая сессия Клиента с ролью),

-   Корзина покупок (cart):			Redux Store (для отображения в браузере и отправки заявки)

ТАБЛИЦЫ (СХЕМЫ) БД:
-   Комбайны (combines): id / name

-   Запчасти (parts): id / image_url / number / name / quantity / price / combine_id

-   Статус клиента (statuses): id / name / limit

-	Роль (role): id / name

-   Пользователи (users): id / login / password / role_id / status_id / amount

ТАБЛИЦЫ (СХЕМЫ) BFF:

-   user-session: login / password / role / status

ТАБЛИЦЫ (СХЕМЫ) Redux Store:

-   combine(s): id / name
-   part(s): id / imageUrl / article / name / quantity / price / combineId
-   user: id / login / roleId / statusId / amount / session
-   cart: parts: [part_id / quantity] / quantity / amount