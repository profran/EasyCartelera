function createVerticalCard(title="", description = "", link = "#", image = "") {

	var card = document.createElement("div");
	card.setAttribute("id", ("div_card_" + title.split(' ').join('_')));
	card.setAttribute("class", "card hoverable");

	var card_image = document.createElement("div");
	card_image.setAttribute("class", "card-image");

	var img = document.createElement("img");
	img.setAttribute("src", image);

	var card_title = document.createElement("span");
	card_title.setAttribute("class", "card-title");
	card_title.appendChild(document.createTextNode(title));

	var card_content = document.createElement("div");
	card_content.setAttribute("class", "card-content");

	var p = document.createElement("p");
	p.appendChild(document.createTextNode(description));

	var card_action = document.createElement("div");
	card_action.setAttribute("class", "card-action");

	var a = document.createElement("a");
	a.setAttribute("href", link);
	a.appendChild(document.createTextNode("Pagina Web"));

	card_content.appendChild(p);

	card_action.appendChild(a);

	card_image.appendChild(img);
	card_image.appendChild(card_title);

	card.appendChild(card_image);
	card.appendChild(card_content);
	card.appendChild(card_action);

	document.getElementById("div_card_column").appendChild(card);

}
/*
function createVerticalCard(destination_id, {hoverable = true, card_image = null, card_title, card_description = null, card_url = null}) {

	//var destination_element = document.getElementById(destination_element);
	$("#" + destination_id).load('vertical-card.html');


}
*/
