// KLASA KOLUMN
function Column(id, name) {

    var self = this;
    this.id = id;
    this.name = name || 'Nie podano nazwy';
    this.element = createColumn();

    function createColumn() {
        // Tworzenie kodu HTML dla widoku
        var column = $('<div class="column"></div>');
        var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
        var columnCardList = $('<ul class="card-list"></ul>');
        var columnChangeName = $('<button class="btn column-add-card absolute"><i class="fa fa-pencil"></i></button>');
        var columnDelete = $('<button class="btn-delete"><i class="fa fa-times" aria-hidden="true"></i></button>');
        var columnAddCard = $('<button class="btn column-add-card block-center">Dodaj kartę</button>');

        columnChangeName.click(function (e) {
            
            $('#myModal').css({ 'display': 'block' });
            getFormData(wyslij_formularz);
            function wyslij_formularz(e,field) {
                    
                e.preventDefault();
                if(field.length == 0 ) field='Nie podano nazwy';
                    
                $.ajax({
                    url: baseUrl + '/column/' + self.id,
                    method: 'PUT', 
                    data: {
                        name: field, 
                        id: self.id
                    }, 
                    success: function (response) {
                        form.off('submit');
                        columnTitle.text(field);
                        input.val('');
                        $('#myModal').css({
                            'display': 'none'
                        });
                    }, 
                    error: function () {
                        alert('Wystąpił błąd połączenia z serwerem.');
                    }
                });
            }
            e.preventDefault();
        });
        columnDelete.click(function () {
            self.deleteColumn();
        });

        columnAddCard.click(function (event) {
            
            event.preventDefault();
            $('#myModal').css({
                'display': 'block'
            });
            
            var input = $('#name');
            var form = $('#form');
            
            form.on('submit',function(e){
                e.preventDefault();
                
                
                $.ajax({
                    url: baseUrl + '/card', 
                    method: 'POST', 
                    data: {
                        name: input.val(), 
                        bootcamp_kanban_column_id: self.id
                    }, 
                    success: function (response) {
                        form.off('submit');
                        var card = new Card(response.id, input.val(), self.id);
                        self.createCard(card);
                        input.val('');
                        $('#myModal').css({
                            'display': 'none'
                        });
                    }
                });
            });
        });
        // Tworzenie widoku 
        column.append(columnTitle)
              .append(columnChangeName)
              .append(columnDelete)
              .append(columnAddCard)
              .append(columnCardList);
        
        return column;
    }
}
Column.prototype = {
    createCard: function (card) {
        this.element.children('ul').append(card.element);
    }, 
    deleteColumn: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id, 
            method: 'DELETE', 
            success: function (response) {
                self.element.remove();
            }
        });
    }
};