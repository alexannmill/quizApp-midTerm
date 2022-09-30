$(function () {
  //start after name entered
  $(".quizName").submit(function(e) {
    e.preventDefault();
    const name = {};
    name.name = $("#nameText").val();
    if (!name.name) {
      alert("Plz enter a name");
      return;
    }
    $.post(`/create`, name, function (response) {
      const id = response.id;
      // unable to redirect/render w express causing error so used window.loc
      window.location.href = `/create/${id}`;
    });
  });
});
