$(function () {
    $('.register').on('click', function (e) {
        e.preventDefault();

        // Get form values
        var email = $('#email').val();
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var password = $('#password').val();

        if (email === '') {
            alert('type in a valid email');
            $('#email').focus();
        } else if (firstname === '') {
            alert('Your firstname is important');
            $('#firstname').focus();
        } else if (lastname === '') {
            alert('Your lastname is important');
            $('#lastname').focus();
        } else if (password === '') {
            alert('Use a strong password');
            $('#password').focus();
        } else {


            $('.loading').html('<div class="preloader-wrapper small active">\n\
<div class="spinner-layer spinner-green-only"><div class="circle-clipper left">\n\
<div class="circle"></div></div><div class="gap-patch"><div class="circle">\n\
</div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');

            var registerUser = $.ajax({
                url: 'register/processRegister',
                type: 'POST',
                data: {email: email, firstname: firstname, lastname: lastname, password: password},
                dataType: 'json'
            });


            registerUser.done(function (data, textStatus, jqXHR) {
                if (data.message === true) {
                    swal({title: "Register!",
                        text: "You now have an account with us. Please login to see your dashboard!",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#bbdefb",
                        confirmButtonText: "proceed",
                        closeOnConfirm: false},
                            function () {
//              swal("Deleted!", "Your imaginary file has been deleted.", "success"); 
                                window.location.replace('./');
                            });
                    return false;
                }
                if (data.message === false) {
                    swal("This email is already in use!", "", "warning")
                    return false;
                }


                return false;
            });

            registerUser.fail(function (jqXHR, textStatus, errorThrown) {
                swal("Oops! This email is already in use.", "", "warning");
            });

            registerUser.always(function (data, textStatus, jqXHR) {
                $('.loading').css('display', 'none');
                return false;
            });

        }

    });


});
