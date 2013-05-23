define(['wq/spinner'],
function(spin) {
return {
    'run': function(slide) {
         if (slide.id == "wq.app-lessons.lesson3")
             spin.start("Loading");
         else
             spin.stop();
     }
}
});
