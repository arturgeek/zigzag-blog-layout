jQuery(document).ready(function () {
	
	CheckSidebarBlogCategorySelectBox();
	CreateCategoriesForSelector();
    AddDivider();
	AddEvents();
	CheckIfCategoryIsSelected();
	
	var availableTitles = [];
	jQuery(".blog-shortcode-post-title a").each(function(){
		availableTitles.push(this.innerHTML);
	});
    jQuery( "#search-input" ).autocomplete({
      source: availableTitles
    });

	jQuery(".filters-select").change(function () {
		window.location = jQuery(this).val();
	});
    
    jQuery("#search-btn").click(function () {
		if(jQuery("#search-input").val()==""){
			
		}else{
			Search(jQuery("#search-input").val());
		}
        
    });
});

function Filter(filter) {
    const post_id_prefix = "blog-1-post-";
    jQuery(".fusion-clearfix").remove();
    var to_show = [];
    jQuery("article a[rel='category tag']").each(function () {
		const category_tag = jQuery(this).attr("href").split("/").filter(part => part !== "").pop();
        if ( category_tag === filter || filter === "" ) {
            let parent_id = jQuery(this).parents("article").attr("id");
            parent_id = parseInt(parent_id.replace( post_id_prefix, "" ));
            if (-1 === to_show.indexOf(parent_id)) {
                to_show.push(parent_id);
            }
        }
    });
    to_show.sort(function(a, b) { return b - a });
    let elements_to_show = [];
    jQuery.each(to_show, function (index, article) {
        elements_to_show.push( jQuery("#" + article) );
    });
    jQuery("article").hide();
    jQuery.each(to_show, function (index, article) {
        let card = "#" + post_id_prefix + article;
        jQuery(card).parent().append(jQuery(card));
        jQuery( card ).show();
    });
    jQuery("article:hidden").each(function (index, card) {
        jQuery(card).parent().append(jQuery(card));
    });
    jQuery("article:visible").attr("style", "");
    jQuery("article").first().parent().attr("style", "");
} 

function Search(value) {
	jQuery(".fusion-clearfix").remove();
	var to_show = [];
	jQuery("article h2 a").each(function () {
		if (jQuery(this).html().toUpperCase().indexOf(value.toUpperCase()) > -1) {
			let parent_id = jQuery(this).parents("article").attr("id");
			if (-1 === to_show.indexOf(parent_id)) {
				to_show.push(parent_id);
			}
		}
	});
	jQuery("article").hide();
	jQuery.each(to_show, function (index, article) {
		console.log("#" + article);
		jQuery("#" + article).show();
	});
	jQuery("article:hidden").each(function (index, card) {
		jQuery(card).parent().append(jQuery(card));
	});
	jQuery("article:visible").attr("style", "");
	jQuery("article").first().parent().attr("style", "")
}

function CreateCategoriesForSelector()
{
    const categories = document.querySelectorAll("article a[rel='category tag']");
    let categories_to_create = [];
    categories.forEach( category => { 
        const category_name = category.getAttribute("href").split("/").filter(part => part !== "").pop(); 
        if( categories_to_create.indexOf( category_name ) === -1 ) { 
            categories_to_create.push(category_name); 
        } 
    });
    //BuildOptionsBasedOnCategories(categories_to_create);
}

function BuildOptionsBasedOnCategories( categories_to_create )
{
    let selectOptions = document.querySelector("#search .select-category-group .input");
    if( categories_to_create.length > 0 )
    {
        selectOptions.innerHTML = "";
        let option = BuildOption("Everything", "")
        selectOptions.appendChild(option);
        categories_to_create.forEach( category => {
            let option_name = GetCategoryNameFromURL( category );
            option = BuildOption( option_name, category )
            selectOptions.appendChild(option);
        });
    }
}

function BuildOption( text, value )
{
    let new_option = document.createElement('div');
    new_option.innerHTML = text;
    new_option.setAttribute("data-category", value);
    new_option.classList.add("category-item");
    return new_option;
}

function AddEvents()
{
	const selected = document.querySelector(".selected");
    const selectGroup = document.querySelector("#search .select-category-group");
	const optionsContainer = document.querySelector(".options-container");
	const optionsList = document.querySelectorAll(".option");
	const selectButton = document.querySelector("#search .select-category-group .button");
    const selectButtonText = document.querySelector("#search .select-category-group .button span");
	const selectOptions = document.querySelector("#search .select-category-group .input");
	const selectOptionsItems = document.querySelectorAll("#search .select-category-group .input .category-item");

	if( selected !== null )
	{
		selected.addEventListener("click", () => {
		  optionsContainer.classList.toggle("active");
		});
		
		optionsList.forEach(o => {
		  o.addEventListener("click", () => {
			selected.innerHTML = o.querySelector("label").innerHTML;
			optionsContainer.classList.remove("active");
			if(selected.innerHTML == "All"){
				Filter("");
			}else{
				Filter(selected.innerHTML);
			}
		  });
		});
	}
		
	
	selectButton.addEventListener("click", () => {
	  	selectOptions.classList.toggle("active");
	});
	
	selectOptionsItems.forEach(option => {
		option.addEventListener("click", (e) => {
			const event = e || window.event;
			const target = event.target || event.srcElement;
			const selected_option = target.getAttribute('data-category');
			selectOptions.classList.toggle("active");
			let category_name = GetCategoryNameFromURL( selected_option );
			category_name = category_name === "" ? "Everything" : category_name;
			selectButtonText.innerHTML = category_name;
			Filter(selected_option);
		});
	});
	
	document.addEventListener("click", (e) => {
        console.log(e.target.id, selectGroup.id);
        if(e.target.id !== selectGroup.id && e.target.id !== selectButton.id ){
            selectOptions.classList.remove("active");
        }
    });
}

function GetCategoryNameFromURL( category )
{
	if( "" === category )
	{
		return "";
	}
    if( category.toLowerCase().indexOf("obamacare") > -1 )
    {
        return "Obamacare";
    }
	return category.split("-").map( (word) => { return word[0].toUpperCase() + word.substring(1) } ).join(" ");
}

function CheckSidebarBlogCategorySelectBox()
{
	if( jQuery(".post-template-default .sidebar  .filters-select").length > 0 )
	{
		AddEventsToSidebarBlogCategorySelectBox();
	}
}

function AddEventsToSidebarBlogCategorySelectBox()
{
	const blog_slug = document.location.origin + "/test/?secret-key=1b0d3970-d551-421e-b8ec-8cf5ba6f544a&category=";
	
    jQuery(".post-template-default .sidebar  .filters-select").off();
	jQuery(".post-template-default .sidebar  .filters-select").first().on("change", function(){
        let selected_value = jQuery(this).val();
        selected_value = selected_value.split("/");
        const selected_category = selected_value.filter( token => { return token !== "" } ).pop();
		const url = blog_slug + selected_category;
		document.location.href = url;
	});
}

function CheckIfCategoryIsSelected()
{
    const options_map = {
        "health-insurance": "health_insurance",
        "life-insurance": "life_insurance",
        "medicare": "medicare",
        "dental-visions": "dental",
        "additional-products": "additional"
    };
    const url_params = new URLSearchParams(window.location.search);
    const selected_category = url_params.get("category")
    if( options_map.hasOwnProperty(selected_category) )
    {
        const category_to_pick = options_map[selected_category];
        jQuery( "#" + category_to_pick ).parent().trigger("click");
    }
}

function AddDivider()
{
    let divider = document.createElement('div');
    divider.classList.add("divider");

    let blogContainer = document.querySelector("#blogs-container");
    blogContainer.appendChild(divider);
}