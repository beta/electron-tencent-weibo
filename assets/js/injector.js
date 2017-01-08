window.onload = () => {
  $(document).ready(() => {
    $('.tImg1').click((event) => {
      var imageUrl = event.target.getAttribute('src')
      imageUrl = imageUrl.substring(0, imageUrl.length - 4) + '/2000'
      window.open(imageUrl)
    })
    $('div[class^=tImg]').click((event) => {
      var imageUrl = event.target.getAttribute('picurl') + '/2000'
      window.open(imageUrl)
    })
  })
}
