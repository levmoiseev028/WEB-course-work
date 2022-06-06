document.addEventListener('DOMContentLoaded', function() {//после того как сформировалась разметка страницы
    const table = document.getElementById('my-table');

    const headers = table.querySelectorAll('th');//получаем все заголовки
    const tableBody = table.querySelector('tbody');//получаем нашу таблицу
    
    const rows = tableBody.querySelectorAll('tr');//получаем все строки нашей таблицы

    // Массив направлений сортировки
    const directions = Array.from(headers).map( function() {
        return 1;
    });

    // Преобразовать содержимое данной ячейки в заданном столбце
    const convert = function(index, content) {
        switch (headers[index].getAttribute('type')) {
            case 'number':
                return parseFloat(content);
            case 'string':
                return content;
            default:
                return content;
        }
    };

    const sortColumn = function(index) {
       
        const currentRows = Array.from(rows);

        currentRows.sort(function(rowA, rowB) {

            const a = convert(index, rowA.querySelectorAll('td')[index].innerHTML);
            const b = convert(index, rowB.querySelectorAll('td')[index].innerHTML);    

            switch (true) {
                case a > b: return 1 * directions[index];
                case a < b: return -1 * directions[index];
                case a == b: return 0;
            }
        });

        //меняем направление сортировки
        directions[index] = -directions[index];

        //удаляем все строки
        while(tableBody.rows[1]){
            tableBody.deleteRow(1);
        }

        //добавляем новые строки
        currentRows.forEach(function(currentRow) {
            tableBody.appendChild(currentRow);
        });
    };
    //устанавливаем для каждого столбца обработчик нажатия
    headers.forEach(function(header, index) {
        header.addEventListener('click', function() {
            sortColumn(index);
        });
    });
    
    let input = document.getElementById('search');
    //функция для поиска в строках подстроки
    input.addEventListener('input', function() {
        let inputText = input.value.toLowerCase();

        for (let i = 1; i < table.rows.length; i++) {
            let searched = false;
            for ( j =  0; j < table.rows[i].cells.length; j++) {
                if (searched = table.rows[i].cells[j].innerHTML.toLowerCase().includes(inputText)){
                    break;
                }
            }
            if (searched) {
                table.rows[i].style.display = "";
            } else {
                table.rows[i].style.display = "none";
            }
        }
    });

});
