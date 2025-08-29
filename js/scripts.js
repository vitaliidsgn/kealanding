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

			path.setAttribute('d','M3.334 5h13.333M3.334 10h13.333M3.334 15h13.333');

		} else {

			document.body.classList.add('menu-show');

			path.setAttribute('d','m5 5 10 10m0-10L5 15');

		}

	});

	menu.addEventListener('click', event => {

		if ( event.target.closest('a') && event.target.closest('a').href.includes('#') ) {

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImpzLmpzIiwibWVudS5qcyIsInJlZmVycmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoIGl0ZW1zID0+IHtcclxuXHJcblx0aWYoIWl0ZW1zLmxlbmd0aCkge1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0fVxyXG5cclxuXHRbLi4uaXRlbXNdLmZvckVhY2goIGFjY29yZGlvbiA9PiB7XHJcblxyXG5cdFx0bGV0IGFuaW1hdGVPbiA9IGZhbHNlLFxyXG5cdFx0XHRhY3RpdmVJdGVtID0gbnVsbDtcclxuXHJcblx0XHRjb25zdCBpdGVtcyA9IGFjY29yZGlvbi5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19pdGVtJyk7XHJcblxyXG5cdFx0Wy4uLml0ZW1zXS5mb3JFYWNoKCBpdGVtID0+IHtcclxuXHJcblx0XHRcdGNvbnN0IGJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fYnRuJyksXHJcblx0XHRcdFx0ICBoZWFkID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19oZWFkJyksXHJcblx0XHRcdFx0ICBib2R5ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19ib2R5JyksXHJcblx0XHRcdFx0ICBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cclxuXHRcdFx0YXJyb3cuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ2aWV3Qm94XCIsIFwiMCAwIDI4IDI4XCIpO1xyXG5cdFx0XHRhcnJvdy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIDI4KTtcclxuXHRcdFx0YXJyb3cuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgMjgpO1xyXG5cdFx0XHRhcnJvdy5pbm5lckhUTUwgPSBgPGxpbmUgeDE9XCI3XCIgeTE9XCIxNFwiIHgyPVwiMjFcIiB5Mj1cIjE0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIvPjxsaW5lIHgxPVwiMTRcIiB5MT1cIjdcIiB4Mj1cIjE0XCIgeTI9XCIyMVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiLz5gO1xyXG5cclxuXHRcdFx0aGVhZC5hcHBlbmQoYXJyb3cpO1xyXG5cclxuXHRcdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRhbmltYXRlT24gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiggaXRlbSA9PT0gYWN0aXZlSXRlbSApe1xyXG5cclxuXHRcdFx0XHRcdGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xyXG5cdFx0XHRcdFx0YWN0aXZlSXRlbSA9IG51bGw7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0YWN0aXZlSXRlbSA9IGl0ZW07XHJcblxyXG5cdFx0XHRcdFx0YWN0aXZlSXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19ib2R5Jykuc3R5bGUuaGVpZ2h0ID0gYWN0aXZlSXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19ib2R5LWlubmVyJykub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHRcdFx0XHRbLi4uaXRlbXNdLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC50b2dnbGUoJ2lzLW9wZW4nLCBlbCA9PT0gaXRlbSkpO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3QgcmVjdCA9IGhlYWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdFx0Y29uc3QgaXNJblZpZXdwb3J0ID0gcmVjdC50b3AgPj0gMCAmJiByZWN0LmJvdHRvbSA8PSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5cdFx0XHRcdGlmKCBhbmltYXRlT24gJiYgYWN0aXZlSXRlbSAmJiBpc0luVmlld3BvcnQgPT09IGZhbHNlICl7XHJcblxyXG5cdFx0XHRcdFx0aGVhZC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhbmltYXRlT24gPSBmYWxzZTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb24nKSk7IiwiLyohXHJcblxyXG7CqSBrb3ZyaWdpblxyXG7QktGB0LUg0L/RgNCw0LLQsCDRgNCw0LfRgNC10YjQtdC90Ytcclxu0LrRgNCw0YHQuNCy0YvQuSDQtNC40LfQsNC50L0g0LTQvtC70LbQtdC9INC40LzQtdGC0Ywg0LrRgNCw0YHQuNCy0YvQuSDQutC+0LTCrlxyXG5cclxuaHR0cHM6Ly9naXRodWIuY29tL2h0bWxwbHVzY3NzL1xyXG5cclxuKi9cclxuXHJcbiggKCkgPT4ge1xyXG5cclxuXHRsZXQgbGFzdFNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuXHJcblx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdHJhbnNpdGlvbkRlZmF1bHQnLCAnLjFzJyk7XHJcblxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcblxyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuXHJcblx0XHQvLyBtZW51XHJcblxyXG5cdFx0Y29uc3QgY3VycmVudFNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0XHRpZiAoIE1hdGguYWJzKGxhc3RTY3JvbGxUb3AgLSBjdXJyZW50U2Nyb2xsICkgPiAzMiApIHtcclxuXHJcblx0XHRcdGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1zY3JvbGxlZC11cCcsIGN1cnJlbnRTY3JvbGwgPiBsYXN0U2Nyb2xsVG9wICYmIGxhc3RTY3JvbGxUb3AgPiAwICk7XHJcblxyXG5cdFx0XHRsYXN0U2Nyb2xsVG9wID0gY3VycmVudFNjcm9sbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJnJywgd2luZG93LnBhZ2VZT2Zmc2V0ID4gaGVhZGVyLmNsaWVudEhlaWdodCApO1xyXG5cclxuXHR9KTtcclxuXHJcblx0aGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJnJywgd2luZG93LnBhZ2VZT2Zmc2V0ID4gMCApO1xyXG5cclxuXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2Nyb2xsTWFyZ2luJywgaGVhZGVyLmNsaWVudEhlaWdodCArICdweCcpO1xyXG5cclxuXHQvLyByZXNpemVcclxuXHJcblx0bGV0IHJlc2l6ZVRpbWVvdXQgPSBudWxsLFxyXG5cdFx0d2luZG93V2lkdGhPTGQgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHtcclxuXHJcblx0XHRcdGlmIChyZXNpemVUaW1lb3V0ID09PSBudWxsKSB7XHJcblxyXG5cdFx0XHRcdHJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0cmVzaXplVGltZW91dCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdFx0aWYod2luZG93V2lkdGhPTGQgIT09IHdpbmRvdy5pbm5lcldpZHRoKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR3aW5kb3dXaWR0aE9MZCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2Nyb2xsTWFyZ2luJywgaGVhZGVyLmNsaWVudEhlaWdodCArICdweCcpO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSwgMTAwKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHJcblx0fSk7XHJcblxyXG59KSgpOyIsIiggbWVudSA9PiB7XHJcblxyXG5cdC8vIHRvZ2dsZVxyXG5cclxuXHRjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1idG4tdG9nZ2xlJyksXHJcblx0XHQgIHBhdGggPSBidG4ucXVlcnlTZWxlY3RvcigncGF0aCcpO1xyXG5cclxuXHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcblxyXG5cdFx0aWYgKCBldmVudC5kZXRhaWwgPiAxICkge1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LXNob3cnKSApIHtcclxuXHJcblx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1zaG93Jyk7XHJcblxyXG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsJ00zLjMzNCA1aDEzLjMzM00zLjMzNCAxMGgxMy4zMzNNMy4zMzQgMTVoMTMuMzMzJyk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbWVudS1zaG93Jyk7XHJcblxyXG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsJ201IDUgMTAgMTBtMC0xMEw1IDE1Jyk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxuXHJcblx0bWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuXHJcblx0XHRpZiAoIGV2ZW50LnRhcmdldC5jbG9zZXN0KCdhJykgJiYgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2EnKS5ocmVmLmluY2x1ZGVzKCcjJykgKSB7XHJcblxyXG5cdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsJ00zLjMzNCA1aDEzLjMzM00zLjMzNCAxMGgxMy4zMzNNMy4zMzQgMTVoMTMuMzMzJyk7XHJcblxyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtc2hvdycpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSk7XHJcblxyXG59KShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpKTsiLCIoIHJlZmVycmFsID0+IHtcclxuXHJcblx0Y29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuXHRcdGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcblx0XHRcdGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG5cdFx0XHRcdHJlZmVycmFsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpLmZvckVhY2goIGltZyA9PiBpbWcuc2V0QXR0cmlidXRlKCdsb2FkaW5nJywnZWFnZXInKSApO1xyXG5cdFx0XHRcdG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LCB7XHJcblx0XHRyb290TWFyZ2luOiAnLTUwMHB4IDBweCAtMjAwcHggMHB4J1xyXG5cdH0pO1xyXG5cclxuXHRvYnNlcnZlci5vYnNlcnZlKHJlZmVycmFsKTtcclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWZlcnJhbCcpKTsiXX0=
