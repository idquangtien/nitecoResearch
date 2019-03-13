$(document).ready(function(){

    
    

});

class ComponentSlideshow {
    constructor(props){
       this.container = props.container;
       this.buttonNext = props.buttonNext;
       this.buttonPrev = props.buttonPrev;
       this.timePause = props.timePause ? props.timePause : 2000;
    }
    setWidth(){
        let self = this;
        let totalWidth = 0;
        let widthParent = this.container.parent().width();
        console.log('widthparent', widthParent);
        self.container.find(".slide").css({"flex-basis": widthParent + "px", "min-width": widthParent + "px"});
        

        this.container.find(".slide").each(function(){
            

            totalWidth += $(this).outerWidth();
            console.log('totalWidth',totalWidth);
        });


        
        this.container.width(totalWidth);
    }
    moveSlide(slideActive) {
        let containerOffset = this.container.offset().left;
        let slideActiveOffset = slideActive.offset().left;
        let totalOffset = slideActiveOffset - containerOffset;

        this.container.css({
            "transform": "translate(-" + totalOffset + "px)",
        });
    }
    nextSlide(currentSlide){
        if(currentSlide < this.container.find(".slide").length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        return currentSlide;
    }
    prevSlide(currentSlide){
        if(currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = this.container.find(".slide").length - 1;
        }
        return currentSlide;
    }
    clickButton(currentSlide){
        let slides = this.container.find(".slide");
        this.moveSlide($(slides[currentSlide]));

        slides.siblings().removeClass("active");
        $(slides[currentSlide]).addClass("active");
    }
    init(){
        let self = this;
        let currentSlide = 0;
        this.setWidth();

        this.buttonNext.click(function(){
            currentSlide = self.nextSlide(currentSlide);
            self.clickButton(currentSlide);
        });
        this.buttonPrev.click(function(){
            currentSlide = self.prevSlide(currentSlide);
            self.clickButton(currentSlide);
        });
        let interval = function(){
            currentSlide = self.nextSlide(currentSlide);
            self.clickButton(currentSlide);
        }
        let refreshIntervalId = setInterval(interval, this.timePause);
    }
}
$(document).ready(function(){
    let slideshow = new ComponentSlideshow({
        container: $("#slideshow .slideshow__container"),
        buttonNext: $(".btn-next"),
        buttonPrev: $(".btn-prev"),
    });

    slideshow.init();

    $(".collection > li").click(function(){
        $(this).children('ul').slideToggle();
    });
});
$(window).on("load",function(){
    
});

