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