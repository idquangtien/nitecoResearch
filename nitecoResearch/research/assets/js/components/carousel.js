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