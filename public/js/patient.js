$(function () {

    var $containerBlog = $("#blog-posts");
    $containerBlog.imagesLoaded(function () {
        $containerBlog.masonry({
            itemSelector: ".blog",
            columnWidth: ".blog-sizer",
        });
    });

    //  Let's get the User Id
    var user = $('#user').val();

    // Let's add FAQ
    $.get('patient/faq', function (e) {

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

    $.get('tips/getTips', function (e) {
        if (e == '') {
            $('.health-tipss').html('<li class="collection-item avatar">\n\
                        <i class="mdi-file-folder circle"></i>\n\
                        <span class="title">No Tips!</span>\n\
                        <p>Tips Not Available!</p>\n\
                    </li>');
        } else {
            for (var i = 0; i < e.length; i++) {
//                $('.health-tips').append('<li class="collection-item avatar">\n\
//                        <i class="mdi-file-folder circle"></i>\n\
//                        <span class="title">' + e[i].name + '</span>\n\
//                        <p> ' + e[i].description + '  </p>\n\
//                    </li>');
$('.health-tips').append('<div class="col s12 m4 l4">\n\
                    <div class="card">\n\
                        <div class="card-image waves-effect waves-block waves-light">\n\
                            <img class="activator" class="responsive-img" src="public/image/pic/'+e[i].image+'" alt="office">\n\
                        </div>\n\
                        <div class="card-content">\n\
                            <span class="card-title activator grey-text text-darken-4">'+e[i].name+' <i class="mdi-navigation-more-vert right"></i></span>\n\
                            <p><a href="#">'+jQuery.trim(e[i].description).substring(0, 10).split(" ").slice(0, -1).join(" ") + "..."+'</a>\n\
                            </p>\n\
                        </div>\n\
                        <div class="card-reveal">\n\
                            <span class="card-title grey-text text-darken-4">'+e[i].name+' <i class="mdi-navigation-close right"></i></span>\n\
                            <p>'+e[i].description+'</p>\n\
                        </div>\n\
                    </div>\n\
                </div>');

            }
        }
    }, 'json');


    // Getting Appointment Messages
    $.post('patient/appointMsg', {user: user}, function (e) {
        if (e == '') {
            $('.status-message').append('<div id="card-alert" class="card purple">\n\
                    <div class="card-content white-text">\n\
                        <p>INFO : No Messages yet!</p>\n\
                    </div>\n\
                    <button type="button" class="close white-text" data-dismiss="alert" aria-label="Close">\n\
                        <span aria-hidden="true">×</span>\n\
                    </button>\n\
                </div>');
        } else {
            for (var i = 0; i < e.length; i++) {
                $('.info-appoint').html('<div id="card-alert" class="card light-blue">\n\
                      <div class="card-content white-text">\n\
                        <p><i class="mdi-social-notifications"></i> Notification</p>\n\
                      </div>\n\
                    </div>');
                $('.status-message').append('<div id="card-alert" class="card purple">\n\
                    <div class="card-content white-text">\n\
                        <p><i class="mdi-action-info-outline"></i>INFO : Appointment for ' + e[i].date + ' ' + e[i].time + ' is ' + e[i].approve_status + '</p>\n\
                    </div>\n\
                    <button type="button" class="close white-text" data-dismiss="alert" aria-label="Close">\n\
                        <span aria-hidden="true">×</span>\n\
                    </button>\n\
                </div>');
            }
        }
    }, 'json');




});
