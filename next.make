lint:
	next lint

format:
	prettier --write $(SRC)/**/*.{js,jsx,ts,tsx,json,css,scss,html,md}

dev:
	next dev --turbopack

build:
	next build

start:
	next start

optimize:
	node scripts/copyOptimizeImages.js