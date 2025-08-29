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