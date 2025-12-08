.PHONY: install build dev link test clean help

# Install dependencies
install:
	pnpm install

# Build the CLI
build:
	pnpm build

# Development mode with watch
dev:
	pnpm dev

# Link CLI globally
link: build
	pnpm link --global

# Run tests
test:
	pnpm test

# Clean build artifacts
clean:
	rm -rf dist

# Full rebuild
rebuild: clean build

# Quick build and test
quick: build
	./dist/index.js --help

# Login
login:
	./dist/index.js auth login

# List templates
tpl-list:
	./dist/index.js tpl list

# Help
help:
	@echo "Available targets:"
	@echo "  install   - Install dependencies"
	@echo "  build     - Build the CLI"
	@echo "  dev       - Start development mode with watch"
	@echo "  link      - Build and link CLI globally"
	@echo "  test      - Run tests"
	@echo "  clean     - Remove build artifacts"
	@echo "  rebuild   - Clean and rebuild"
	@echo "  quick     - Build and show help"
	@echo "  login     - Run auth login"
	@echo "  tpl-list  - List templates"
	@echo "  help      - Show this help"
