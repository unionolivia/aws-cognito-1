$(function () {
    $('.datepicker').pickadate({
        disable: [
            {from: [0, 0, 0], to: true},
            1,
            7
        ]
    });


    $('.timepicker').pickatime({
        disable: [
            [0, 30],
            [1, 0],
            [1, 30],
            [2, 0],
            [2, 30],
            [3, 0],
            [3, 30],
            [4, 0],
            [4, 30],
            [5, 0],
            [5, 30],
            [6, 0],
            [6, 30],
            [7, 0]
            [18, 0],
            [18, 30],
            [19, 0],
            [19, 30],
            [20, 0],
            [20, 30],
            [21, 0],
            [21, 30],
            [22, 0],
            [22, 30],
            [23, 0],
            [23, 30]

        ]
    });

    // Let's send appointment to admin
    $('.send-appointment').on('click', function (e) {
        e.preventDefault();


        var date = $('#date').val();
        var email = $('#email').val();
        var time = $('#time').val();
        var subject = $('#subject').val();
        var description = $('#description').val();

        $.post('patient/getPersonID', {email: email}, function (e) {

            var person_id = e[0].person_id;

            // Let's send appointment details to the Dentist
            var sendDetail = $.ajax({
                type: 'POST',
                url: 'patient/sendAppointment',
                data: {person_id: person_id, date: date, time: time, subject: subject, description: description},
                dataType: 'json'
            });

            $('.loading').html('<div class="preloader-wrapper small active">\n\
<div class="spinner-layer spinner-green-only"><div class="circle-clipper left">\n\
<div class="circle"></div></div><div class="gap-patch"><div class="circle">\n\
</div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');

            sendDetail.done(function (data, textStatus, jqXHR) {
                if (data.message === true) {
//                swal("Unit created!", "", "success")
                    swal({title: "Appointment",
                     text: "Successfully sent!",   
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#bbdefb",
                        confirmButtonText: "OK",
                        closeOnConfirm: true},
                            function () { 
//                               window.location.replace('category');
                            });

                    false;
                }
                if (data.message === false) {
                    swal("Appointment not sent!", "", "warning")
                }
            });
            
            sendDetail.fail(function (jqXHR, textStatus, errorThrown) {
            swal("Appointment not sent!", "", "warning")

            return false;
        });

        sendDetail.always(function (data, textStatus, jqXHR) {
            $('.loading').css('display', 'none');
            return false;
        });

        }, 'json');

        ;

    });

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
                url: 'patient/updateProfilePicture',
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

    $('#searchbox').on('keyup', function () {
        var searchString = $(this).val();

        if (searchString === '') {
            $('.searchres').html('');
            return false;
        } else {
            $.post('patient/searchOnTheSite', {string: searchString}, function (e) {

                if (e == '') {
                    $('.searchres').html('<li class="collection-item">Sorry! no result found.</li>');
                    return false;
                } else {
                    for (var i = 0; i < e.length; i++) {
                        $('.searchres').html('<a class="search-click search_visit" data-categoryid="' + e[i].category_id + '" href=""><li class="collection-item">' + e[i].description + '</li></a>');

                    }

                    $('.search-click').on('click', function (e) {
                        e.preventDefault();
                        var categoryid = $(this).data('categoryid');

                        $.redirect('search', {categoryid: categoryid});

                    });
                }
            }, 'json');
        }
    });


    // Close the modal 
    $('.back-button').modal('close');


});
