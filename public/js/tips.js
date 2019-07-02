jQuery(function () {

    $('.add').on('click', function (e) {
        e.preventDefault();
        $('#modals').openModal();

        return false;
    });
    var userTable = $('#data-table-simple').dataTable();
    $.get('tips/getTips', function (e) {

//        console.log(e[0].person_id, e[1].firstname);
        console.log(e);
        userTable.fnClearTable();
        for (var i = 0; i < e.length; i++) {
            userTable.fnAddData([e[i].tip_id, e[i].name, e[i].description, '<img src="public/image/pic/' + e[i].image + '" alt="" class="responsive-img">', e[i].date_added, '']);
//                '&nbsp; <a class="edit-unit" data-name=' + e[i].name + ' data-edit="' + e[i].tip_id + '" href=""><i class="mdi-editor-border-color"></i></a>']);
        }
    }, 'json');

//    Add Unit to the DB
//    $('.add-details').on('click', function (e) {
//        e.preventDefault();
//
//        var name = $('#name').val();
//        var description = $('#description').val();
//
//        var adding = $.ajax({
//            type: 'POST',
//            url: 'tips/addtips',
//            data: {name: name, description: description},
//            dataType: 'json'
//        });
//        $('.loading').html('<div class="preloader-wrapper small active">\n\
//<div class="spinner-layer spinner-green-only"><div class="circle-clipper left">\n\
//<div class="circle"></div></div><div class="gap-patch"><div class="circle">\n\
//</div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');
//        adding.done(function (data, textStatus, jqXHR) {
//            if (data.message === true) {
////                swal("Unit created!", "", "success")
//                swal({title: "Tips created",
////              text: "You will not be able to recover this imaginary file!",   
//                    type: "success",
//                    showCancelButton: false,
//                    confirmButtonColor: "#bbdefb",
//                    confirmButtonText: "OK",
//                    closeOnConfirm: false},
//                        function () {
////              swal("Deleted!", "Your imaginary file has been deleted.", "success"); 
//                            window.location.replace('tips');
//                        });
//                        
//                        false;
//            }
//            if (data.message === false) {
//                swal("Tips not created!", "", "warning")
//            }
//        });
//
//        adding.fail(function (jqXHR, textStatus, errorThrown) {
////            alert("Wrong credentials (" + textStatus + ")." + jqXHR.responseText);
////            console.log(textStatus);
//            swal("Tips not created!", "", "warning")
//
//            return false;
//        });
//
//        adding.always(function (data, textStatus, jqXHR) {
//            $('.loading').css('display', 'none');
//            return false;
//        });
//
//        return false;
//    });


// Adding Tips
    $("#forms").submit(function (event) {

        //disable the default form submission
        event.preventDefault();

        //grab all form data  
        var formData = new FormData($(this)[0]);
        $('.loading').html('<div class="preloader-wrapper small active">\n\
<div class="spinner-layer spinner-green-only"><div class="circle-clipper left">\n\
<div class="circle"></div></div><div class="gap-patch"><div class="circle">\n\
</div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');

        var adding = $.ajax({
            url: 'tips/addTips',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json'
        });

        adding.done(function (data, textStatus, jqXHR) {
            if (data.message === true) {
//                swal("Unit created!", "", "success")
                swal({title: "Tips created",
//              text: "You will not be able to recover this imaginary file!",   
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#bbdefb",
                    confirmButtonText: "OK",
                    closeOnConfirm: false},
                        function () {
//              swal("Deleted!", "Your imaginary file has been deleted.", "success"); 
                            window.location.replace('tips');
                        });

                false;
            }
            if (data.message === false) {
                swal("Tips not created!", "", "warning");
            }
        });

        adding.fail(function (jqXHR, textStatus, errorThrown) {
//            alert("Wrong credentials (" + textStatus + ")." + jqXHR.responseText);
//            console.log(textStatus);
            swal("Tips not created!", "", "warning");

            return false;
        });

        adding.always(function (data, textStatus, jqXHR) {
            $('.loading').css('display', 'none');
            return false;
        });


        return false;
    });


});