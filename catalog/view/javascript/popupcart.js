(function($){

	var modPopupCart = {};

	// URI для загрузки содержимого корзины
	var popupCartUri = 'index.php?route=module/popupcart/load';
	// URI страницы оформления заказ
	var cartCheckoutUri = 'index.php?route=checkout/cart';

	// div
	var popupCartContainer = '#popupcart';
	var popupCartContainerBg = '#popupcart-bg';
	var popupCartTitle = 'div.title';
	var popupCartContent = '#popupcart .popupcart_content';
	
	/*
	* Путь до товарной сетки
	*/
	var productGridPath = '.product-grid, .product-list',

	/*
	* Путь до кнопки добавления товара с id товара
	*/
	var productIdPath   = '.product-grid div div.cart input.button, .product-list div div.cart input.button,.product-info div.cart #button-cart',

	/*
	* регулярка для извлечения id товара из строки addToCart('id'), другого способа извлечения id
	* не нашел, только если в ручную задавать
	*/
	var regexProductId  = /\w+\('(\d+)'\);/,
	
	/*
	* Инициализация контейнера
	*/
	modPopupCart.init = function(config){
		var defConf = {};
		var $this = this;

		defConf = {
			draggable : "1",
		};

		config = $.extend({}, defConf, config);

		// Настройка эффекта draggable
		if( parseInt(config.draggable) == 1 ){
			$(popupCartContainer).draggable({ handle: popupCartTitle });
		}

		$(popupCartContainer).disableSelection();
		$(popupCartContainer).resizable({
			maxHeight: 800,
			maxWidth: 800,
			minHeight: 530,
			minWidth: 600,
			alsoResize: popupCartContent
		});
		$(popupCartContent).resizable();

		// Останавливаем дальншейшее всплытие события "click" при клике на область окна
		$(popupCartContainer).click(function(event){
			event.stopPropagation();
		});

		// по клику на область вне окна корзины закрываем окно
		$('body').click(function(){
			$this.close();
		});

		$('body').keydown(function(event){
			if(event.which == 27) { // ESC 
				$this.close();
			}
		});

		$this.bindAddToCartHandler();

		// привязываем обработчик к переключателям вида	
		// if($('.display a').length){
		// 	$('.display').bind('DOMSubtreeModified', function(){
		// 		$this.bindAddToCartHandler();
		// 	});
		// };
	};

	/*
	* Открытие окна корзины
	*/
	modPopupCart.open = function(){
		$(popupCartContent).load(popupCartUri,{},function(){
			$(popupCartContainer).css('top', $(window).height()/2-$(popupCartContainer).height()/2);
			$(popupCartContainer).css('left', $(window).width()/2-$(popupCartContainer).width()/2);
			$(popupCartContainer).css("position","fixed");
			$(popupCartContainer).show();	

			$(popupCartContainerBg).show();
			
			$('.jcarousel').jcarousel({
				animation: 'slow',
				items: '.carousel-block-ajcart',
				wrap: 'both'
			});
//			$('.jcarousel-control-prev').on('click')
		});
		
		return false;
	};

	modPopupCart.bindAddToCartHandler = function(){
		var $this = this;

		// Загрузка доп. изображений для каждого товара
		$(productIdPath).click(function(){
			setTimeout(modPopupCart.open, 200);
		});
	}

	/*
	* Закрытие окна корзины
	*/
	modPopupCart.close = function(){
		$(popupCartContainer).hide();
		$(popupCartContainerBg).hide();
		$(popupCartContent).empty();
		return false;
	};

	/*
	* Удаление товарной позиции
	*/
	modPopupCart.removeProduct = function(productId){
		if(getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
			location = cartCheckoutUri + '&remove=' + productId;
		} else {
			$(popupCartContent).load(popupCartUri + '&remove=' + productId, {}, function(){
				$('.jcarousel').jcarousel({
					animation: 'slow',
					items: '.carousel-block-ajcart',
					wrap: 'both'
				});
			});
		}
	}

	/*
	* Удаление ваучера
	*/
	modPopupCart.removeVoucher = function(voucherId){
		if(getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
			location = cartCheckoutUri + '&remove=' + voucherId;
		} else {
			$(popupCartContent).load(popupCartUri+'&remove=' + voucherId, {}, function(){
				
			});
		}
	}
	
	modPopupCart.upQuantity = function(id) {
		var quantity = parseInt($(id).parent().children('.qt').val());
		quantity = quantity + 1;
		modPopupCart.changeQuantity(id, quantity);
	}
	
	modPopupCart.downQuantity = function(id) {
		var quantity = parseInt($(id).parent().children('.qt').val());
		quantity = quantity - 1;
		modPopupCart.changeQuantity(id, quantity);
	}
	
	modPopupCart.changeQuantity = function(id, quantity) {
		
		if(quantity == undefined){
			quantity = parseInt($(id).val());	
		}
		
		pid = $(id).parent().children('.product_id').val();
		
		$(popupCartContent).load(popupCartUri + '&update=' + pid + '&qty='+quantity, {}, function(){
			$('.jcarousel').jcarousel({
				animation: 'slow',
				items: '.carousel-block-ajcart',
				wrap: 'both'
			});	
		});
	}

	window.modPopupCart = modPopupCart;
})($);
