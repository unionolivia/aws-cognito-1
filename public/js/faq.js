$(function () {


    // Let's add FAQ
    $.get('faq/faqs', function (e) {

        console.log(e);
        if (e == '') {
            $('#faq').html('<li>\n\
                    <div class="collapsible-header">Why am i seeing this?</div>\n\
                    <div class="collapsible-body"><p>It seems there is no FAQs available. Once the dentist set it up,It\'s going to be available.</p>\n\
                    </div></li>');
            $('.collapsible').collapsible();
        } else {
            for (var i = 0; i < e.length; i++) {

                $('#faq').append('<li>\n\
                    <div class="collapsible-header">' + e[i].name + '</div>\n\
                    <div class="collapsible-body"><p>' + e[i].description + '</p>\n\
                    </div></li>');
                $('.collapsible').collapsible();
            }
        }

    }, 'json');


});
