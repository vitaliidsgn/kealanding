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