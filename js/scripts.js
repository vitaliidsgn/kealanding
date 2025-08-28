( items => {

	if(!items.length) {

		return;

	}

	[...items].forEach( accordion => {

		let animateOn = false,
			activeItem = null;

		const items = accordion.querySelectorAll('.accordion__item');

		[...items].forEach( item => {

			const btn = item.querySelector('.accordion__btn'),
				  head = item.querySelector('.accordion__head'),
				  body = item.querySelector('.accordion__body'),
				  arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");

			arrow.setAttributeNS(null, "viewBox", "0 0 28 28");
			arrow.setAttributeNS(null, "width", 28);
			arrow.setAttributeNS(null, "height", 28);
			arrow.innerHTML = `<line x1="7" y1="14" x2="21" y2="14" stroke-width="1.5"/><line x1="14" y1="7" x2="14" y2="21" stroke-width="1.5"/>`;

			head.append(arrow);

			btn.addEventListener('click', () => {

				animateOn = true;

				if( item === activeItem ){

					item.classList.remove('is-open');
					activeItem = null;

				} else {

					activeItem = item;

					activeItem.querySelector('.accordion__body').style.height = activeItem.querySelector('.accordion__body-inner').offsetHeight + 'px';

					[...items].forEach( el => el.classList.toggle('is-open', el === item));

				}

			});

			body.addEventListener('transitionend', () => {

				const rect = head.getBoundingClientRect();
				const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

				if( animateOn && activeItem && isInViewport === false ){

					head.scrollIntoView({ behavior: 'smooth' });

				}

				animateOn = false;

			});

		});

	});

})(document.querySelectorAll('.accordion'));
/*!

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

( () => {

	let lastScrollTop = window.pageYOffset;

	window.addEventListener("load", () => {

		document.documentElement.style.setProperty('--transitionDefault', '.1s');

	});

	const header = document.querySelector('.header');

	window.addEventListener("scroll", () => {

		// menu

		const currentScroll = window.pageYOffset;

		if ( Math.abs(lastScrollTop - currentScroll ) > 32 ) {

			header.classList.toggle('is-scrolled-up', currentScroll > lastScrollTop && lastScrollTop > 0 );

			lastScrollTop = currentScroll;

		}

		header.classList.toggle('is-bg', window.pageYOffset > header.clientHeight );

	});

	header.classList.toggle('is-bg', window.pageYOffset > 0 );

	document.documentElement.style.setProperty('--scrollMargin', header.clientHeight + 'px');

	// resize

	let resizeTimeout = null,
		windowWidthOLd = window.innerWidth;

	window.addEventListener("resize", () => {

		window.requestAnimationFrame( () => {

			if (resizeTimeout === null) {

				resizeTimeout = setTimeout( () => {

					resizeTimeout = null;

					if(windowWidthOLd !== window.innerWidth) {

						windowWidthOLd = window.innerWidth;
						document.documentElement.style.setProperty('--scrollMargin', header.clientHeight + 'px');

					}

				}, 100);

			}

		});

	});

})();
( menu => {

	// toggle

	const btn = document.querySelector('.menu-btn-toggle'),
		  path = btn.querySelector('path');

	btn.addEventListener('click', event => {

		if ( event.detail > 1 ) {

			return;

		}

		if ( document.body.classList.contains('menu-show') ) {

			document.body.classList.remove('menu-show');
			window.scrollTo(0,windowScroll);

			setTimeout( () => document.documentElement.classList.remove('scroll-behavior-off'));

			path.setAttribute('d','M3.334 5h13.333M3.334 10h13.333M3.334 15h13.333');

		} else {

			windowScroll = window.pageYOffset;

			document.documentElement.classList.add('scroll-behavior-off');

			setTimeout( () => {

				document.body.classList.add('menu-show');
				window.scrollTo(0,0);

			});

			path.setAttribute('d','m5 5 10 10m0-10L5 15');

		}

	});

	menu.addEventListener('click', event => {

		if ( event.target.closest('a') && event.target.closest('a').href.includes('#') ) {

			document.documentElement.classList.remove('scroll-behavior-off');

			path.setAttribute('d','M3.334 5h13.333M3.334 10h13.333M3.334 15h13.333');

			document.body.classList.remove('menu-show');

		}

	});

})(document.querySelector('.menu'));
( referral => {

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				referral.querySelectorAll('img').forEach( img => img.setAttribute('loading','eager') );
				observer.unobserve(entry.target);
			}
		});
	}, {
		rootMargin: '-500px 0px -200px 0px'
	});

	observer.observe(referral);

})(document.querySelector('.referral'));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImpzLmpzIiwibWVudS5qcyIsInJlZmVycmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKCBpdGVtcyA9PiB7XHJcblxyXG5cdGlmKCFpdGVtcy5sZW5ndGgpIHtcclxuXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdH1cclxuXHJcblx0Wy4uLml0ZW1zXS5mb3JFYWNoKCBhY2NvcmRpb24gPT4ge1xyXG5cclxuXHRcdGxldCBhbmltYXRlT24gPSBmYWxzZSxcclxuXHRcdFx0YWN0aXZlSXRlbSA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgaXRlbXMgPSBhY2NvcmRpb24ucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbScpO1xyXG5cclxuXHRcdFsuLi5pdGVtc10uZm9yRWFjaCggaXRlbSA9PiB7XHJcblxyXG5cdFx0XHRjb25zdCBidG4gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2J0bicpLFxyXG5cdFx0XHRcdCAgaGVhZCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9faGVhZCcpLFxyXG5cdFx0XHRcdCAgYm9keSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fYm9keScpLFxyXG5cdFx0XHRcdCAgYXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHJcblx0XHRcdGFycm93LnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidmlld0JveFwiLCBcIjAgMCAyOCAyOFwiKTtcclxuXHRcdFx0YXJyb3cuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ3aWR0aFwiLCAyOCk7XHJcblx0XHRcdGFycm93LnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiaGVpZ2h0XCIsIDI4KTtcclxuXHRcdFx0YXJyb3cuaW5uZXJIVE1MID0gYDxsaW5lIHgxPVwiN1wiIHkxPVwiMTRcIiB4Mj1cIjIxXCIgeTI9XCIxNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiLz48bGluZSB4MT1cIjE0XCIgeTE9XCI3XCIgeDI9XCIxNFwiIHkyPVwiMjFcIiBzdHJva2Utd2lkdGg9XCIxLjVcIi8+YDtcclxuXHJcblx0XHRcdGhlYWQuYXBwZW5kKGFycm93KTtcclxuXHJcblx0XHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcblx0XHRcdFx0YW5pbWF0ZU9uID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0aWYoIGl0ZW0gPT09IGFjdGl2ZUl0ZW0gKXtcclxuXHJcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcclxuXHRcdFx0XHRcdGFjdGl2ZUl0ZW0gPSBudWxsO1xyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdGFjdGl2ZUl0ZW0gPSBpdGVtO1xyXG5cclxuXHRcdFx0XHRcdGFjdGl2ZUl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fYm9keScpLnN0eWxlLmhlaWdodCA9IGFjdGl2ZUl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fYm9keS1pbm5lcicpLm9mZnNldEhlaWdodCArICdweCc7XHJcblxyXG5cdFx0XHRcdFx0Wy4uLml0ZW1zXS5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QudG9nZ2xlKCdpcy1vcGVuJywgZWwgPT09IGl0ZW0pKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiB7XHJcblxyXG5cdFx0XHRcdGNvbnN0IHJlY3QgPSBoZWFkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRcdGNvbnN0IGlzSW5WaWV3cG9ydCA9IHJlY3QudG9wID49IDAgJiYgcmVjdC5ib3R0b20gPD0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuXHRcdFx0XHRpZiggYW5pbWF0ZU9uICYmIGFjdGl2ZUl0ZW0gJiYgaXNJblZpZXdwb3J0ID09PSBmYWxzZSApe1xyXG5cclxuXHRcdFx0XHRcdGhlYWQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0YW5pbWF0ZU9uID0gZmFsc2U7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fSk7XHJcblxyXG59KShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uJykpOyIsIi8qIVxyXG5cclxuwqkga292cmlnaW5cclxu0JLRgdC1INC/0YDQsNCy0LAg0YDQsNC30YDQtdGI0LXQvdGLXHJcbtC60YDQsNGB0LjQstGL0Lkg0LTQuNC30LDQudC9INC00L7Qu9C20LXQvSDQuNC80LXRgtGMINC60YDQsNGB0LjQstGL0Lkg0LrQvtC0wq5cclxuXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9odG1scGx1c2Nzcy9cclxuXHJcbiovXHJcblxyXG4oICgpID0+IHtcclxuXHJcblx0bGV0IGxhc3RTY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcblxyXG5cdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXRyYW5zaXRpb25EZWZhdWx0JywgJy4xcycpO1xyXG5cclxuXHR9KTtcclxuXHJcblx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcblxyXG5cdFx0Ly8gbWVudVxyXG5cclxuXHRcdGNvbnN0IGN1cnJlbnRTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG5cdFx0aWYgKCBNYXRoLmFicyhsYXN0U2Nyb2xsVG9wIC0gY3VycmVudFNjcm9sbCApID4gMzIgKSB7XHJcblxyXG5cdFx0XHRoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtc2Nyb2xsZWQtdXAnLCBjdXJyZW50U2Nyb2xsID4gbGFzdFNjcm9sbFRvcCAmJiBsYXN0U2Nyb2xsVG9wID4gMCApO1xyXG5cclxuXHRcdFx0bGFzdFNjcm9sbFRvcCA9IGN1cnJlbnRTY3JvbGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1iZycsIHdpbmRvdy5wYWdlWU9mZnNldCA+IGhlYWRlci5jbGllbnRIZWlnaHQgKTtcclxuXHJcblx0fSk7XHJcblxyXG5cdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1iZycsIHdpbmRvdy5wYWdlWU9mZnNldCA+IDAgKTtcclxuXHJcblx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXNjcm9sbE1hcmdpbicsIGhlYWRlci5jbGllbnRIZWlnaHQgKyAncHgnKTtcclxuXHJcblx0Ly8gcmVzaXplXHJcblxyXG5cdGxldCByZXNpemVUaW1lb3V0ID0gbnVsbCxcclxuXHRcdHdpbmRvd1dpZHRoT0xkID0gd2luZG93LmlubmVyV2lkdGg7XHJcblxyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XHJcblxyXG5cdFx0XHRpZiAocmVzaXplVGltZW91dCA9PT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHRyZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRcdHJlc2l6ZVRpbWVvdXQgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRcdGlmKHdpbmRvd1dpZHRoT0xkICE9PSB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG5cclxuXHRcdFx0XHRcdFx0d2luZG93V2lkdGhPTGQgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXNjcm9sbE1hcmdpbicsIGhlYWRlci5jbGllbnRIZWlnaHQgKyAncHgnKTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0sIDEwMCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoIG1lbnUgPT4ge1xyXG5cclxuXHQvLyB0b2dnbGVcclxuXHJcblx0Y29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuLXRvZ2dsZScpLFxyXG5cdFx0ICBwYXRoID0gYnRuLnF1ZXJ5U2VsZWN0b3IoJ3BhdGgnKTtcclxuXHJcblx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cclxuXHRcdGlmICggZXZlbnQuZGV0YWlsID4gMSApIHtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1zaG93JykgKSB7XHJcblxyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtc2hvdycpO1xyXG5cdFx0XHR3aW5kb3cuc2Nyb2xsVG8oMCx3aW5kb3dTY3JvbGwpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1iZWhhdmlvci1vZmYnKSk7XHJcblxyXG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsJ00zLjMzNCA1aDEzLjMzM00zLjMzNCAxMGgxMy4zMzNNMy4zMzQgMTVoMTMuMzMzJyk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHdpbmRvd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzY3JvbGwtYmVoYXZpb3Itb2ZmJyk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblxyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbWVudS1zaG93Jyk7XHJcblx0XHRcdFx0d2luZG93LnNjcm9sbFRvKDAsMCk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHBhdGguc2V0QXR0cmlidXRlKCdkJywnbTUgNSAxMCAxMG0wLTEwTDUgMTUnKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG5cclxuXHRtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cclxuXHRcdGlmICggZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2EnKSAmJiBldmVudC50YXJnZXQuY2xvc2VzdCgnYScpLmhyZWYuaW5jbHVkZXMoJyMnKSApIHtcclxuXHJcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtYmVoYXZpb3Itb2ZmJyk7XHJcblxyXG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsJ00zLjMzNCA1aDEzLjMzM00zLjMzNCAxMGgxMy4zMzNNMy4zMzQgMTVoMTMuMzMzJyk7XHJcblxyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtc2hvdycpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSk7XHJcblxyXG59KShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpKTsiLCIoIHJlZmVycmFsID0+IHtcclxuXHJcblx0Y29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuXHRcdGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcblx0XHRcdGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG5cdFx0XHRcdHJlZmVycmFsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpLmZvckVhY2goIGltZyA9PiBpbWcuc2V0QXR0cmlidXRlKCdsb2FkaW5nJywnZWFnZXInKSApO1xyXG5cdFx0XHRcdG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LCB7XHJcblx0XHRyb290TWFyZ2luOiAnLTUwMHB4IDBweCAtMjAwcHggMHB4J1xyXG5cdH0pO1xyXG5cclxuXHRvYnNlcnZlci5vYnNlcnZlKHJlZmVycmFsKTtcclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWZlcnJhbCcpKTsiXX0=
