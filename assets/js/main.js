"use strict";

$(document).ready(function () {
    $(".company__wrap").owlCarousel({
        loop: true,
        margin: 20,
        smartSpeed: 2000,
        autoplayTimeout: 2000,
        autoplay: true,
        nav: false,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
            },
            400: {
                items: 3,
            },
            575: {
                items: 4,
            },
            767: {
                items: 5,
            },
            991: {
                items: 6,
            },
            1199: {
                items: 6,
            },
            1499: {
                items: 6,
            },
        },
    });

    // password hide/unhide
    $(".toggle-password, .toggle-password2, .toggle-password3, .toggle-password4, .toggle-password5").click(function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("id"));
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    // menu top fixed bar
    var fixed_top = $(".header-section");
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 220) {
            fixed_top.addClass("menu-fixed animated fadeInDown");
            fixed_top.removeClass("slideInUp");
            $("body").addClass("body-padding");
        } else {
            fixed_top.removeClass("menu-fixed fadeInDown");
            fixed_top.addClass("slideInUp");
            $("body").removeClass("body-padding");
        }
    });

    //--Header Menu--
    $(".header-bar").on("click", function (e) {
        $(".main-menu, .header-bar").toggleClass("active");
    });

    //--Odometer--
    $(".odometer-item").each(function () {
        $(this).isInViewport(function (status) {
            if (status === "entered") {
                $(".odometer").each(function () {
                    $(this).text($(this).data("odometer-final"));
                });
            }
        });
    });

    //--Quantity--
    var input = document.querySelector('#qty');
    var btnminus = document.querySelector('.qtyminus');
    var btnplus = document.querySelector('.qtyplus');

    if (input && btnminus && btnplus) {
        var min = Number(input.getAttribute('min'));
        var max = Number(input.getAttribute('max'));
        var step = Number(input.getAttribute('step'));

        function qtyminus(e) {
            var current = Number(input.value);
            var newval = (current - step);
            if (newval < min) {
                newval = min;
            } else if (newval > max) {
                newval = max;
            }
            input.value = newval;
            e.preventDefault();
        }

        function qtyplus(e) {
            var current = Number(input.value);
            var newval = (current + step);
            if (newval > max) newval = max;
            input.value = newval;
            e.preventDefault();
        }

        btnminus.addEventListener('click', qtyminus);
        btnplus.addEventListener('click', qtyplus);
    }
	//--Quantity--

	//text editor js
	$('.contentsss').richText();
	//text editor js

	//--Wow Animation--
	new WOW().init();
	//--Wow Animation--

	//--copy js--
	let copyText = document.querySelector(".copy-text");
	if (copyText) {
		copyText.querySelector("button").addEventListener("click", function () {
			let input = copyText.querySelector("input.text");
			input.select();
			document.execCommand("copy");
			copyText.classList.add("active");
			window.getSelection().removeAllRanges();
			setTimeout(function () {
				copyText.classList.remove("active");
			}, 2500);
		});
	}
	//--copy js--

	//--Preloader--//
	setTimeout(function () {
		$('.preloader__wrap').fadeToggle();
	}, 1000);
	//--Preloader--//

	// --search popup--
	var openButton = document.getElementById('searchBtn');
	var popup = document.getElementById('searchPopup');
	var closeButton = document.getElementById('closeButton');

	// openButton.addEventListener('click', function () {
	// 	popup.classList.add('open');
	// });

	// closeButton.addEventListener('click', function () {
	// 	popup.classList.add('close');
	// 	setTimeout(function () {
	// 		popup.classList.remove('open', 'close');
	// 	}, 100);
	// });
	//--search popup--//

});



// range sliger
function getVals() {
	let parent = this.parentNode;
	let slides = parent.getElementsByTagName("input");
	let slide1 = parseFloat(slides[0].value);
	let slide2 = parseFloat(slides[1].value);
	if (slide1 > slide2) { let tmp = slide2; slide2 = slide1; slide1 = tmp; }

	let displayElement = parent.getElementsByClassName("rangeValues")[0];
	displayElement.innerHTML = "$" + slide1 + " - $" + slide2;
}

window.onload = function () {
	let sliderSections = document.getElementsByClassName("range-slider");
	for (let x = 0; x < sliderSections.length; x++) {
		let sliders = sliderSections[x].getElementsByTagName("input");
		for (let y = 0; y < sliders.length; y++) {
			if (sliders[y].type === "range") {
				sliders[y].oninput = getVals;
				sliders[y].oninput();
			}
		}
	}
}

progressBar: () => {
	const pline = document.querySelectorAll(".progressbar.line");
	const pcircle = document.querySelectorAll(".progressbar.semi-circle");
	pline.forEach(e => {
		var line = new ProgressBar.Line(e, {
			strokeWidth: 6,
			trailWidth: 6,
			duration: 3000,
			easing: 'easeInOut',
			text: {
				style: {
					color: 'inherit',
					position: 'absolute',
					right: '0',
					top: '-30px',
					padding: 0,
					margin: 0,
					transform: null
				},
				autoStyleContainer: false
			},
			step: (state, line) => {
				line.setText(Math.round(line.value() * 100) + ' %');
			}
		});
		var value = e.getAttribute('data-value') / 100;
		new Waypoint({
			element: e,
			handler: function () {
				line.animate(value);
			},
			offset: 'bottom-in-view',
		})
	});
	pcircle.forEach(e => {
		var circle = new ProgressBar.SemiCircle(e, {
			strokeWidth: 6,
			trailWidth: 6,
			duration: 2000,
			easing: 'easeInOut',
			step: (state, circle) => {
				circle.setText(Math.round(circle.value() * 100));
			}
		});
		var value = e.getAttribute('data-value') / 100;
		new Waypoint({
			element: e,
			handler: function () {
				circle.animate(value);
			},
			offset: 'bottom-in-view',
		})
	});
}

const rangeInput = document.querySelectorAll(".range-input input"),
	priceInput = document.querySelectorAll(".price-input input"),
	range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach((input) => {
	input.addEventListener("input", (e) => {
		let minPrice = parseInt(priceInput[0].value),
			maxPrice = parseInt(priceInput[1].value);

		if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
			if (e.target.className === "input-min") {
				rangeInput[0].value = minPrice;
				range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
			} else {
				rangeInput[1].value = maxPrice;
				range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
			}
		}
	});
});

rangeInput.forEach((input) => {
	input.addEventListener("input", (e) => {
		let minVal = parseInt(rangeInput[0].value),
			maxVal = parseInt(rangeInput[1].value);

		if (maxVal - minVal < priceGap) {
			if (e.target.className === "range-min") {
				rangeInput[0].value = maxVal - priceGap;
			} else {
				rangeInput[1].value = minVal + priceGap;
			}
		} else {
			priceInput[0].value = minVal;
			priceInput[1].value = maxVal;
			range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
			range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
		}
	});
});






