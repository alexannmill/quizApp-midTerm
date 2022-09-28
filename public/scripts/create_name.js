$(function () {
  $(".quizName").submit(function (e) {
    e.preventDefault();
    const name = {}
    name.name=$("#nameText").val()
    console.log('name:', name)
    if (!name.name) {
      alert("Plz enter a name")
      return;
    }

    $.post(`/create`, name, function(response) {
      const id = response.id
      console.log('id:', id)
      // unable to redirect or get was causing error so used window.loc
      window.location.href = `/create/${id}`
    });
  })
})

