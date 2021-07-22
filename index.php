<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <style>

        #search
        {
            background: #F6F8F9 0% 0% no-repeat padding-box;
            margin: 0em auto;
            padding: 2em;
            width: 80%;
        }

        #blogs-container
        {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 20px;
            margin: 2em auto;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 10px #ddd;
            padding: 2em;
            width: 80%;
        }

        #blogs-container .card
        {
            border: 1px solid black;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #blogs-container .card:nth-child(2)
        {
            margin-top: 3em;
        }

        #blogs-container .card:nth-child(odd)
        {
            margin-top: -3em;
        }

        #blogs-container .card:first-child
        {
            margin-top: 0px;
        }

        #search
        {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1em;
        }

        #search .logo,
        #search .title
        {
            display: flex;
        }

        #search .circle
        {
            background-color: #01759B;
            border-radius: 100%;
            padding: 10px;
            color: white;
            align-items: center;
            justify-content: center;
            margin-right: 1em;
        }

        #search .circle i
        {
            font-size: 24px;
            padding-top: 2px;
        }

        #search .title
        {
            flex-direction: column;
        }

        #search .title h1
        {
            font-size: 32px;
            margin: 0px;
            color: #868686;
        }
        
        #search .title h1 small
        {
            display: block;
            color: #282828;
            font-size: 16px;
            font-weight: 300;
        }

        #search .category-form
        {
            margin-top: 1em;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        #search .category-form span
        {
            color: #01759B;
            font-weight: bold;
        }

        #search .category-form select
        {
            background: rgba(0,0,0,0);
            border: unset;
            border-bottom: 2px solid #01759B;
            padding: 0.5em;
            width: 300px;
        }

    </style>
</head>
<body>
    <div id="search">
        <div class="logo">
            <div class="circle">
                <i class="fas fa-comment-alt"></i>
            </div>
        </div>
        <div class="title">
            <h1>
                MBhealth Blog
                <small>Important updates and insights that will help you make the right healthcare decisions.</small>
            </h1>
            <div class="category-form">
                <span class="instruction">Which category can we help you with?</span>
                <div class="select-category-group">
                    <div class="button">
                        <span>Select Category</span>
                        <i>&#9662;</i>
                    </div>
                    <div class="input">
                        <div class="category-item" data-category="">Select All</div>
                        <div class="category-item" data-category="health_insurance">Health Insurance</div>
                        <div class="category-item" data-category="medicare">Medicare</div>
                        <div class="category-item" data-category="life_insurance">Life Insurance</div>
                        <div class="category-item" data-category="dental_visions">Dental & Visions</div>
                        <div class="category-item" data-category="additional_products">Additional Products </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <div id="blogs-container"></div>
    <script>
        let panels = Array.from(Array(10).keys());
        const parent = document.getElementById("blogs-container");

        const buildPanels = () => {
            panels.forEach( panel => { 
                console.log(panel);
                var new_panel = document.createElement('div');
                new_panel.innerHTML = panel;
                new_panel.classList.add("card");
                parent.appendChild(new_panel);
            });
        }

        document.addEventListener("DOMContentLoaded", function(event) { 
            buildPanels();
        });

    </script>
</body>
</html>