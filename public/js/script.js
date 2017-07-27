$(document).ready(function () {
  // run ajax now
  // 2 methods = GET and POST
  var startDate
  var endDate
  var apiKey = process.env.API_KEY
  var $ul = $('.apod-list')

  $('.searchButton').on('click', function (e) {
    console.log($('#startDate')[0].value)
    console.log($('#endDate')[0].value)
    startDate = $('#startDate')[0].value
    endDate = $('#endDate')[0].value
    var apod_url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}${apiKey}`
    console.log(apod_url)

    $.get(apod_url)
    .done(function (data) {
      var apod_arr = data
      console.log(apod_arr);
      apod_arr.forEach(function (apod) {
        var $newLi = $('<li>')
        var $newImg = $('<img>')
        var $newPDate = $('<p>')
        var $newPTitle = $('<p>')
        var $newPExplanation = $('<p>')
        var $linkbttn = $(`<button class="addBttn" data-date="${apod.date}" data-title="${apod.title}">Add</button>`)

        $newPDate.text(apod.date)
        $newPTitle.text(apod.title)
        $newImg.attr({
          src: apod.url,
          alt: apod.title
        })
        $newPExplanation.text(apod.explanation)

        $newLi.append($newPDate, $newPTitle, $newImg, $newPExplanation, $linkbttn)
        // return $newLi
        // var $createdList = createList(apod)
        $ul.append($newLi)
      })
    })
  })

  // var image_url = 'https://apod.nasa.gov/apod/image/'


  // input: obj
  // output: jquery object
  // jquery object => <li> <img src=""> </li>
  // function createList (obj) {
  //   var $newLi = $('<li>')
  //   var $newImg = $('<img>')
  //   var $newPDate = $('<p>')
  //   var $newPTitle = $('<p>')
  //   var $newPExplanation = $('<p>')
  //
  //
  //   $newPDate.text(obj.date)
  //
  //   $newPTitle.text(obj.title)
  //
  //   $newImg.attr({
  //     src: obj.url,
  //     alt: obj.title
  //   })
  //
  //   $newPExplanation.text(obj.explanation)
  //
  //   $newLi.append($newPDate, $newPTitle, $newImg, $newPExplanation)
  //   return $newLi
  // }
})
