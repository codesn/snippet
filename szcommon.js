jQuery(document).ready(function($){
  var shoemodal = document.getElementById('shoe_modal');
  var mdlclose = document.getElementsByClassName("shoe-close")[0];
  
  $('li.product').matchHeight();
  
  $('li.product a img').each(function(index, element) {
    $(element).wrap("<div class='show-product-thumb'></div>");
  });

  $("ul.products>li>a.woocommerce-LoopProduct-link").on("click",function(e){
    e.preventDefault();
    //console.log('yo clicked');
    shoemodal.style.display = "block";
		
    $("body").addClass("shoe-modal-open");
    
    var product_url = $(this).attr('href');
    console.log('product: '+product_url);
    jQuery.ajax({
      url : shoe.ajaxurl,
      type : 'post',
      data : {
        action : 'shoez_get_product_details',
        product_url: product_url,
        fonce: shoe.fonce,
      },
      success : function( response ) {
        $("#shoe_product_content").html(response);
      }
     });

    return false;
  });



  mdlclose.onclick = function() {
    $("#shoe_product_content").html("<p>Loading..");
    $("body").removeClass("shoe-modal-open");
    shoemodal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == shoemodal) {
        $("#shoe_product_content").html("<p>Loading..");
      	$("body").removeClass("shoe-modal-open")
        shoemodal.style.display = "none";
    }
  }

});
