
jQuery(document).ready(function(){
var t = $('#tabledata').DataTable({
"bFilter": true,
"ordering": false
} );

var table = $("#example").DataTable({
"ordering": false
});
var table2 = $("#example2").DataTable({
"ordering": false
});
var counter = 1;
 
    var config = {
    apiKey: "AIzaSyDzX6bcDK4NyCetQd-QzUfRVctHNgko5QI",
    authDomain: "insightswebb.firebaseapp.com",
    databaseURL: "https://insightswebb.firebaseio.com",
    projectId: "insightswebb",
    storageBucket: "insightswebb.appspot.com",
    messagingSenderId: "683598060327"
  };
  firebase.initializeApp(config);
  //get the element at object id
	var storage = firebase.storage();

	var urlsss = '';
	var name = '';
	var datbaseref = firebase.database().ref('users');
	var storageRef = '';
	var uploaderbutton = document.getElementById('ups');
	//var uploaderprog = document.getElementById('uploaderprog');
	// create a ref object
	uploaderbutton.addEventListener('change', function(e){
	$('#loader-icon').show();
	var file = e.target.files[0];
	name = file.name;
	var storageRef = firebase.storage().ref('photo/' + file.name);
	var task = storageRef.put(file);
	task.on('state_changed',
  function progress(snapshot){
  //var percentage = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
  //uploaderprog.value = percentage;
//$('#loader-icon').hide();         
  },
  
  function error(err){
  
  },
  
  function complete(){
  $('#loader-icon').hide(); 
  $('#sucessmsg').show();
  $("#sucessmsg").fadeOut(10000);
  }
  );
    urlsss = 'photo/'+name;

});
  

var html='';
datbaseref.once('value', function(snapshot) {
 // var $i = 0;
 // var $j = 0;
  snapshot.forEach(function(childSnapshot) {
    var image;
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
     
      
     storage.ref(childData.image).getDownloadURL().then(function(url) {
  $('.loader1').fadeOut();
  $('.top_add').show();
      jQuery('#urlvalue').val(url);
     
    /* html = '<tr class="trtabel"><td>'+childData.title+'</td><td>'+childData.date+'</td><td>'+childData.content_type+'</td><td>'+childData.key_topic+'</td><td>'+childData.content+'</td><td class="imagesrc"><a href="'+url+'" target="_blank"><
put class="btn-success" type="button" value="view doc"></a><button class="successid" data-id="'+childKey+'">Success</button></td></tr>';*/
     var dataSet = [childData.title, childData.date,childData.content_type,childData.key_topic,'<a href="'+url+'" target="_blank"><input class="btn-success" type="button" value="view doc"></a><button class="successid" data-id="'+childKey+'" style="background: transparent;color:green">Success</button>'];
table.rows.add([dataSet]).draw();
      console.log(url);
      jQuery('#userdata').append(html);
     
  });

      
      //html += '<tr  class="trtabel'+$i+'"><td>'+childData.title+'</td><td>'+childData.date+'</td><td>'+childData.content_type+'</td><td>'+childData.key_topic+'</td><td>'+childData.content+'</td><td><input type="button" class="btn-click" data-im="'+childData.image+'" value="view doc" /></td></tr>';
 //$i++;
  });
      
     // jQuery('#userdata').html(html);       
});

   /*jQuery("#upload").on("click", function (e) {
       
       
        if(jQuery("#title").val() == ''){
          jQuery('#title').after('<p>This field is required</p>');
        }
        else if(jQuery("#content_type").val() == ''){
          jQuery('#content_type').after('<p>This field is required</p>');
        } else if(jQuery("#key_topic").val() == ''){
          jQuery('#key_topic').after('<p>This field is required</p>');

        }else if(jQuery("#content_type").val() == ''){
          jQuery('#content_type').after('<p>This field is required</p>');

        }else if(jQuery("#content").val() == ''){
          jQuery('#content').after('<p>This field is required</p>');
        }
        else{
        var data={
      title:jQuery("#title").val(),
      date:jQuery("#date").val(),
      content_type:jQuery("#content_type").val(),
      key_topic:jQuery("#key_topic").val(),
      content:jQuery("#content").val(),
      
      image:urlsss
    }
     datbaseref.push(data);

     window.location='http://localhost:2368/nlpold/';
    }
   
    });*/
       $("#form").on('submit',(function(e) {
      e.preventDefault();
       
       // var file = $("#files")[0].files[0];
        //var upload = new Upload(file);
    
        // maby check size or type here with upload.getSize() and upload.getType()
    
        // execute upload
        //upload.doUpload();
        if(jQuery("#title").val() == ''){
          jQuery('#title').after('<p>This field is required</p>');
        }
        else if(jQuery("#content_type").val() == ''){
          jQuery('#content_type').after('<p>This field is required</p>');
        } else if(jQuery("#key_topic").val() == ''){
          jQuery('#key_topic').after('<p>This field is required</p>');

        }else if(jQuery("#content_type").val() == ''){
          jQuery('#content_type').after('<p>This field is required</p>');

        }else if(jQuery("#content").val() == ''){
          jQuery('#content').after('<p>This field is required</p>');
        }
        else{
        
    $.ajax({
		url: "https://practice.aisolutions.ai/api/nlp/",
		headers: {  'Access-Control-Allow-Origin': 'https://practice.aisolutions.ai/api/nlp/' },
		type: "POST",
		data:  new FormData(this),
		contentType: false,
		cache: false,
		processData:false,
		dataType: "json",
		success: function(data)
      {
          console.log(data);
  //$("#statesdata").html(data);
  
  var datas={
      title:jQuery("#title").val(),
      date:jQuery("#date").val(),
      content_type:jQuery("#content_type").val(),
      key_topic:jQuery("#key_topic").val(),
      content:jQuery("#content").val(),
      image:urlsss,
      keywords:data.keywords,
      sentiment:data.sentiment,
      topic_keywords: data.topic_keywords,
      Coherence_Score: data.Coherence_Score
     
    }
     datbaseref.push(datas);
	
		window.location.reload();
      },
              
    });

     //window.location='https://manattosphere.ml/nlp/';
    }
   
     }));

  //get indival data

jQuery(document).on("click",'.successid', function (e) {
  

  //alert("hello");
      var keyid = $(this).attr('data-id');
      datbaseref.once('value', function(snapshot) {
 // var $i = 0;
 // var $j = 0;
  snapshot.forEach(function(childSnapshot) {

    var image;
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
     if(keyid == childKey){
      console.log(childData);
       $("#title1").val(childData.title);
       $("#date1").val(childData.date);
       $("#content_type1").val(childData.content_type);
       //$("#select2-selection__rendered").html(childData.content_type);
  
       $("#key_topic1").val(childData.key_topic);
       $("#content1").val(childData.content);
       var html='';
    
     var htmldiv = '';
    var pagination = '<div class="col-12 pagei"><ul class="pagination">';
     var $j = 1;
  var i=1
     jQuery.each( childData.keywords, function( key, value ) {
       var activepage = '';
       var active_pi = '';
      
         key = key+1; 

     
   htmldiv += '<div class="pb-3 col-lg-6"><div class="h-100 card card-body"><h5 class="card-title">'+value.entity+'</h5><div><strong>Salience:</strong><small class="pl-1">'+value.salience+'</small></div></div></div>';

 
      if(key % 10 === 0)
      {

      if($j < 10)
      {
      active_pi = 'active_pi';

      }
      if($j==1)
            {
          activepage = 'activepage';
            }


html += '<div class="pag_section '+activepage+' pag_'+$j+'"><div class="row">'+htmldiv+'</div></div>';

pagination += '<li class="page-item '+active_pi+'"><a class="page-link pagination_click" data-page="'+$j+'">'+$j+'</a></li>';
htmldiv = '';
$j = $j +1;
}


  
     });
   pagination +='</ul>';
     html +='</div>';
     html +='<style>.pag_section{display:none;} .pag_section.activepage{display: block;} .page-item{display:none} .page-item.active_pi{display: inline-block;}</style>';
     $('#home2').html('<div class="tabcontentinner">'+pagination + html+'</div>');
  
  
       var html1='';
  $('#tabledata').dataTable().fnClearTable();
     jQuery.each( childData.sentiment, function( key1, value1 ) {
     var popa='';
     var subject = '';
       //html1 += '<tr><td>'+value1.data+'</td><td>'+value1.polarity+'</td><td>'+value1.subjectivity+'</td></tr>';
  if(value1.polarity > 0){
  popa = '<span class="green">'+value1.polarity+'</span>';
      }else if(value1.polarity < 0){
  popa = '<span class="red">'+value1.polarity+'</span>';
     }else{
  popa = '<span class="yellow">'+value1.polarity+'</span>';
       }
if(value1.subjectivity > 0){
  subject = '<span class="green">'+value1.subjectivity+'</span>';
      }else if(value1.subjectivity < 0){
  subject = '<span class="red">'+value1.subjectivity+'</span>';
     }else{
  subject = '<span class="yellow">'+value1.subjectivity+'</span>';
       }
   var dataSet =[];
 dataSet = [value1.data, popa,subject];
t.rows.add([dataSet]).draw();
     });
    
     console.log(html1);
  
     //$('#profile1').html(html1);
//$("#tabledata").draw();
      // page();
  
  $('.js-example-basic-single1').select2({
    width: 'resolve', // need to override the changed default
placeholder: "Select Content type"
});
   $('.js-example-basic-multiple1').select2({
    width: 'resolve', // need to override the changed default
placeholder: "Select Key topic"
});
    var html444='';
    html444 +='<p>&nbsp;</p><div class="row">';
    jQuery.each( childData.topic_keywords, function( key2, value2 ) {
     html444 += '<div class="pb-3 col-lg-6"><div class="h-100 card card-body"><h5 class="card-title">'+value2+'</h5></div></div>';

    });
    html444 +='</div>';
   $("#messages").html(html444);
   $("#settings").html('<p>&nbsp;</p><strong>'+childData.Coherence_Score+'</strong>');
}
});


});
$('#myModal1').modal('show');
    

});
    
jQuery(document).on('click','.page-item',function()
{
jQuery('.pag_section').removeClass('activepage');
var id = jQuery(this).find('a').attr('data-page');

jQuery('.pag_'+id).addClass('activepage');
jQuery('.page-item').removeClass('active_pi');
jQuery(this).addClass('active_pi active_page');
jQuery(this).prevAll("*:lt(5)").addClass('active_pi');
jQuery(this).nextAll("*:lt(5)").addClass('active_pi');

});


});





