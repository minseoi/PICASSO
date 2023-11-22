window.addEventListener('DOMContentLoaded', function() {
  RequestAllDrawings();
});

function RequestAllDrawings() {
  fetch("https://ise.kro.kr:8123/api/all-drawings", {
    method: "GET"
  }) 
  .then(res => res.json())
  .then(json => AllDrawingsCallback(json))
  .catch(error => console.error("Error:", error));
}

function AllDrawingsCallback(json) {
  const drawings = json.drawings;

  const galleryContainer = document.querySelector('.flexbox');
  galleryContainer.innerHTML = ''; //clear

  // 각 그림 추가
  drawings.forEach((drawing, index) => {
    const newBox = document.createElement('img');
    newBox.className = 'gallery_box';
    newBox.style.backgroundColor = 'white';
    newBox.style.cursor = 'pointer';
    newBox.src= drawing.imageUrl;

    // detail 페이지로 이동
    newBox.addEventListener('click', function() {
      location.href = 'detail.html?id=' + drawing.id;
    });

    galleryContainer.appendChild(newBox);
  });
}