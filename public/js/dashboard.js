$(function () {

    $('#file').css('display', 'none');
    var email = $('#email').val();

    $.post('dashboard/profile', {email: email}, function (e) {
        // $('.lastname').text('Hi! '+e[0].lastname);
        // console.log(e[0].image);
        if (e[0].image === null) {
            $('.display-pic').html('<img alt="" class="circle responsive-img valign profile-image" src="public/image/pic/avatar.png">');
        } else {
            $('.display-pic').html('<img alt="" class="circle responsive-img valign profile-image" src="public/image/pic/' + e[0].image + '">');
        }
    }, 'json');


    $(document).on('change', '#file', function () {
        var property = document.getElementById('file').files[0];
        var user = $('#email').val();
        var image_name = property.name;
        var image_extension = image_name.split('.').pop().toLowerCase();
        if (jQuery.inArray(image_extension, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            alert('Invalid image File');
        }
        var image_size = property.size;
        if (image_size > 2000000) {
            alert('Image File Size is very big');
        } else {
            var form_data = new FormData();
            form_data.append("file", property);
            form_data.append("email", user);
            var processFile = $.ajax({
                url: 'dashboard/updateProfilePicture',
                method: 'post',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false
            });
            $('.display-pic').html('<div class="preloader-wrapper small active">\n\
<div class="spinner-layer spinner-green-only"><div class="circle-clipper left">\n\
<div class="circle"></div></div><div class="gap-patch"><div class="circle">\n\
</div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');
            processFile.done(function (data, textStatus, jqXHR) {
                $('.display-pic').html(data);
            });
            processFile.fail(function (jqXHR, textStatus, errorThrown) {
                alert("Wrong credentials (" + textStatus + ")." + jqXHR.responseText);
                console.log(textStatus);
                return false;
            });
        }
    });
// End of updating profile picture


// Get all appointments
    var todayDate = new Date().toISOString().slice(0, 10);
    $.post('dashboard/getAppointment', {}, function (e) {
        if (e == '') {
            $('.display-appointment').html('<li class="collection-item avatar email-unread">\n\
                                <span class="circle red">G</span>\n\
                                <span class="email-title">No Title</span>\n\
                                <p class="truncate grey-text ultra-small">You are seeing this because there are no appointment.</p>\n\
                                <a href="#!" class="secondary-content email-time"><span class="blue-text ultra-small">' + todayDate + '</span></a>\n\
                            </li>')
        }
        for (var i = 0; i < e.length; i++) {
            $('.display-appointment').append('<a href="#" class="opening" data-appoint="' + e[i].appointment_id + '"><li class="collection-item avatar email-unread">\n\
                                <span class="circle red">G</span>\n\
                                <span class="email-title">' + e[i].subject + '</span> - \n\
                                <span class="email-time">' + e[i].email + '</span>\n\
                            <p class="truncate grey-text ultra-small"><span class="email-title">Appointment Time:</span>' + e[i].time + '\
                                  <span class="email-title">; Date:</span> ' + e[i].date + ' </p>\n\
                                <p class="truncate grey-text ultra-small">' + e[i].description + '</p>\n\
                                <p class="truncate grey-text ultra-small bold">Approval status: <span class="approve-status email-title grey lighten-3">' + e[i].approve_status + '</span></p>\n\
                                <a href="#!" class="secondary-content email-time"><span class="blue-text ultra-small">' + e[i].today_date + '</span></a>\n\
                            </li></a>');
        }
        
         $('.opening').on('click', function (e) {
            e.preventDefault();

            var appoint_id = $(this).data('appoint');


            $.post('dashboard/approveAppointment', {appoint_id: appoint_id}, function (e) {
                if (e.message == 'a') {
                    
                    $('.approve-status').html('Approved');
                    
                    location.reload();
                    return false;
                }
                if (e.message == 'd') {
                    $('.approve-status').html('Disapproved');
                    location.reload();
                    return false;
                }
                if (e.message == 'p') {
                    $('.approve-status').html('Pending');
                    location.reload();
                    return false;
                }
                
                return false;

            }, 'json');

        });
        


    }, 'json');
    
   



});
