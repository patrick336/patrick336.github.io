var modal = $('#myModal');
var btn = $('.btn-modal');
var span = $('.close');
span.click(function () {
    modal.css({
        'display': 'none'
    });
});
$('.over').click(function (event) {
    modal.css({
        'display': 'none'
    });
});