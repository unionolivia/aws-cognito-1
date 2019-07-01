$(function(){
  

       var id = $('#categoryid').val();

    $.post('search/searchResult', {id: id}, function (e) {

            $('.search-result').html('<h4 class="header">'+e[0].name+'</h4>\n\
            <div class="row">\n\
                <div class="col s12 m4 l3">\n\
                    <p></p>\n\
                </div>\n\
                <div class="col s12 m8 l9">\n\
                    <div class="row">\n\
                        <div class="col s12 m8 l9">\n\
                          <div class="card">\n\
                      <div class="card-image">\n\
                        <img src="public/image/pic/'+e[0].image+'" alt="sample">\n\
                        <span class="card-title grey-text text-darken-4">'+e[0].name+'</span>\n\
                      </div>\n\
                      <div class="card-content">\n\
                        <p>'+e[0].description+'</p>\n\
                      </div>\n\
                    </div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>');
        
    }, 'json'); 
    
    /**********************************************************************/
    $.post('search/searchWhereNotEqualToResult', {id: id}, function (e) {
        if (e == ''){
            $('.other-resultss').html('<li class="collection-item avatar">\n\
                        <i class="mdi-file-folder circle"></i>\n\
                        <span class="title">No Tips!</span>\n\
                        <p>Tips Not Available!</p>\n\
                    </li>');
        }
        else{
            for(var i = 0; i < e.length; i++){
//                $('.other-results').append('<li class="collection-item avatar">\n\
//                        <i class="mdi-file-folder circle"></i>\n\
//                        <span class="title">' + e[i].name + '</span>\n\
//                        <p> ' + e[i].description + '  </p>\n\
//                    </li>');
                $('.other-results').append('<div class="col s12 m4 l4">\n\
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
    
    
    
});
