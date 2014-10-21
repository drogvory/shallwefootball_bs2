$(function(){


    // modal 외부불러오는거
    var $fix2014 = $('#fix2014');

    // $('.fix2014').on('click', function(){
    //   $fix2014.load('stat/fix2014.html', '', function(){
    //      $fix2014.modal();
    //   });
    // });

    var $fix1314 = $('#fix1314');

    $('.fix1314').on('click', function(){
      $fix1314.load('stat/fix1314.html', '', function(){
         $fix1314.modal();
      });
    });

    var $fix1213 = $('#fix1213');

    $('.fix1213').on('click', function(){
      $fix1213.load('stat/fix1213.html', '', function(){
         $fix1213.modal();
      });
    });
    var $player1213 = $('#player1213');

    $('.player1213').on('click', function(){
      $player1213.load('stat/player1213.html', '', function(){
         $player1213.modal();
      });
    });

    var $table1213 = $('#table1213');

    $('.table1213').on('click', function(){
        $table1213.load('stat/table1213.html', '', function(){
            $table1213.modal();
        })
    })

    var $goalscore1213 = $('#goalscore1213');

    $('.goalscore1213').on('click', function(){
        $goalscore1213.load('stat/goalscore1213.html', '', function(){
            $goalscore1213.modal();
        })
    })

    var $table1314 = $('#table1314');

    $('.table1314').on('click', function(){
        $table1314.load('stat/table1314.html', '', function(){
            $table1314.modal();
        })
    })

    var $goalscore1314 = $('#goalscore1314');

    $('.goalscore1314').on('click', function(){
        $goalscore1314.load('stat/goalscore1314.html', '', function(){
            $goalscore1314.modal();
        })
    })



    //modal_fix
    var $divCon = $('#wrap div:eq(1)')
    var $sec = $('section')


    $player1213.on('show', function(){
        $divCon.removeAttr("id")
        $sec.removeClass('section')
        $sec.addClass('modalSection')
        $divCon.attr("id", 'modalContainer')
    })
    $player1213.on('hide', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('modalSection')
        $sec.addClass('section')
        $divCon.attr("id", "container")
    })

    $fix1213.on('show', function(){
        $divCon.removeAttr("id")
        $sec.removeClass('section')
        $sec.addClass('modalSection')
        $divCon.attr("id", 'modalContainer')
    })
    $fix1213.on('hide', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('modalSection')
        $sec.addClass('section')
        $divCon.attr("id", "container")
    })

    $fix1314.on('show', function(){
        $divCon.removeAttr("id")
        $sec.removeClass('section')
        $sec.addClass('modalSection')
        $divCon.attr("id", 'modalContainer')
    })
    $fix1314.on('hide', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('modalSection')
        $sec.addClass('section')
        $divCon.attr("id", "container")
    })

    $fix2014.on('show', function(){
        $divCon.removeAttr("id")
        $sec.removeClass('section')
        $sec.addClass('modalSection')
        $divCon.attr("id", 'modalContainer')
    })
    $fix2014.on('hide', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('modalSection')
        $sec.addClass('section')
        $divCon.attr("id", "container")
    })


    $table1213.on('show', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('section')
        $sec.addClass('modalSection')
        $divCon.attr("id", "modalContainer")
    })
    $table1213.on('hide', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('modalSection')
        $sec.addClass('section')
        $divCon.attr("id", "container")
    })
    $goalscore1213.on('show', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('section')
        $sec.addClass('modalSection')
        $divCon.attr("id", "modalContainer")
    })
    $goalscore1213.on('hide', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('modalSection')
        $sec.addClass('section')
        $divCon.attr("id", "container")
    })
    $table1314.on('show', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('section')
        $sec.addClass('modalSection')
        $divCon.attr("id", "modalContainer")
    })
    $table1314.on('hide', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('modalSection')
        $sec.addClass('section')
        $divCon.attr("id", "container")
    })
    $goalscore1314.on('show', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('section')
        $sec.addClass('modalSection')
        $divCon.attr("id", "modalContainer")
    })
    $goalscore1314.on('hide', function(){
        $divCon.removeAttr('id')
        $sec.removeClass('modalSection')
        $sec.addClass('section')
        $divCon.attr("id", "container")
    })





    // Sidebar toggle

    $('.btn-navbar').click(function(){
		$('html').toggleClass('expanded');
	});


    //
    // $('#section2 button').on('click', function () {

    //     var section = $(this).parent().parent();

    //     section.toggle();
    //     section.siblings(".slide").slideToggle('2000', "easeInQuart");
    // });

    $('#section2 .read-more').on('click', function () {

        var section = $(this).parent();

        section.toggle();
        section.siblings(".slide").slideToggle('2000', "easeInQuart");
    });



    //
    $('#section3 .article-tags li').on('click', function () {

        var section = $(this).parents('.span4');
        var category = $(this).attr('data-stat');
        var articles = section.siblings();

        // Change Tab BG's
        $(this).siblings('.current').removeClass('current');
        $(this).addClass('current');

        // Hide/Show other articles
        section.siblings('.current').removeClass('current').hide();

        $(articles).each(function (index) {

            var newCategory = $(this).attr('data-stat');

            if ( newCategory == category ) {
                $(this).slideDown('1000', "easeInQuart").addClass('current');
            }
        });

    });



    // ReadMore
    var CheckNum = 0


    $('.readMore').addClass("accordion-toggle")
    $('.MoreText').addClass("visible-desktop")
    $('.readMore').addClass("visible-phone visible-tablet")
    $('.readMore').click(function(){
        if(CheckNum == 0){
            $(this).text("감추기")
            $('.MoreText').addClass("visible-phone visible-tablet")
            CheckNum = 1
        }
        else{
            $(this).text("...더읽기")
            $('.MoreText').removeClass("visible-phone visible-tablet")
            CheckNum = 0
        };

    })






	// Waypoints Scrolling

	var links = $('.navigation').find('li');
	var button = $('.intro button');
    var section = $('section');
    var mywindow = $(window);
    var htmlbody = $('html,body');


    section.waypoint(function (direction) {

        var datasection = $(this).attr('data-section');

        if (direction === 'down') {
            $('.navigation li[data-section="' + datasection + '"]').addClass('active').siblings().removeClass('active');
        }
        else {
        	var newsection = parseInt(datasection) - 1;
            $('.navigation li[data-section="' + newsection + '"]').addClass('active').siblings().removeClass('active');
        }

    });

    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-section="1"]').addClass('active');
            $('.navigation li[data-section="2"]').removeClass('active');
        }
    });

    function goToByScroll(datasection) {

        if (datasection == 1) {
	        htmlbody.animate({
	            scrollTop: $('.section[data-section="' + datasection + '"]').offset().top
	        }, 500, 'easeOutQuart');
        }
        else {
	        htmlbody.animate({
	            scrollTop: $('.section[data-section="' + datasection + '"]').offset().top + 70
	        }, 500, 'easeOutQuart');
        }

    }

    links.click(function (e) {
        e.preventDefault();
        var datasection = $(this).attr('data-section');
        goToByScroll(datasection);
    });

    button.click(function (e) {
        e.preventDefault();
        var datasection = $(this).attr('data-section');
        goToByScroll(datasection);
    });

    // Snap to scroll (optional)

    /*

    section.waypoint(function (direction) {

        var nextpos = $(this).attr('data-section');
        var prevpos = $(this).prev().attr('data-section');

        if (nextpos != 1) {
	        if (direction === 'down') {
	            htmlbody.animate({
		            scrollTop: $('.section[data-section="' + nextpos + '"]').offset().top
		        }, 750, 'easeOutQuad');
	        }
	        else {
	            htmlbody.animate({
		            scrollTop: $('.section[data-section="' + prevpos + '"]').offset().top
		        }, 750, 'easeOutQuad');
	        }
        }


    }, { offset: '60%' });

    */

    //


})


