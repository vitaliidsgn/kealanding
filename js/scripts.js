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

	window.addEventListener("load", () => {

		document.documentElement.style.setProperty('--transitionDefault', '.1s');

	});

	const header = document.querySelector('.header');

	window.addEventListener("scroll", () => {

		header.classList.toggle('is-bg', window.pageYOffset > 0 );

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImpzLmpzIiwibWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiggaXRlbXMgPT4ge1xyXG5cclxuXHRpZighaXRlbXMubGVuZ3RoKSB7XHJcblxyXG5cdFx0cmV0dXJuO1xyXG5cclxuXHR9XHJcblxyXG5cdFsuLi5pdGVtc10uZm9yRWFjaCggYWNjb3JkaW9uID0+IHtcclxuXHJcblx0XHRsZXQgYW5pbWF0ZU9uID0gZmFsc2UsXHJcblx0XHRcdGFjdGl2ZUl0ZW0gPSBudWxsO1xyXG5cclxuXHRcdGNvbnN0IGl0ZW1zID0gYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25fX2l0ZW0nKTtcclxuXHJcblx0XHRbLi4uaXRlbXNdLmZvckVhY2goIGl0ZW0gPT4ge1xyXG5cclxuXHRcdFx0Y29uc3QgYnRuID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19idG4nKSxcclxuXHRcdFx0XHQgIGhlYWQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2hlYWQnKSxcclxuXHRcdFx0XHQgIGJvZHkgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2JvZHknKSxcclxuXHRcdFx0XHQgIGFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblxyXG5cdFx0XHRhcnJvdy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInZpZXdCb3hcIiwgXCIwIDAgMjggMjhcIik7XHJcblx0XHRcdGFycm93LnNldEF0dHJpYnV0ZU5TKG51bGwsIFwid2lkdGhcIiwgMjgpO1xyXG5cdFx0XHRhcnJvdy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImhlaWdodFwiLCAyOCk7XHJcblx0XHRcdGFycm93LmlubmVySFRNTCA9IGA8bGluZSB4MT1cIjdcIiB5MT1cIjE0XCIgeDI9XCIyMVwiIHkyPVwiMTRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIi8+PGxpbmUgeDE9XCIxNFwiIHkxPVwiN1wiIHgyPVwiMTRcIiB5Mj1cIjIxXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIvPmA7XHJcblxyXG5cdFx0XHRoZWFkLmFwcGVuZChhcnJvdyk7XHJcblxyXG5cdFx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG5cdFx0XHRcdGFuaW1hdGVPbiA9IHRydWU7XHJcblxyXG5cdFx0XHRcdGlmKCBpdGVtID09PSBhY3RpdmVJdGVtICl7XHJcblxyXG5cdFx0XHRcdFx0aXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XHJcblx0XHRcdFx0XHRhY3RpdmVJdGVtID0gbnVsbDtcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRhY3RpdmVJdGVtID0gaXRlbTtcclxuXHJcblx0XHRcdFx0XHRhY3RpdmVJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2JvZHknKS5zdHlsZS5oZWlnaHQgPSBhY3RpdmVJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2JvZHktaW5uZXInKS5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG5cclxuXHRcdFx0XHRcdFsuLi5pdGVtc10uZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicsIGVsID09PSBpdGVtKSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ym9keS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRjb25zdCByZWN0ID0gaGVhZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0XHRjb25zdCBpc0luVmlld3BvcnQgPSByZWN0LnRvcCA+PSAwICYmIHJlY3QuYm90dG9tIDw9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcblx0XHRcdFx0aWYoIGFuaW1hdGVPbiAmJiBhY3RpdmVJdGVtICYmIGlzSW5WaWV3cG9ydCA9PT0gZmFsc2UgKXtcclxuXHJcblx0XHRcdFx0XHRoZWFkLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGFuaW1hdGVPbiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH0pO1xyXG5cclxufSkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbicpKTsiLCIvKiFcclxuXHJcbsKpIGtvdnJpZ2luXHJcbtCS0YHQtSDQv9GA0LDQstCwINGA0LDQt9GA0LXRiNC10L3Ri1xyXG7QutGA0LDRgdC40LLRi9C5INC00LjQt9Cw0LnQvSDQtNC+0LvQttC10L0g0LjQvNC10YLRjCDQutGA0LDRgdC40LLRi9C5INC60L7QtMKuXHJcblxyXG5odHRwczovL2dpdGh1Yi5jb20vaHRtbHBsdXNjc3MvXHJcblxyXG4qL1xyXG5cclxuKCAoKSA9PiB7XHJcblxyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcblxyXG5cdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXRyYW5zaXRpb25EZWZhdWx0JywgJy4xcycpO1xyXG5cclxuXHR9KTtcclxuXHJcblx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcblxyXG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJnJywgd2luZG93LnBhZ2VZT2Zmc2V0ID4gMCApO1xyXG5cclxuXHR9KTtcclxuXHJcblx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJnJywgd2luZG93LnBhZ2VZT2Zmc2V0ID4gMCApO1xyXG5cdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zY3JvbGxNYXJnaW4nLCBoZWFkZXIuY2xpZW50SGVpZ2h0ICsgJ3B4Jyk7XHJcblxyXG5cdC8vIHJlc2l6ZVxyXG5cclxuXHRsZXQgcmVzaXplVGltZW91dCA9IG51bGwsXHJcblx0XHR3aW5kb3dXaWR0aE9MZCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcblxyXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xyXG5cclxuXHRcdFx0aWYgKHJlc2l6ZVRpbWVvdXQgPT09IG51bGwpIHtcclxuXHJcblx0XHRcdFx0cmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoICgpID0+IHtcclxuXHJcblx0XHRcdFx0XHRyZXNpemVUaW1lb3V0ID0gbnVsbDtcclxuXHJcblx0XHRcdFx0XHRpZih3aW5kb3dXaWR0aE9MZCAhPT0gd2luZG93LmlubmVyV2lkdGgpIHtcclxuXHJcblx0XHRcdFx0XHRcdHdpbmRvd1dpZHRoT0xkID0gd2luZG93LmlubmVyV2lkdGg7XHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zY3JvbGxNYXJnaW4nLCBoZWFkZXIuY2xpZW50SGVpZ2h0ICsgJ3B4Jyk7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9LCAxMDApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKCk7IiwiKCBtZW51ID0+IHtcclxuXHJcblx0Ly8gdG9nZ2xlXHJcblxyXG5cdGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bi10b2dnbGUnKSxcclxuXHRcdCAgcGF0aCA9IGJ0bi5xdWVyeVNlbGVjdG9yKCdwYXRoJyk7XHJcblxyXG5cdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuXHJcblx0XHRpZiAoIGV2ZW50LmRldGFpbCA+IDEgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtc2hvdycpICkge1xyXG5cclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LXNob3cnKTtcclxuXHRcdFx0d2luZG93LnNjcm9sbFRvKDAsd2luZG93U2Nyb2xsKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoICgpID0+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtYmVoYXZpb3Itb2ZmJykpO1xyXG5cclxuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCdNMy4zMzQgNWgxMy4zMzNNMy4zMzQgMTBoMTMuMzMzTTMuMzM0IDE1aDEzLjMzMycpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHR3aW5kb3dTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsLWJlaGF2aW9yLW9mZicpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21lbnUtc2hvdycpO1xyXG5cdFx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLDApO1xyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsJ201IDUgMTAgMTBtMC0xMEw1IDE1Jyk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxuXHJcblx0bWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuXHJcblx0XHRpZiAoIGV2ZW50LnRhcmdldC5jbG9zZXN0KCdhJykgJiYgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2EnKS5ocmVmLmluY2x1ZGVzKCcjJykgKSB7XHJcblxyXG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsLWJlaGF2aW9yLW9mZicpO1xyXG5cclxuXHRcdFx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCdNMy4zMzQgNWgxMy4zMzNNMy4zMzQgMTBoMTMuMzMzTTMuMzM0IDE1aDEzLjMzMycpO1xyXG5cclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LXNob3cnKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG5cclxufSkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKSk7Il19
