clickable = true
array = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ]
available = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function check_win(id) {

	a = array

	if (
		(a[0][0] == id && a[0][0] == a[0][1] && a[0][1] == a[0][2]) ||
		(a[1][0] == id && a[1][0] == a[1][1] && a[1][1] == a[1][2]) ||
		(a[2][0] == id && a[2][0] == a[2][1] && a[2][1] == a[2][2]) ||

		(a[0][0] == id && a[0][0] == a[1][0] && a[1][0] == a[2][0]) ||
		(a[0][1] == id && a[0][1] == a[1][1] && a[1][1] == a[2][1]) ||
		(a[0][2] == id && a[0][2] == a[1][2] && a[1][2] == a[2][2]) ||

		(a[0][0] == id && a[0][0] == a[1][1] && a[1][1] == a[2][2]) ||
		(a[0][2] == id && a[0][2] == a[1][1] && a[1][1] == a[2][0])
	) {
		return id
	}

	return false
}

function put_round() {

	index = available[Math.floor(Math.random()*available.length)]

	column = Math.floor( index / 3)
	row = index-3*column
	
	array[column][row] = 2
	available.splice(available.indexOf(index), 1)

	x = document.getElementsByTagName("td")
	$(x[index]).attr("class", "round")
	
	if (check_win(2)) {
		
		setTimeout(function() {

			alert("You Lose")
			console.log("Rounds Winners")
		}, 100)

		return
	}

	clickable = true
}

$("td").click(function() {

	if (!clickable) {
		return
	}

	column = $(this).parent().attr("id")*1
	row = $(this).attr("id")*1

	if (!array[column][row]) {
		
		array[column][row] = 1
		available.splice(available.indexOf(3*column+row), 1)

		$(this).attr("class", "cross")
		
		clickable = false

		if (check_win(1)) {

			setTimeout(function() {
				alert("You Won")
				console.log("Crosses Winners")
			}, 100)


		} else if (available.length > 0) {

			setTimeout(put_round, 1000)
		
		} else {

			setTimeout(function() {
				alert("No Sides")
				console.log("No Sides")
			}, 100)

		}
	}

})

$("td").mouseenter(function() {
	
	if (!clickable) {
		return
	}

	column = $(this).parent().attr("id")
	row = $(this).attr("id")

	if (!array[column][row]) {

		$(this).attr("class", "cross_hover")
	}
}) 

$("td").mouseleave(function() {
	
	if (!clickable) {
		return
	}

	column = $(this).parent().attr("id")
	row = $(this).attr("id")

	if (!array[column][row]) {

		$(this).attr("class", "clear")
	}

}) 

$("button").click(function() {
	
	$("td").attr("class", "clear")
	clickable = true
	array = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ]
	available = [0, 1, 2, 3, 4, 5, 6, 7, 8]

})