document.addEventListener('DOMContentLoaded', () => {


    document.innerHTML = `
    
    
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/style.css">
    <title>BroomStack</title>
</head>
<body>
 <div id="nav-placeholder">

 </div>


    <article id="siteContent">

        <input type="text" id="teamSearch"  placeholder="Search for a team..">
        <div id="teamContainer"></div>

    </article>

<script src="script.js"></script>
<script src="teamSearch.js"></script>
<script>
    $(function(){
        $("#nav-placeholder").load("../nav.html");
      });
</script>
</body>
</html>
    
    
    
    `






})
