Intro
==================

Модуль для OcStore ( Opencart )  - Всплывающая корзина. Модуль срабатывает каждый раз при 
нажатии на кнопку "купить". Вид корзины подгружается каждый раз при помощи ajax.

Установка / Настройка
===================

1. Скачиваем модуль
2. Закачиваем файлы в папку с магазином
3. Переходим в панель управления, устанавливаем модуль.
4. В настройках должен быть обязательно указан XPath элемента-триггера по которому будет срабатывать modPopupCart.open();
5. Добавляем "модули" на те страницы, где мы хотим, чтобы появлялась корзина. Позиция значения не имеет.
6. Настраивем внешний вид корзины, либо используем по умолчанию


Особенности
==================

1. Модуль не изменяет ни одного родного файла магазина
2. Файл с оформлением ( popupcart.css )также может быть переопределен как и шаблон отображения корзины
( popupcart/index.tpl , popupcart/load.tpl ), достаточно разместить файлы в соотв. папке с текущей темой.
3. JS код выделен в отдельный модуль, а также определены методы управления этим модулем, поэтому при необходимости
можно без труда изменить стандартную функциональность.
4. Закрыть окно можно несколькими разными способами: клавиша ESC, клик по области вокруг окна, клик по крестику в title окна.