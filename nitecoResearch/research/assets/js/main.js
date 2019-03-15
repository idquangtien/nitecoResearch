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
        let widthParent = this.container.parent(".slideshow").width();
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

class ComponentCarousel {
    constructor(props){
        this.container = props.container;
        this.buttonNext = props.buttonNext;
        this.buttonPrev = props.buttonPrev;
        this.itemShow = props.itemShow ? props.itemShow : 5;
        this.space = props.space ? props.space : '20';
    }
    init(){
        let self = this;
        let windowWidth = this.container.parent().width();
        
        let totalItem = this.container.find('li').length;

        

        let itemWidth = windowWidth / this.itemShow;
        
        

        let container = itemWidth * totalItem;



        this.container.width(container);
        this.container.find('li').css('width', itemWidth + 'px');

        
        

        this.buttonNext.click(function(){
            let first = self.container.find('li').first();
            first.animate({
                'width': 0,
            }, function(){
                first.appendTo(self.container).css({
                    'width': itemWidth
                })
            });
        });
        this.buttonPrev.click(function(){
            let last = self.container.find('li').last().css({
                'width': 0,
            });
            last.prependTo(self.container);
            last.animate({'width': itemWidth});
        });
    }
}

class ComponentGridPinteres {
    constructor(props){
       this.grid = props.grid;
    }
    resizeGridItem(item) {
        let rowHeight = parseInt(this.grid.css('grid-auto-rows'));

        let rowGap = parseInt(this.grid.css('grid-row-gap'));
       
        let rowSpan = Math.ceil( (item.find(".gridItem__content").outerHeight() + rowGap) / (rowHeight + rowGap) );

        $(item).css("grid-row-end","span " + rowSpan);
    }
    resizeAllGridItems(){
        let items = $(".gridItem");
        items.each((index, item)=>{
            this.resizeGridItem($(item));
        })
    }
    fullImageGridItems(){
        let items = $(".gridItem");
        items.each((index, item)=>{
            $(item).find("img").addClass("full");
        })
    }
    init(){
        let self = this;
        let make_promise = function(task = function(){}){
            return new Promise(function(resolve, reject){
                task();
                resolve();
            });
        }
        make_promise(self.resizeAllGridItems())
            .then(function(){
                self.fullImageGridItems();
            });
    }
}
$(document).ready(function(){
    let slideshow = new ComponentSlideshow({
        container: $("#slideshow .slideshow__container"),
        buttonNext: $(".btn-next"),
        buttonPrev: $(".btn-prev"),
    });

    slideshow.init();

    let carousel = new ComponentCarousel({
        container: $('.carousel .carousel__container'),
        buttonNext: $('.btn-next'),
        buttonPrev: $('.btn-prev')
    });
    carousel.init();

    $(".collection > li").click(function(){
        $(this).children('ul').slideToggle();
    });


    

});






