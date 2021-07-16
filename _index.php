<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
</head>
<body>
    <div id="parent">
    
    </div>
    <script>
        let panels = Array.from(Array(10).keys());
        const parent = document.getElementById("parent");

        const buildPanels = () => {
            panels.forEach( panel => { 
                console.log(panel);
                var newNode = document.createElement('div');
                newNode.innerHTML = panel;
                parent.appendChild(newNode);
            });
        }

        document.addEventListener("DOMContentLoaded", function(event) { 
            buildPanels();
        });

    </script>
</body>
</html>