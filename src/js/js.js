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