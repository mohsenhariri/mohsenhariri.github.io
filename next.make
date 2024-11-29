lint:
	next lint

dev:
	next dev --turbopack

build:
	next build

start:
	next start

optimize:
	node scripts/copyOptimizeImages.js