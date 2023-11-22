window.addEventListener('DOMContentLoaded', function() {
  urlSearch = new URLSearchParams(location.search);
  id = urlSearch.get('id')
  RequestDrawing(id);
});

function RequestDrawing(id) {
  fetch("https://ise.kro.kr:8123/api/drawing?id="+id, {
    method: "GET"
  }) 
  .then(res => res.json())
  .then(json => DrawingCallback(json))
  .catch(error => console.error("Error:", error));
}

function DrawingCallback(json) {
  const author = json.author;
  const title = json.title;
  const desc = json.desc;
  const imageUrl = json.imageUrl;

  const galleryImage = document.querySelector('.gallery_image');
  galleryImage.src = imageUrl;

  const galleryTitle = document.querySelector('.gallery_title');
  galleryTitle.innerText = title;

  const galleryDesc = document.querySelector('.gallery_desc');
  galleryDesc.innerText = desc;

  const galleryAuthor = document.querySelector('.gallery_author');
  galleryAuthor.innerText = author;
}