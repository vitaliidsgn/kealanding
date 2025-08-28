/*!

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

( () => {

	let lastScrollTop = 0;
	const delta = 5; // минимальное изменение, чтобы сработало

	window.addEventListener("load", () => {

		document.documentElement.style.setProperty('--transitionDefault', '.1s');

	});

	const header = document.querySelector('.header');

	window.addEventListener("scroll", () => {

		header.classList.toggle('is-bg', window.pageYOffset > 0 );

		// menu

		const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

		if (Math.abs(lastScrollTop - currentScroll) <= delta) return;

		header.classList.toggle('is-scrolled-up', currentScroll > lastScrollTop && currentScroll > 100 );

		lastScrollTop = currentScroll;

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