const questions = document.querySelectorAll('.question');
questions.forEach(function(x){
    const btn = x.querySelector(".question-btn");
    btn.addEventListener('click',function(){
        questions.forEach(function(item){
            if(item !== x){
                item.classList.remove("show-text");
            }


        });
        x.classList.toggle("show-text");
    });

});




/*const btns = document.querySelectorAll('.question-btn');

btns.forEach(function(btn){
    btn.addEventListener('click',function(e){
        const question = e.currentTarget.parentElement.
        parentElement
        question.classList.toggle("show-text");

    })

})*/