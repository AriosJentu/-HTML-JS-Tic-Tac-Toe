clickable = true
array = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ]
available = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function check_win(id) {

	let a = array

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

	column = -1
	row = -1

	for (i in available) {
		
		clm = Math.floor(available[i]/3)
		rw = available[i] - 3*clm

		array[clm][rw] = 1
		if (check_win(1)) {

			column = clm
			row = rw
		}

		array[clm][rw] = 0

		if (column >= 0) {
			break
		}
	}

	r_winner = -1
	for (i in available) {
		
		clm = Math.floor(available[i]/3)
		rw = available[i] - 3*clm

		array[clm][rw] = 2
		if (check_win(2)) {

			column = clm
			row = rw
			r_winner = 1
		}

		array[clm][rw] = 0

		if (r_winner == 1) {
			break
		}
	}

	if (column == -1) {

		index = available[Math.floor(Math.random()*available.length)]

		column = Math.floor( index / 3)
		row = index-3*column
	}
	
	array[column][row] = 2
	index = column*3 + row

	available.splice(available.indexOf(index), 1)

	x = document.getElementsByTagName("td")
	$(x[index]).attr("class", "round")
	
	if (check_win(2)) {
		
		setTimeout(function() {

			alert("You Lose")
			console.log("Rounds Winners")

		}, 100)

		can_restart = true
		return
	}

	clickable = true

}

can_restart = true
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
		can_restart = false

		if (check_win(1)) {

			setTimeout(function() {

				alert("You Won")
				console.log("Crosses Winners")

				can_restart = true

			}, 100)


		} else if (available.length > 0) {

			setTimeout(put_round, 1000)
		
		} else {

			setTimeout(function() {

				alert("No Sides")
				console.log("No Sides")

				can_restart = true

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

$("img").mouseenter(function() {

	if ($(this).attr("id") == "12") {
		$(this).attr("class", "btn_hover")
	}	

})

$("img").mouseleave(function() {

	if ($(this).attr("id") == "12") {
		$(this).attr("class", "btn_blur")
	}	

})

$("img").click(function() {
	
	if ($(this).attr("id") == "12" && can_restart) {

		$("td").attr("class", "clear")
		clickable = true
		array = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ]
		available = [0, 1, 2, 3, 4, 5, 6, 7, 8]
	}

})