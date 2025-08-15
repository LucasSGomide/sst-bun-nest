dev:
	bunx sst dev

install: remove-deps install-root

remove-deps:
	rm -rf ./packages/*/node_modules
	rm -rf ./node_modules

install-root:
	bun install

sst-secrets:
	bunx sst secret list

db-pull-subscription:
	bun run --env-file=.env.local --filter subscription db:pull

db-push-subscription:
	bun run --env-file=.env.local --filter subscription db:push

db-seed-subscription:
	bun run --env-file=.env.local --filter subscription db:seed

test-di:
	bun run --env-file=.env.local --filter di test

test-watch-di:
	bun run --env-file=.env.local --filter di test:watch