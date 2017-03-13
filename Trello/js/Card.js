// KLASA KANBAN CARD
function Card(id, name, kanban_id) {
    var self = this;
    this.id = id;
    this.name = name || 'Nie podano nazwy';
    this.kanban_id = kanban_id;
    this.element = createCard();

    function createCard() {
        var card = $('<li class="card"></li>');
        var btnGroups = $('<span class="btn-group"></span');
        var cardChangeName = $('<button class="btn column-add-card"><i class="fa fa-pencil"></i></button>');
        var cardDeleteBtn = $('<button class="btn column-add-card"><i class="fa fa-trash-o"></i></button>');
        var cardDescription = $('<p class="card-description"></p>');
        cardChangeName.click(function (e) {
            e.preventDefault();
            
            $('#myModal').css({
                'display': 'block'
            });
            
            var input = $('#name');
            var form = $('#form');
            
            
            
            form.on('submit', function (e) {
                e.preventDefault();
                var field = input.val();
                if(field.length == 0 ) field='Nie podano nazwy';
                
                $.ajax({
                    url: baseUrl + '/card/' + self.id, 
                    method: 'PUT', 
                    data: {
                        id: self.id, 
                        name: field, 
                        bootcamp_kanban_column_id: self.kanban_id
                    }, 
                    success: function (response) {
                        form.off('submit');
                        cardDescription.text(field);
                        input.val('');
                        $('#myModal').css({
                            'display': 'none'
                        });
                    }, 
                    error: function (response) {
                        alert('Wystąpił błąd połączenia z serwerem.');
                    }
                });
            });
        });
        cardDeleteBtn.click(function () {
            self.removeCard();
        });
        btnGroups.append(cardChangeName).append(cardDeleteBtn);
        card.append(btnGroups);
        cardDescription.text(self.name);
        card.append(cardDescription)
        return card;
    }
}
Card.prototype = {
    removeCard: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id, 
            method: 'DELETE', 
            success: function () {
                self.element.remove();
            }, 
            error: function () {
                alert('Wystąpił błąd połączenia z serwerem.');
            }
        });
    }
}