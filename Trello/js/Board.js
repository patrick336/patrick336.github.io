var board = {
    name: 'Tablica Kanban', 
    createColumn: function (column) {
        this.element.append(column.element);
        initSortable();
    }, 
    element: $('.column-container')
};
$('.create-column').click(function (e) {
    e.preventDefault();
    $('#myModal').css({
        'display': 'block'
    });
    
    var input = $('#name');
    var form = $('#form');
    
    form.on('submit', function(e){
        e.preventDefault();
            
        $.ajax({
            url: baseUrl + '/column', 
            method: 'POST', 
            data: {
                name: input.val()
            }, 
            success: function (response) {
                form.off('submit');
                var column = new Column(response.id, input.val());
                board.createColumn(column);
                input.val('');
                $('#myModal').css({
                    'display': 'none'
                });
            }
        });
    });
});

function initSortable() {
    $('.card-list').sortable({
        connectWith: '.card-list', 
        placeholder: 'card-placeholder'
    }).disableSelection();
}