
$( document ).ready(() => {
    console.log( "Document is ready!" );

    $('[data-js="wishes.wishlist"]').on("click", '.delete-link', function() {
        console.log(`Clicked ${$(this).attr("data-js")}`);
        var id = parseInt($(this).attr("data-js"), 10);

        $.ajax({
            url: `/wishes/${id}`,
            type: 'DELETE',
            success: function(result) {
                console.log("DELETED!");
                location.reload();
            }
        });
    });
});
