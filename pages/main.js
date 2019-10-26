
window.onload = function() {
    var contenttxt = document.getElementById('contentid');
    var buttonread = this.document.getElementById('read');

    buttonread.onclick = function() {
        //alert('Liked');
        var request =new XMLHttpRequest();
        request.onreadystatechange =function() {
            if(request.readyState === XMLHttpRequest.DONE) {
                if(request.status ===200){
                var dbdata =  request.responseText;  
                contenttxt.innerHTML = dbdata.toString();
            } 
            }
        };
        request.open('GET','http://localhost:3000/notes',true);
            request.send(null);
    };
}